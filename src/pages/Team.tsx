import { FC } from "react";
import { BsGithub } from "react-icons/bs";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";

const Team: FC = () => {
  return (
    <Layout>
      <div
        className="h-full bg-center bg-cover p-7 sm:p-20"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-5.jpg)`,
        }}
      >
        <div className="lg:text-3xl font-bold text-white hover:text-@dark hover:text-5xl hover:drop-shadow-lg hover:-translate-y-2 duration-500 flex justify-center pb-10">
          OUR BEST TEAM
        </div>
        <div className=" grid md:grid-cols-3 gap-10">
          <div className="bg-white p-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500 flex flex-col gap-5">
            <img
              src="/satrio.jpg"
              alt=""
              className="w-full flex mx-auto pt-5 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
            />
            <div className="text-xl flex flex-col gap-2 justify-center text-center">
              <p className="font-semibold">Back End Engineer</p>
              <p className=" mb-5">(Satrio Wibowo)</p>
              <Link to="https://github.com/ropel12" target="_blank">
                <div className="flex gap-3 items-center text-center bg-slate-500 hover:bg-@dark hover:-translate-y-2 duration-500 w-full h-16 p-3 text-white font-semibold">
                  <BsGithub />
                  <p>ropel12</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-white p-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500 flex flex-col gap-5">
            <img
              src="/irwan.jpg"
              alt=""
              className="w-full flex mx-auto pt-5 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
            />
            <div className="text-xl flex flex-col gap-2 justify-center text-center">
              <p className="font-semibold">Front End Engineer</p>
              <p className=" mb-5">(Irwan Hadi)</p>
              <Link to="https://github.com/IrwanFicoFar" target="_blank">
                <div className="flex gap-3 items-center text-center bg-slate-500 hover:bg-@dark hover:-translate-y-2 duration-500 w-full h-16 p-3 text-white font-semibold">
                  <BsGithub />
                  <p>IrwanFicoFar</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-white p-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500 flex flex-col gap-5">
            <img
              src="/yusuf.jpg"
              alt=""
              className="w-full flex mx-auto pt-5 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
            />
            <div className="text-xl flex flex-col gap-2 justify-center text-center">
              <p className="font-semibold">Front End Engineer</p>
              <p className=" mb-5">(Yusuf Ashidicki Pradana)</p>
              <Link to="https://github.com/ysfashidicki" target="_blank">
                <div className="flex gap-3 items-center text-center bg-slate-500 hover:bg-@dark hover:-translate-y-2 duration-500 w-full h-16 p-3 text-white font-semibold">
                  <BsGithub />
                  <p>ysfashidicki</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
