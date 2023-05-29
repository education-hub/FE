/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface RegisteredSchool {
  school_name: string;
  school_image: string;
  school_web: string;
  progress_id: number;
}

const RegisterSchool: FC = () => {
  const [datas, setDatas] = useState<RegisteredSchool[]>([]);
  const [noData, setNoData] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn"]);

  document.title = "School Admission | Student Role";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/users/progress`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDatas(data);
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      });
  }

  return (
    <Layout>
      <div className="grid grid-flow-row auto-rows-max gap-10">
        <div>
          {!noData ? (
            <div className="p-10 md:p-20 grid grid-flow-row auto-rows-max gap-10">
              {datas.map((data) => {
                return (
                  <div
                    className="grid grid-cols-9 gap-4 tracking-normal"
                    key={data.progress_id}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={`https://storage.googleapis.com/prj1ropel/${data.school_image}`}
                        alt="school_pict"
                        className="max-w-[60px] max-h-[100px] md:max-w-[150px] md:max-h-[100px]"
                      />
                    </div>
                    <div className="col-span-3 grid md:grid-rows-3">
                      <p className="font-semibold text-gray-500">School Name</p>
                      <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-14 md:h-full">
                        {data.school_name}
                      </div>
                    </div>
                    <div className="col-span-3 grid md:grid-rows-3">
                      <p className="font-semibold text-gray-500">
                        School Website
                      </p>
                      <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-14 md:h-full">
                        {data.school_web}
                      </div>
                    </div>
                    <div className="col-span-2 grid grid-rows-3 h-full w-full">
                      <p className="text-white">Button Submit</p>
                      <div className="row-span-2">
                        <Link to={`/student/progresses/${data.progress_id}`}>
                          <ButtonSubmit label="Detail Progress" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="p-7 sm:p-20 flex flex-col gap-10 h-full md:h-screen bg-[url(/bg-4.jpg)] bg-top bg-cover"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-4.jpg)`,
              }}
            >
              <p className="text-7xl font-medium flex justify-center py-18 h-full text-gray-500">
                Data Not Found
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RegisterSchool;
