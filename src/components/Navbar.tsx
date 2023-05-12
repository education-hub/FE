import { FC } from "react";
import Logo from "../assets/eduhub-logo-black.png";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-@blue py-3 w-full">
      <div className="flex items-center flex-shrink-0 text-white mr-6 ml-[5%]">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-full mr-2 hover:scale-105"
          />
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow ml-[59%]">
          <Link
            to="/profile"
            className="block mt-4 lg:inline-block lg:mt-0 text-white text-lg hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
          >
            PROFILE
          </Link>
          <Link
            to="/transactions"
            className="block mt-4 lg:inline-block lg:mt-0 text-white text-lg hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
          >
            TRANSACTIONS
          </Link>
          <Link
            to="/register-school"
            className="block mt-4 lg:inline-block lg:mt-0 text-white text-lg hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
          >
            REGISTER SCHOOL
          </Link>
          <Link
            to="/logout"
            className="block mt-4 lg:inline-block lg:mt-0 text-white text-lg hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
          >
            LOGOUT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
