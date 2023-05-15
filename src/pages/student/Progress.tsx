import React from "react";
import { Layout } from "../../components/Layout";

const Progress = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full bg-white p-20">
        <div className="w-full max-w-3xl mx-auto px-4 py-[2.2rem]">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Register Steps
          </h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-red-600"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Checking File Registration</p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">File Approved</p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">
                Send Detail Cost Registration
              </p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Done Payment</p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Send Test Link</p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-500"></div>
            <div className="relative mx-4">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Check the Result</p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Test Result</p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">
                Send Detail Cost Her-Registration
              </p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">
                Already Paid Her-Registration
              </p>
            </div>
            <div className="text-center w-1/5">
              <p className="font-bold text-black">Finish</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
