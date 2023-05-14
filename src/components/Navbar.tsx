import { FC } from "react";
import Logo from "../assets/eduhub-logo-black.png";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <nav className="items-center grid grid-cols-2 bg-@blue py-3 px-20 w-auto">
      <div className="flex">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-full mr-2 hover:scale-105"
          />
        </Link>
      </div>
      <div className="flex justify-end">
        <Link
          to="/profile"
          className="text-white text-md hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out"
        >
          PROFILE
        </Link>
        <Link
          to="/transactions"
          className="text-white text-md hover:text-@dark font-semibold transition-all  mr-[6%] duration-500 ease-in-out"
        >
          TRANSACTIONS
        </Link>
        <Link
          to="/register-school"
          className="text-white text-md hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
        >
          REGISTER-SCHOOL
        </Link>
        <Link
          to="/logout"
          className="text-white text-md hover:text-@dark font-semibold mr-[6%] transition-all duration-500 ease-in-out"
        >
          LOGOUT
        </Link>
      </div>
    </nav>
  );
};
