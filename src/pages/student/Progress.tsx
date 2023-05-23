/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Layout } from "../../components/Layout";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";

const Progress: FC = () => {
  const [progress, setProgress] = useState(null);
  const [cookie] = useCookies(["tkn"]);

  const param = useParams();
  const { id } = param;

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/progresses/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { progress_status } = res.data.data;
        setProgress(progress_status);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  const isProgressActive = (progress_status: string) => {
    return progress === progress_status;
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full bg-white p-20">
        <div className="w-full max-w-3xl mx-auto px-4 py-[2.2rem]">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Register Steps
          </h1>
          <div className="flex items-center">
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Check File Registration")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Failed File Approved")
                    ? isProgressActive("File Approved")
                      ? "bg-green-500"
                      : "bg-red-600"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Send Detail Costs Registration")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Done Payment")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Send Test Link")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            {/*  */}
          </div>
          <div className="grid grid-cols-5 gap-36">
            <div className="w-full">
              <p className="font-bold text-black">Checking File Registration</p>
            </div>
            <div className="w-full">
              {isProgressActive("Failed File Approved") ? (
                <p className="font-bold text-red-600">File Rejected</p>
              ) : (
                <p className="font-bold text-green-600">File Approved</p>
              )}
            </div>
            <div className="w-full">
              <p className="font-bold text-black">
                Send Detail Cost Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black">Done Payment</p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black">Send Test Link</p>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center mt-10">
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Check Test Result")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Test Result")
                    ? "bg-green-500"
                    : isProgressActive("Failed Test Result")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Send Detail Costs Her-Registration")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Already Paid Her-Registration")
                    ? "bg-red-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative">
              <div
                className={`rounded-full w-10 h-10 ${
                  isProgressActive("Finish") ? "bg-red-500" : "bg-slate-200"
                }`}
              />
            </div>
            {/*  */}
          </div>
          <div className="grid grid-cols-5 gap-36">
            <div className="w-full">
              <p className="font-bold text-black">Check the Result</p>
            </div>
            <div className="w-full">
              {isProgressActive("Failed File Approved") ? (
                <p className="font-bold text-red-600">Test Result Rejected</p>
              ) : (
                <p className="font-bold text-green-600">Test Result Approved</p>
              )}
            </div>
            <div className="w-full">
              <p className="font-bold text-black">
                Send Detail Cost Her-Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black">
                Already Paid Her-Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black">Finish</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
