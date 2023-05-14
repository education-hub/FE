import { FC, useState, Fragment } from "react";
import Logo from "../assets/eduhub-logo-black.png";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BiMenu, BiX, BiLogIn, BiUserPlus } from "react-icons/bi";

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
          REGISTER SCHOOL
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

export const NavbarAdmin: FC = () => {
  const [checkToken, setCheckToken] = useState<boolean>(true);
  const handleLogout = () => {
    alert("logout");
    setCheckToken(false);
  };
  return (
    <Disclosure as="nav" className="bg-@orange z-50">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between py-3">
              <div className="absolute inset-y-0 right-3 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center justify-between bg-@orange px-10 ">
                <Link to="/admin">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/admin/profile"
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/admin/admission"
                        className="text-white text-md flex justify-center items-center w-72  hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        STUDENT ADMISSION
                      </Link>
                      <Link
                        to="/admin/result"
                        className="text-white text-md flex items-center justify-center w-72 hover:scale-110 hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        TEST RESULT
                      </Link>
                      <button
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="text-white text-md flex gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiLogIn />
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="text-white text-md flex  gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
          {/* mobile display */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="sm:hidden">
              {checkToken ? (
                <nav className="items-center bg-@orange py-5 px-10 w-auto">
                  <div className="flex flex-col justify-end gap-5">
                    <Link
                      to="/admin/profile"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold w-full duration-500 ease-in-out    "
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/admin/admission"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      STUDENT ADMISSION
                    </Link>
                    <Link
                      to="/admin/result"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      TEST RESULT
                    </Link>
                    <button
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      onClick={() => handleLogout()}
                    >
                      REGISTER
                    </button>
                  </div>
                </nav>
              ) : (
                <nav className="items-center bg-@orange py-5 px-10 w-auto">
                  <div className="flex flex-col justify-end gap-5">
                    <Link
                      to="/login"
                      className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      <BiLogIn />
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      <BiUserPlus className="text-xl" />
                      REGISTER
                    </Link>
                  </div>
                </nav>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export const NavbarIndex: FC = () => {
  const [checkToken, setCheckToken] = useState<boolean>(true);
  const handleLogout = () => {
    alert("logout");
    setCheckToken(false);
  };

  return (
    <Disclosure as="nav" className="bg-@orange z-50">
      {({ open }) => (
        <>
          <div className=" absolute z-40 opacity-50 hover:opacity-90 duration-500 w-full">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 right-3 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center py-3  justify-between bg-@orange px-10 ">
                <Link to="/admin">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/admin/profile"
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/admin/admission"
                        className="text-white text-md flex justify-center items-center w-72  hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        STUDENT ADMISSION
                      </Link>
                      <Link
                        to="/admin/result"
                        className="text-white text-md flex items-center justify-center w-72 hover:scale-110 hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        TEST RESULT
                      </Link>
                      <button
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2 rounded-md text-md font-medium"
                      >
                        <BiLogIn />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2 rounded-md text-md font-medium"
                      >
                        <BiUserPlus className="text-xl" />
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
          {/* mobile display */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="sm:hidden">
              {checkToken ? (
                <nav className=" items-center bg-@orange pt-32 pb-5 px-10 w-auto">
                  <div className="flex flex-col justify-end gap-5">
                    <Link
                      to="/admin/profile"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold w-full duration-500 ease-in-out    "
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/admin/admission"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      STUDENT ADMISSION
                    </Link>
                    <Link
                      to="/admin/result"
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      TEST RESULT
                    </Link>
                    <button
                      className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      onClick={() => handleLogout()}
                    >
                      LOGOUT
                    </button>
                  </div>
                </nav>
              ) : (
                <nav className="items-center bg-@orange py-5 px-10 w-auto">
                  <div className="flex flex-col justify-end gap-5">
                    <Link
                      to="/login"
                      className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      <BiLogIn />
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                    >
                      <BiUserPlus className="text-xl" />
                      REGISTER
                    </Link>
                  </div>
                </nav>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};
