/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { Layout } from "../../components/Layout";
import Logo from "../../assets/eduhub-logo-black.png";
import GambarA from "../../assets/Akreditasi A.png";
import GambarB from "../../assets/logo-akreditasi-b-11.png";

interface schoolDesc {
  accreditation: string;
  admin_name: string;
  id: number;
  image: string;
  location: string;
  name: string;
}

const Student: FC = () => {
  const [datas, setDatas] = useState<schoolDesc[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllSchools, setShowAllSchools] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/schools?limit=1000&page=1&search=`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data.data;
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  const getAccreditationImage = (accreditation: string): string => {
    if (accreditation === "A") {
      return GambarA;
    } else if (accreditation === "B") {
      return GambarB;
    }
    return "";
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    axios
      .get(
        `https://go-event.online/schools?limit=5&page=1&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.tkn}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data.data;
        setDatas(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
    setShowAllSchools(false);
  };

  function handleBackToAllSchools() {
    setShowAllSchools(true);
    setSearchQuery("");
    fetchData();
  }

  return (
    <Layout>
      <div>
        <div
          className="max-h-[600px] flex sm:justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.6)),url(/education-bg-homepage.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-[60%] px-8 py-32 sm:w-[90%] sm:px-5 sm:py-52">
            <img src={Logo} alt="logo" className="mb-2 sm:mb-6" />
            <h1 className="text-black text-2xl sm:text-4xl font-bold max-w-sm">
              Web platform for school review and education community
            </h1>
          </div>
        </div>
        <div className="flex justify-center"></div>
        <div className="max-w-6xl mx-auto mt-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="bg-@light-blue border border-slate-300 rounded-md py-1 px-1 ms-6 sm:py-2 sm:px-4 mr-2 sm:ms-auto focus:outline-none focus:ring-1 focus:ring-blue-200"
            placeholder="Search school..."
          />
          {showAllSchools ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-16 sm:py-2 rounded-md"
              onClick={() => handleSearch()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
              Search
            </button>
          ) : (
            <button
              className="bg-@orange hover:bg-orange-600 text-white py-1 px-16 sm:py-2 rounded-md"
              onClick={handleBackToAllSchools}
            >
              Back to All School
            </button>
          )}
        </div>
        <div className="max-w-sm mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          {/* Card */}
          {datas.map((data) => {
            const accreditationImage = getAccreditationImage(
              data.accreditation
            );
            return (
              <Link to={`/student/detail-school/${data.id}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-md mb-10 hover:shadow-xl hover:scale-110 duration-200">
                  <img
                    src={`https://storage.googleapis.com/prj1ropel/${data.image}`}
                    alt="Card 1"
                    className="w-full h-64 object-cover"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-1">{data.name}</div>
                    <div className="grid grid-cols-2 pt-20">
                      <div>
                        {accreditationImage && (
                          <img
                            src={accreditationImage}
                            alt="Accreditation"
                            className="w-24 h-auto"
                          />
                        )}
                      </div>
                      <div className="text-gray-700 text-base font-semibold grid justify-items-end">
                        <p>Location</p>
                        <p className="text-end text-clip overflow-hidden">
                          {data.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Student;
