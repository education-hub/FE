import { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { Layout } from "../../components/Layout";
import BgLandingPage from "/carousel-1.jpg";
import Logo from "../../assets/eduhub-logo-black.png";

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

  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/schools?limit=5&page=1&search=`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data.data;
        setDatas(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  return (
    <Layout>
      <div className="bg-gray-100">
        <div
          className="h-screen bg-cover bg-center flex justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.6)),url(${BgLandingPage})`,
          }}
        >
          <div className="w-5/6 px-5 py-64">
            <img src={Logo} alt="logo" className="mb-8" />
            <h1 className="text-black text-4xl font-extrabold">
              Web platform for school review and education community
            </h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8">
          <button className="bg-@blue hover:bg-green-600 text-white py-2 px-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            Search
          </button>
        </div>
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card */}
          {datas.map((data) => {
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
                    <div className="flex items-center">
                      <div className="text-gray-700 text-base mb-4">
                        {data.admin_name}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-11">
                      <div className="text-gray-500 font-bold">
                        <p>Akreditasi</p>
                        <p>{data.accreditation}</p>
                      </div>
                      <div className="text-gray-700 text-base font-semibold justify-items-end">
                        <p>Location</p>
                        <p>{data.location}</p>
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
