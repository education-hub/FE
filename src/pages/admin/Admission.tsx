import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { StudentType } from "../../utils/user";

const Admission: FC = () => {
  const [student, setStudent] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(true);

  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  document.title = "Students Admission | Admin Management";

  useEffect(() => {
    fetcData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetcData = () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/admin/admission`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setStudent(data.data);
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(student);

  return (
    <LayoutAdmin>
      <div
        className=" p-7 sm:p-20 flex flex-col gap-10 h-full bg-[url(/bg-2.jpg)] bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-2.jpg)`,
        }}
      >
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div>
            {!noData ? (
              <div className="">
                {student.map((e) => {
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:space-x-10 text-lg font-semibold hover:drop-shadow-lg hover:-translate-y-2 mb-10 md:space-x-10 px-10 pt-5 pb-10 bg-[url('/bg-1.jpg')] bg-cover hover:bg-center duration-500">
                      <div className=" justify-around hidden md:block ">
                        <img
                          src={`https://storage.googleapis.com/prj1ropel/${e.user_image}`}
                          alt=""
                          className="h-auto w-full mt-6 hidden md:block"
                        />
                      </div>
                      {/* <div className="hidden sm:blok md:hidden"></div> */}
                      <div className="sol-span-1 sm:col-span-2 lg:col-span-1">
                        <p>Student_id</p>
                        <div className="bg-@light-blue px-3 flex items-center justify-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                          <p>{e.user_id}</p>
                        </div>
                      </div>
                      <div className="hidden md:block lg:hidden"></div>
                      <div className="sm:col-span-2">
                        <p>Fullname</p>
                        <div className="bg-@light-blue px-3 flex items-center h-16 w-full text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                          <p>{e.user_name}</p>
                        </div>
                      </div>
                      <div className="hidden md:block lg:block xl:hidden"></div>
                      <div className="hidden md:hidden lg:block xl:hidden"></div>
                      <div className="pt-6 flex flex-col">
                        <ButtonSubmit
                          label="Detail Admission"
                          onClick={() =>
                            navigate(`/admin/admission/${e.submission_id}`)
                          }
                        />
                      </div>
                      <div className="pt-6 flex justify-end lg:justify-start flex-col ">
                        <ButtonSubmit
                          label="Update Progress"
                          onClick={() =>
                            navigate(`/admin/progress/${e.progress_id}`)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-screen text-7xl font-medium flex justify-center py-24 text-gray-500">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Admission;
