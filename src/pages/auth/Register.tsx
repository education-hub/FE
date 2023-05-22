import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import Swal from "sweetalert2";
import { RxReload } from "react-icons/rx";

import { ButtonSubmit } from "../../components/Button";
import {
  InputLightBlue,
  SelectLightBlue,
  TextAreaLightBlue,
} from "../../components/Input";
import Logo from "../../assets/eduhub-logo-black.png";
import BackGroundImage from "../../assets/eduhub-register.jpg";

const roleOptions = z.enum(["administrator", "student"]);

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "First name is required" }),
  username: z.string().min(4, { message: "Username is must min 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  retype_password: z.string().min(1, { message: "Retyp Password is required" }),
  address: z.string().min(1, { message: "Address is Requerid" }),
  role: roleOptions,
});
type Schema = z.infer<typeof schema>;

const Register: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [buttonGetCapthca, setButtonGetCapthca] = useState<boolean>(true);

  const navigate = useNavigate();

  const getCaptcha = () => {
    axios
      .get("https://go-event.online/getcaptcha")
      .then((response) => {
        const { data } = response.data;
        setCaptchaId(data.captchaid);
        setCaptchaImage(data.image);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonGetCapthca(false);
        setShowCaptcha(true);
        setButtonSubmit(false);
      });
  };

  const submit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    console.log(data);
    if (data.password !== data.retype_password) {
      Swal.fire({
        icon: "warning",
        title: "Password not match, please check!!",
        showCancelButton: false,
      });
    } else {
      axios
        .post("https://go-event.online/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Registration Success!!",
            text: "check e-mail inbox to verify email registrations",
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              setButtonSubmit(true);
              setShowCaptcha(false);
              setButtonGetCapthca(false);
              navigate("/login");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          const { message } = error.response.data;
          Swal.fire({
            icon: "error",
            title: message,
            showCancelButton: false,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const handlePostCaptcha = async () => {
    const requestBody = {
      captcha_id: captchaId,
      value: captchaValue,
    };
    console.log(requestBody);
    axios
      .post("https://go-event.online/verifycaptcha", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        const { code } = response.data;
        console.log(code);
        Swal.fire({
          icon: "success",
          title: "Verified Success!!",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setButtonSubmit(true);
            setShowCaptcha(false);
            setButtonGetCapthca(false);
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
      });
  };

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
            <form className="space-y-4 w-full" onSubmit={handleSubmit(submit)}>
              <InputLightBlue
                label="Email"
                type="email"
                name="email"
                id="input-email"
                register={register}
                error={errors.email?.message}
              />
              <div className="grid lg:grid-cols-2 gap-5">
                <InputLightBlue
                  label="First Name"
                  type="text"
                  name="firstname"
                  id="input-first_name"
                  register={register}
                  error={errors.firstname?.message}
                />
                <InputLightBlue
                  label="Last Name"
                  type="text"
                  name="lastname"
                  id="input-last_name"
                  register={register}
                  error={errors.lastname?.message}
                />
              </div>
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
              <InputLightBlue
                label="Retype password"
                type="password"
                name="retype_password"
                id="input-retype_password"
                register={register}
                error={errors.retype_password?.message}
              />
              <TextAreaLightBlue
                label="Address"
                name="address"
                id="input-address"
                register={register}
                error={errors.address?.message}
              />
              <SelectLightBlue
                label="Select Role"
                name="role"
                id="input-role"
                register={register}
                error={errors.role?.message}
              />
              {buttonSubmit ? (
                <ButtonSubmit label="Sign up" type="submit" />
              ) : (
                <ButtonSubmit label="Sign up" type="submit" disabled />
              )}
            </form>
            <div className="pt-4 flex flex-col items-center justify-center">
              {showCaptcha ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center space-x-5">
                    {captchaImage && <img src={captchaImage} alt="Captcha" />}
                    <RxReload
                      className="text-3xl hover:font-bold hover:bg-@blue hover:rounded-full hover:p-1 hover:text-white"
                      onClick={() => getCaptcha()}
                    />
                  </div>
                  <div>
                    <InputLightBlue
                      label="You are not robot??!!"
                      type="text"
                      value={captchaValue}
                      onChange={(e) => setCaptchaValue(e.target.value)}
                    />
                  </div>
                  <ButtonSubmit
                    label="Verify Captcha!!"
                    onClick={() => handlePostCaptcha()}
                  />
                </div>
              ) : (
                <></>
              )}

              <input
                type="checkbox"
                placeholder="Show Submit Button"
                onChange={() => getCaptcha()}
              />

              {loading ? <div>loading...</div> : <></>}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
