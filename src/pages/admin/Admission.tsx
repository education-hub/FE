import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";
import { ThemeContext } from "../../utils/context";
import { StudentType } from "../../utils/user";

const Admission: FC = () => {
  const [student, setStudent] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(true);

  const contextData = useContext(ThemeContext);
  const themeMode = contextData.theme;

  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  document.title = "Students Admission | Admin Role";

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
        console.log(data);
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

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure want to delete ?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/progresses/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.tkn}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "info",
              title: "Success",
              text: message,
              showCancelButton: false,
            }).then((result) => {
              if (result.isConfirmed) {
                fetcData();
              }
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  return (
    <LayoutAdmin>
      {themeMode === "dark" ? (
        <div className=" p-7 sm:p-20 flex flex-col bg-@dark text-white gap-10 h-full bg-center bg-cover">
          {loading ? (
            <div className="h-screen">Loading..</div>
          ) : (
            <div>
              {!noData ? (
                <div className="p-7 sm:p-10">
                  {student.map((e) => {
                    return (
                      <div className="hover:-translate-y-2 duration-500 mb-10">
                        <div
                          className={`relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-0 lg:space-x-10 text-lg font-semibold hover:drop-shadow-lg  mb-5 md:space-x-10 px-10 pt-5 pb-10  ${
                            themeMode === "dark"
                              ? "bg-gray-600"
                              : 'bg-[url("/bg-1.jpg")]'
                          } bg-cover hover:bg-center duration-500`}
                        >
                          <div className=" justify-around hidden md:block ">
                            <img
                              src={`https://storage.googleapis.com/prj1ropel/${e.user_image}`}
                              alt=""
                              className="h-28 mt-6 hidden absolute md:block"
                            />
                          </div>
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
                          <div className="hidden md:block lg:block xl:hidden"></div>
                          <div className="hidden md:hidden lg:block xl:hidden"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row  w-full justify-end sm:space-x-5 sm:items-center gap-5 sm:gap-0">
                          <div
                            className={`p-5 flex justify-end items-center hover:drop-shadow-lg  ${
                              themeMode === "dark"
                                ? "bg-gray-600"
                                : 'bg-[url("/bg-1.jpg")]'
                            } bg-cover hover:bg-center duration-500`}
                          >
                            <p className="text-lg font-semibold text-center">
                              Status : {e.progress_status}
                            </p>
                          </div>
                          <div className="flex flex-col ">
                            {e.progress_status === "Failed File Approved" ||
                            e.progress_status === "Failed Test Result" ||
                            e.progress_status === "Finish" ? (
                              <ButtonCancelDelete
                                label="Delete"
                                onClick={() => handleDelete(e.progress_id)}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
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
      ) : (
        <div
          className=" p-7 sm:p-20 flex flex-col gap-10 h-full bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-2.jpg)`,
          }}
        >
          {loading ? (
            <div className="h-screen">Loading..</div>
          ) : (
            <div>
              {!noData ? (
                <div className="p-7 sm:p-10">
                  {student.map((e) => {
                    return (
                      <div className="hover:-translate-y-2 duration-500 mb-10">
                        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-0 lg:space-x-10 text-lg font-semibold hover:drop-shadow-lg  mb-5 md:space-x-10 px-10 pt-5 pb-10 bg-[url('/bg-1.jpg')] bg-cover hover:bg-center duration-500">
                          <div className=" justify-around hidden md:block ">
                            <img
                              src={`https://storage.googleapis.com/prj1ropel/${e.user_image}`}
                              alt=""
                              className="h-28 mt-6 hidden absolute md:block"
                            />
                          </div>
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
                          <div className="hidden md:block lg:block xl:hidden"></div>
                          <div className="hidden md:hidden lg:block xl:hidden"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row  w-full justify-end sm:space-x-5 sm:items-center gap-5 sm:gap-0">
                          <div className="p-5 flex justify-end items-center hover:drop-shadow-lg bg-[url('/bg-3.jpg')] bg-cover hover:bg-center duration-500">
                            <p className="text-lg font-semibold text-center">
                              Status : {e.progress_status}
                            </p>
                          </div>
                          <div className="flex flex-col ">
                            {e.progress_status === "Failed File Approved" ||
                            e.progress_status === "Failed Test Result" ||
                            e.progress_status === "Finish" ? (
                              <ButtonCancelDelete
                                label="Delete"
                                onClick={() => handleDelete(e.progress_id)}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
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
      )}
    </LayoutAdmin>
  );
};

export default Admission;
