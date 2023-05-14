import { FC } from "react";
import { Link } from "react-router-dom";

import { ButtonSubmit } from "../../components/Button";
import { InputLightBlue, TextAreaLightBlue } from "../../components/Input";
import Logo from "../../assets/eduhub-logo-black.png";
import BackGroundImage from "../../assets/eduhub-register.jpg";

const Register: FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col md:flex-row h-full w-screen">
        <div
          className="md:w-1/2 flex bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.5)),url(${BackGroundImage})`,
          }}
        >
          <div className="w-4/5 px-20 py-52">
            <img src={Logo} alt="logo" className="mb-8" />
            <h1 className="text-black text-4xl font-extrabold">
              Web platform for school review and education community
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex p-16">
          <div className="bg-white p-x rounded-lg w-full">
            <h1 className="text-gray-800 text-2xl font-bold mb-4">Sign up</h1>
            <h2 className="text-gray-800 text-lg font-bold mb-8">
              Join with us to find your dream school!
            </h2>
            <form className="space-y-4 w-full">
              <div>
                <label className="block text-gray-700 font-bold">Email</label>
                <InputLightBlue type="email" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  First Name
                </label>
                <InputLightBlue type="text" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Last Name
                </label>
                <InputLightBlue type="text" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Username
                </label>
                <InputLightBlue type="text" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Password
                </label>
                <InputLightBlue type="password" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Retype Password
                </label>
                <InputLightBlue type="password" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Address</label>
                <TextAreaLightBlue />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Role</label>
                <div className="relative">
                  <select className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                    <option value="" selected disabled hidden>
                      Select your role
                    </option>
                    <option value="administrator">Administrator</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex flex-col items-center justify-center">
                <ButtonSubmit label="Sign up" />
                <p className="text-center font-semibold text-base text-black pt-4">
                  Already a member?{" "}
                  {
                    <Link
                      className="text-@black underline text-base font-semibold"
                      to={"/login"}
                    >
                      Sign in
                    </Link>
                  }
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
