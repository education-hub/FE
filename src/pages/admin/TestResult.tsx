/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { LayoutAdmin } from "../../components/Layout";
import { ResultDataType } from "../../utils/user";

const TestResult: FC = () => {
  const [TestResult, setTestResult] = useState<ResultDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        console.log(data);
        setTestResult(data);
      })
      .catch((error) => {
        const { message } = error;
        Swal.fire({
          icon: "error",
          title: "Failed to Fetch Data!!",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(TestResult);

  return (
    <LayoutAdmin>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div className="grid grid-cols-2">
          <div className="pt-20 pl-20 pb-20">
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
