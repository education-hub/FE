import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { ButtonSubmit } from "../../components/Button";
import { InputLightBlue } from "../../components/Input";
import Logo from "../../assets/eduhub-logo-black.png";
import BackGroundImage from "../../assets/eduhub-login.jpg";
import Swal from "sweetalert2";

const schema = z.object({
  username: z.string().min(4, { message: "username minimum 4 characters" }),
  password: z.string().min(6, { message: "password minimum 6 characters" }),
});

type Schema = z.infer<typeof schema>;

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setCookie] = useCookies(["tkn", "role"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const Login: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("https://go-event.online/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response.data;
        Swal.fire({
          icon: "success",
          title: "Login Success!!",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("tkn", data.token, { path: "/" });
            setCookie("role", data.role, { path: "/" });
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

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
            <form className="space-y-4 w-full" onSubmit={handleSubmit(Login)}>
              <div>
                <InputLightBlue
                  label="Username"
                  type="text"
                  name="username"
                  id="input-username"
                  register={register}
                  error={errors.username?.message}
                />
                <InputLightBlue
                  label="Password"
                  type="password"
                  name="password"
                  id="input-password"
                  register={register}
                  error={errors.password?.message}
                />
                <Link
                  className="flex flex-col text-@black underline text-base font-semibold items-end"
                  to={"/pwd-reset"}
                >
                  Forget your password
                </Link>
              </div>
              <div className="pt-4 flex flex-col items-center justify-center">
                <ButtonSubmit label="Sign in" type="submit" />
                {loading ? <div>Loading..</div> : <></>}
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
