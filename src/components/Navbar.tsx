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
          className="text-white text-md hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
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
      {/* <div className="flex items-center text-white">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-full mr-2 hover:scale-105"
          />
        </Link>
      </div>
      <div className="flex-grow flex items-center">
        <div className="text-sm lg:flex-grow">
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
      </div> */}
    </nav>
  );
  // (
  //   <div className="navbar bg-[#0A142F] px-32 sticky top-0 text-gray-300 z-50">
  //     <div className="flex-1"></div>
  //     <div data-theme="mytheme" className="flex-none bg-inherit">
  //       <ul className="menu menu-horizontal px-1 ">
  //         <li tabIndex={0} className="dropdown dropdown-end">
  //           <a className="active:bg-[#080f25] hover:bg-inherit">
  //             <svg
  //               className="fill-current"
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="30"
  //               height="30"
  //               viewBox="0 0 24 24"
  //             >
  //               <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  //             </svg>
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // );
};

export const NavbarAdmin: FC = () => {
  return (
    <nav className="items-center grid grid-cols-2 bg-@orange py-3 px-20 w-auto">
      <div className="flex">
        <Link to="/admin">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-full mr-2 hover:scale-105 duration-500"
          />
        </Link>
      </div>
      <div className="flex justify-end">
        <Link
          to="/profile"
          className="text-white text-md hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
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

export const NavbarIndex: FC = () => {
  return (
    <nav className="absolute z-40 bg-@orange opacity-50 hover:opacity-90 duration-500 items-center grid grid-cols-2  py-3 px-20 w-full">
      <div className="flex">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-full mr-2 hover:scale-105 duration-500"
          />
        </Link>
      </div>
      <div className="flex justify-end">
        <Link
          to="/profile"
          className="text-white text-md  hover:scale-110 hover:bg-@blue hover:rounded-xl hover:p-2  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
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
