/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useState, useContext, useEffect } from "react";
import Logo from "../assets/eduhub-logo-black.png";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { BiMenu, BiX, BiLogIn, BiUserPlus, BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { Switch } from "@headlessui/react";
import Swal from "sweetalert2";
import { ThemeContext } from "../utils/context";

export const Navbar: FC = () => {
  const [cookie, , removeCookie] = useCookies(["tkn", "role", "uname"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);

  const checkToken = cookie.tkn;
  const checkRole = cookie.role;

  const navigate = useNavigate();

  useEffect(() => {
    handleTheme();
  }, [enabled]);

  const handleTheme = () => {
    if (enabled === true) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure to logout ??",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, Sure!!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("role");
        removeCookie("uname");
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are logout !!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Disclosure as="nav" className="bg-@blue z-50">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between py-3">
              <div className="absolute inset-y-0 right-3 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center justify-between bg-@blue px-10 ">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  checkRole === "student" ? (
                    <div className="hidden lg:block sm:ml-6">
                      <div className="flex space-x-4">
                        <Link
                          to="/student/profile"
                          className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out    "
                        >
                          PROFILE
                        </Link>
                        <Link
                          to="/student/transactions"
                          className="text-white text-md flex justify-center items-center w-52 xl:w-72  hover:scale-110 hover:text-@dark  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out    "
                        >
                          TRANSACTIONS
                        </Link>
                        <Link
                          to="/student/register-school"
                          className="text-white text-md flex items-center justify-center w-44 xl:w-72 hover:scale-110 hover:text-@dark transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out    "
                        >
                          REGISTER SCHOOL
                        </Link>
                        <button
                          className="text-white text-md flex gap-2 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                          onClick={() => handleLogout()}
                        >
                          <BiLogOut />
                          LOGOUT
                        </button>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          as={Fragment}
                        >
                          {({ checked }) => (
                            <button
                              className={`${
                                checked ? "bg-blue-600" : "bg-gray-200"
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  checked ? "translate-x-5" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </button>
                          )}
                        </Switch>
                      </div>
                    </div>
                  ) : (
                    <div className="justify-end hidden lg:flex space-x-4">
                      <button
                        className="text-white text-md flex gap-3 items-center justify-end hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        <BiLogOut />
                        LOGOUT
                      </button>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
                    </div>
                  )
                ) : (
                  <div className="hidden lg:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="text-white text-md flex gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiLogIn />
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="text-white text-md flex  gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
            <Disclosure.Panel className="lg:hidden">
              <nav className="items-center bg-@blue py-5 px-10 w-auto">
                <div className="block lg:hidden flex-col justify-start gap-5">
                  {checkToken ? (
                    checkRole === "student" ? (
                      <div className="flex flex-col gap-3">
                        <Link
                          to="/student/profile"
                          className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold w-full duration-500 ease-in-out"
                        >
                          PROFILE
                        </Link>
                        <Link
                          to="/student/transactions"
                          className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                        >
                          TRANSACTIONS
                        </Link>
                        <Link
                          to="/student/register-school"
                          className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                        >
                          REGISTER SCHOOL
                        </Link>
                        <button
                          className="text-white text-md flex items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                          onClick={() => handleLogout()}
                        >
                          LOGOUT
                        </button>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          as={Fragment}
                        >
                          {({ checked }) => (
                            /* Use the `checked` state to conditionally style the button. */
                            <button
                              className={`${
                                checked ? "bg-blue-600" : "bg-gray-200"
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  checked ? "translate-x-5" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </button>
                          )}
                        </Switch>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Link
                          to="/login"
                          className="text-white text-md flex py-2 gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                        >
                          <BiLogOut />
                          LOGOUT
                        </Link>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          as={Fragment}
                        >
                          {({ checked }) => (
                            /* Use the `checked` state to conditionally style the button. */
                            <button
                              className={`${
                                checked ? "bg-blue-600" : "bg-gray-200"
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  checked ? "translate-x-5" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </button>
                          )}
                        </Switch>
                      </div>
                    )
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-white text-md flex py-2 gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiLogIn />
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="text-white text-md flex py-2 gap-4 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
                    </>
                  )}
                </div>
              </nav>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export const NavbarAdmin: FC = () => {
  const [cookie, , removeCookie] = useCookies(["tkn", "role", "uname"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);

  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  useEffect(() => {
    handleTheme();
  }, [enabled]);

  const handleTheme = () => {
    if (enabled === true) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("role");
        removeCookie("uname");
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are logout !!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <Disclosure as="nav" className="bg-@orange z-50">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between py-3">
              <div className="absolute inset-y-0 right-3 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center justify-between bg-@orange px-10 ">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  <div className="hidden lg:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/admin/profile"
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/admin/admission"
                        className="text-white text-md flex justify-center items-center w-52 xl:w-72  hover:scale-110 hover:text-@dark  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                      >
                        STUDENT ADMISSION
                      </Link>
                      <Link
                        to="/admin/result"
                        className="text-white text-md flex items-center justify-center w-44 xl:w-72 hover:scale-110 hover:text-@dark transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                      >
                        TEST RESULT
                      </Link>
                      <button
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        <BiLogOut className="mr-3" />
                        LOGOUT
                      </button>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="text-white text-md flex gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiLogIn />
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="text-white text-md flex  gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
            <Disclosure.Panel className="lg:hidden">
              <nav className="items-center bg-@orange dark:bg-orange-800 py-5 px-10 w-auto">
                <div className="flex flex-col justify-end gap-5">
                  {checkToken && cookie.role === "administrator" ? (
                    <>
                      <Link
                        to="/admin/profile"
                        className="text-white text-md flex items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold w-full duration-500 ease-in-out"
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/admin/admission"
                        className="text-white text-md flex items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                      >
                        STUDENT ADMISSION
                      </Link>
                      <Link
                        to="/admin/result"
                        className="text-white text-md flex items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                      >
                        TEST RESULT
                      </Link>
                      <button
                        className="text-white text-md flex items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out"
                        onClick={() => handleLogout()}
                      >
                        <BiLogOut className="mr-3" />
                        LOGOUT
                      </button>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiLogIn />
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="text-white text-md flex gap-4 items-center  hover:scale-110 hover:bg-@orange hover:px-4 hover:py-3  transition-all font-semibold  md:mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
                    </>
                  )}
                </div>
              </nav>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export const NavbarIndexAdmin: FC = () => {
  const [cookie, , removeCookie] = useCookies(["tkn", "role", "uname"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);

  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  useEffect(() => {
    handleTheme();
  }, [enabled]);

  const handleTheme = () => {
    if (enabled === true) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("role");
        removeCookie("uname");
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are logout !!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Disclosure as="nav" className="bg-@orange z-50">
      {({ open }) => (
        <>
          <div className=" absolute z-40 opacity-50 hover:opacity-90 duration-500 w-full">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 right-3 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center py-3  justify-between bg-@orange px-10 ">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  <div className="hidden lg:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/admin/profile"
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/admin/admission"
                        className="text-white text-md flex justify-center items-center w-52 xl:w-72  hover:scale-110 hover:text-@dark  transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        STUDENT ADMISSION
                      </Link>
                      <Link
                        to="/admin/result"
                        className="text-white text-md flex items-center justify-center w-44 xl:w-72 hover:scale-110 hover:text-@dark transition-all font-semibold  mr-[6%] duration-500 ease-in-out    "
                      >
                        TEST RESULT
                      </Link>
                      <button
                        className="text-white text-md flex items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        <BiLogOut />
                        LOGOUT
                      </button>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
            <Disclosure.Panel className="lg:hidden">
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
                      className="text-white text-md flex gap-2 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      onClick={() => handleLogout()}
                    >
                      <BiLogOut />
                      LOGOUT
                    </button>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        /* Use the `checked` state to conditionally style the button. */
                        <button
                          className={`${
                            checked ? "bg-blue-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              checked ? "translate-x-5" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </button>
                      )}
                    </Switch>
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
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        /* Use the `checked` state to conditionally style the button. */
                        <button
                          className={`${
                            checked ? "bg-blue-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              checked ? "translate-x-5" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </button>
                      )}
                    </Switch>
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
  const [cookie, , removeCookie] = useCookies(["tkn", "role", "uname"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);

  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  useEffect(() => {
    handleTheme();
  }, [enabled]);

  const handleTheme = () => {
    if (enabled === true) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("role");
        removeCookie("uname");
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are logout !!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Disclosure as="nav" className="bg-@blue dark:bg-cyan-700 z-50">
      {({ open }) => (
        <>
          <div className=" absolute z-40 opacity-50 hover:opacity-90 duration-500 w-full">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 right-3 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <nav className="flex-1 flex items-center py-3  justify-between bg-@blue px-10 ">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-full mr-2 hover:scale-105 duration-500"
                  />
                </Link>
                {checkToken ? (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <button
                        className="text-white text-md flex gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                        onClick={() => handleLogout()}
                      >
                        <BiLogOut />
                        LOGOUT
                      </button>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-12 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
                        className="text-white text-md flex gap-3 items-center justify-center hover:scale-110 hover:text-@dark   transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      >
                        <BiUserPlus className="text-xl" />
                        REGISTER
                      </Link>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          /* Use the `checked` state to conditionally style the button. */
                          <button
                            className={`${
                              checked ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </button>
                        )}
                      </Switch>
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
            <Disclosure.Panel className="lg:hidden">
              {checkToken ? (
                <nav className=" items-center bg-@blue pt-32 pb-5 px-10 w-auto">
                  <div className="flex flex-col justify-end gap-5">
                    <button
                      className="text-white text-md flex gap-3 items-center  hover:scale-110 hover:bg-@blue hover:px-4 hover:py-3  transition-all font-semibold  mr-[6%] duration-500 ease-in-out   "
                      onClick={() => handleLogout()}
                    >
                      <BiLogOut />
                      LOGOUT
                    </button>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        /* Use the `checked` state to conditionally style the button. */
                        <button
                          className={`${
                            checked ? "bg-blue-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              checked ? "translate-x-5" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </button>
                      )}
                    </Switch>
                  </div>
                </nav>
              ) : (
                <nav className="items-center bg-@blue pt-32 pb-5 px-10 w-auto">
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
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        /* Use the `checked` state to conditionally style the button. */
                        <button
                          className={`${
                            checked ? "bg-blue-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              checked ? "translate-x-5" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </button>
                      )}
                    </Switch>
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
