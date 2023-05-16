import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { InputLightBlue } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";

const schema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  retype_password: z.string().min(1, { message: "Retyp Password is required" }),
});

type Schema = z.infer<typeof schema>;

const ForgetPassword: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const params = useParams();

  const submit: SubmitHandler<Schema> = (data) => {
    const { token } = params;
    console.log(data);
    setLoading(true);

    if (data.password !== data.retype_password) {
      Swal.fire({
        icon: "warning",
        title: "Password not match, please check!!",
        showCancelButton: false,
      });
    } else {
      axios
        .post(`https://go-event.online/reset/${token}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const { message } = response.data;
          Swal.fire({
            icon: "success",
            title: message,
            text: "Check your email inbox",
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
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
    }
  };

  return (
    <Layout>
      <div className="h-screen pt-20 md:w-[50%] mx-auto text-lg text-@dark flex flex-col gap-5">
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-10 text-center">
            <p className="text-2xl font-bold">New Password</p>
          </div>
          <InputLightBlue
            label="New password"
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
          <div className="flex justify-end mt-10">
            <ButtonSubmit label="Update Password" type="submit" />
            {loading ? <div>Loading..</div> : <></>}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
