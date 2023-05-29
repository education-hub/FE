/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Pusher from "pusher-js";
import { FC } from "react";
import axios from "axios";

import { Layout } from "../../components/Layout";
import Swal from "sweetalert2";

const APP_KEY = "198b35e916a3f0811a9c";
const CLUSTER_NAME = "ap1";

const pusher = new Pusher(APP_KEY, {
  cluster: CLUSTER_NAME,
});

const Progress: FC = () => {
  const [pusherStatus, setPusherStatus] = useState<string>("");
  const [progress, setProgress] = useState(null);
  const [uname, setUname] = useState<string>("");
  const [cookie] = useCookies(["tkn", "uname"]);
  const chekUname = cookie.uname;

  const param = useParams();
  const { id } = param;

  document.title = "Progress | Student Role";

  useEffect(() => {
    const channel = pusher.subscribe("my-channel");
    channel.bind("STUDENTADMISSION", (data: any) => {
      setPusherStatus(data.status);
      setUname(data.username);
    });
    return () => {
      channel.unbind("STUDENTADMISSION");
      pusher.unsubscribe("my-channel");
    };
  }, []);

  useEffect(() => {
    handleShowPusher();
  }, [pusherStatus]);

  const handleShowPusher = () => {
    if (uname === chekUname) {
      Swal.fire({
        icon: "info",
        title: `${pusherStatus}`,
        showCancelButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
    }
  };

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
      <div className="flex flex-col justify-center items-center h-full bg-white dark:bg-@dark dark:text-white p-20">
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
                    ? "bg-red-600"
                    : isProgressActive("File Approved")
                    ? "bg-green-500"
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
          <div className=" grid grid-cols-5 gap-36">
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">
                Checking File Registration
              </p>
            </div>
            <div className="w-full">
              {isProgressActive("Failed File Approved") ? (
                <p className="font-bold text-red-600">File Rejected</p>
              ) : (
                <p className="font-bold text-green-600">File Approved</p>
              )}
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">
                Send Detail Cost Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white ">
                Done Payment
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">
                Send Test Link
              </p>
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
              <p className="font-bold text-black dark:text-white">
                Check the Result
              </p>
            </div>
            <div className="w-full">
              {isProgressActive("Failed Test Result") ? (
                <p className="font-bold text-red-600">Test Result Rejected</p>
              ) : (
                <p className="font-bold text-green-600">Test Result Approved</p>
              )}
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">
                Send Detail Cost Her-Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">
                Already Paid Her-Registration
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold text-black dark:text-white">Finish</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
