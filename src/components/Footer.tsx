import { Link } from "react-router-dom";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer>
      <div className="bg-@blue dark:bg-cyan-800 grid grid-cols-1 text-md sm:grid-cols-2 lg:grid-cols-4 gap-10 px-10 sm:px-32 py-14 sm:py-32 text-white">
        <div className="flex flex-col gap-5">
          <img
            src="/logo.png"
            alt=""
            className="w-[90%] hover:-translate-y-1 duration-500"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-lg pb-2 hover:-translate-y-1 hover:border-b-4 border-@dark w-full duration-500">
            SITEMAP
          </h1>
          <Link to="/">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Home
            </p>
          </Link>
          <Link to="/about" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              About
            </p>
          </Link>
          <Link to="/disclaimer" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Term & Condition
            </p>
          </Link>
          <Link to="/team" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Our Best Team
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-lg pb-2 hover:-translate-y-1 hover:border-b-4 border-@dark w-full duration-500">
            SOCIALS MEDIA
          </h1>
          <Link to="https://www.facebook.com/" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Facebook
            </p>
          </Link>
          <Link to="https://www.linkedin.com/" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              LinkedIn
            </p>
          </Link>
          <Link to="https://www.instagram.com/" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Instagram
            </p>
          </Link>
          <Link to="https://twitter.com/?lang=en-id" target="_blank">
            <p className="hover:-translate-y-1 duration-500 hover:font-semibold hover:text-md hover:text-@dark">
              Twitter
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold text-lg pb-2 hover:-translate-y-1 hover:border-b-4 border-@dark w-full duration-500">
            HEAD OFFICE
          </h1>
          <p>
            Ciputra Building Level 32A, Jl.Sudirman No.23 Jakarta Pusat, 12940{" "}
          </p>
          <p>
            <p className="font-bold text-lg">STAY CONNECTED</p>
          </p>
          <div className="flex flex-col xl:flex-row mr-5">
            <input type="text" className=" text-@dark p-5 outline-none" />
            <button className="bg-@orange hover:bg-orange-700 px-12 py-5">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className=" px-20 hover:px-5 bottom-0 bg-@blue dark:bg-cyan-800 duration-500">
        <div className="border-t-4 border-@orange duration-500 flex w-full justify-center items-center "></div>
      </div>
      <div className="bg-@blue dark:bg-cyan-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-7 sm:py-10 px-7 sm:px-20 text-white">
        <div className="flex justify-center items-center">
          <p>© 2023 Education Hub. All right reserved.</p>
        </div>
        <div className="flex justify-center items-center">
          <p>(021) 456-7890</p>
        </div>
        <div className="flex justify-center items-center">
          <p>contact@education-hub.agency</p>
        </div>
      </div>
    </footer>
  );
};
