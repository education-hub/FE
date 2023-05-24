/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { LayoutAdmin } from "../../components/Layout";
import { ResultDataType } from "../../utils/user";

const TestResult: FC = () => {
  const [TestResult, setTestResult] = useState<ResultDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(true);

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  document.title = "Test Result | Admin Management";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/quiz`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setTestResult(data);
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LayoutAdmin>
      {loading ? (
        <div className="h-screen">Loading..</div>
      ) : (
        <div className="grid grid-cols-2">
          <div className="pt-20 pl-20 pb-20">
            {!noData ? (
              <div>
                {TestResult.map((e, index) => (
                  <div className=" flex gap-10 mb-10">
                    <div className="pt-6">
                      <div className="bg-@light-blue px-3 flex justify-center items-center h-16 w-24 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p className="text-center">{index + 1}</p>
                      </div>
                    </div>
                    <div>
                      <p>Email</p>
                      <div className="bg-@light-blue px-3 flex items-center h-16 w-96 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{e.email}</p>
                      </div>
                    </div>
                    <div className="pt-6">
                      <div
                        className={`${
                          e.result === "Pass" ? "bg-@blue" : "bg-@orange"
                        } duration-500 px-7 h-16 w-32 flex justify-center items-center text-white font-semibold`}
                      >
                        <p>{e.result.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-7xl font-medium flex items-center justify-center h-full text-gray-300">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
          <div
            className="relative z-10 disabled md:block flex bg-cover bg-center h-screen"
            style={{
              backgroundImage: `url(/result2.jpg)`,
            }}
          ></div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default TestResult;
