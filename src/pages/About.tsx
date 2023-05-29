import { FC } from "react";

import { Layout } from "../components/Layout";

const About: FC = () => {
  document.title = "About | Education Hub";

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
              About
            </p>
            <p>
              Education Hub is a digital platform that aims to be a social media
              for interaction between schools and students who want to find
              their dream school.
            </p>
            <p>
              Education Hub is a platform used to make it easier for prospective
              students or parents who want to find a favorite school for their
              children. with this education-hub platform, it will be easier for
              them to learn before deciding to register
            </p>
            <p>
              With this platform, students will no longer have trouble finding
              and studying schools that are right for them. With just a finger
              on your hand, you can already find your dream school.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
