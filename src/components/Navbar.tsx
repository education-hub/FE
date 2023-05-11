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

export default Navbar;
