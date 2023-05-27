import { FC } from "react";
import { Layout } from "../components/Layout";

const Disclaimer: FC = () => {
  return (
    <Layout>
      <div
        className="h-full bg-center bg-cover p-7 sm:p-20"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-5.jpg)`,
        }}
      >
        <div className="bg-white flex mx-auto w-[93%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex-col hover:-translate-y-2 hover:drop-shadow-lg duration-500">
          <img
            src="/logo.png"
            alt=""
            className="w-[50%] flex mx-auto pt-5 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
          />
          <div className="p-10 flex flex-col gap-3 text-md">
            <p
              className="text-center text-lg font-semibold
            "
            >
              Term & Condition
            </p>
            <p>
              EducationHub is a platform that has been registered with the
              Ministry of Education, Culture, Research and Technology.
            </p>
            <p>
              Any form of use that violates Education-hub rules can be
              prosecuted according to applicable law in Indonesia
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
