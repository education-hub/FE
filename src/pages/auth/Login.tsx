import { FC } from "react";
import { Link } from "react-router-dom";
// import { useForm, SubmitHandle } from "react-hook-form";

import { ButtonSubmit } from "../../components/Button";
import { InputLightBlue } from "../../components/Input";
import Logo from "../../assets/eduhub-logo-black.png";
import BackGroundImage from "../../assets/eduhub-login.jpg";

const Login: FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col md:flex-row h-full w-screen">
        <div
          className="md:w-1/2 flex bg-cover bg-center h-screen"
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
        <div className="w-full md:w-1/2 flex p-16 items-center">
          <div className="bg-white p-x rounded-lg w-full">
            <h1 className="text-gray-800 text-2xl font-bold mb-4">Sign in</h1>
            <form className="space-y-4 w-full">
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
                <Link
                  className="flex flex-col text-@black underline text-base font-semibold items-end"
                  to={""}
                >
                  Forget your password
                </Link>
              </div>
              <div className="pt-4 flex flex-col items-center justify-center">
                <ButtonSubmit label="Sign in" />
                <p className="text-center font-semibold text-base text-black pt-4">
                  Don't have an account?{" "}
                  {
                    <Link
                      className="text-@black underline text-base font-semibold"
                      to={"/register"}
                    >
                      Sign up
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

export default Login;
