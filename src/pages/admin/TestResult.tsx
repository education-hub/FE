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
        <div className="bg-[url('/bg-6.jpg')] bg-cover bg-center">
          <div className=" p-7 sm:p-20">
            {!noData ? (
              <div>
                {TestResult.map((e, index) => (
                  <div className=" grid grid-cols-3  sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-7 lg:gap-10 mb-10 border-2 sm:border-0 border-@orange p-5 ms:p-0 bg-[url('/bg-1.jpg')] hover:bg-center duration-500 sm:bg-none">
                    <div className="pt-6">
                      <div className="hidden sm:block bg-@light-blue py-5 justify-center items-center text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p className="text-center">{index + 1}</p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <p>Email</p>
                      <div className="bg-@light-blue px-3 py-5 items-center text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{e.email}</p>
                      </div>
                    </div>
                    <div className="block sm:hidden"></div>
                    <div className="block sm:hidden"></div>
                    <div className="pt-6">
                      <div
                        className={`${
                          e.result === "Pass" ? "bg-@blue" : "bg-@orange"
                        } duration-500 flex py-5 justify-center items-center text-white font-semibold`}
                      >
                        <p>{e.result.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-7xl font-medium flex py-24 justify-center h-screen text-gray-500">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default TestResult;
