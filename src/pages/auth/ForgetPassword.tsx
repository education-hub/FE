import { FC, useState } from "react";
import { Layout } from "../../components/Layout";
import { InputLightBlue } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, { message: "Must input Email" }).email({
    message: "Must be a valid email",
  }),
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

  const submit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("https://go-event.online/forgot", data, {
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
  };

  return (
    <Layout>
      <div className="h-screen pt-20 md:w-[50%] mx-auto text-lg text-@dark">
        <div className="mb-10 text-center">
          <p className="text-2xl font-bold">Reset Password</p>
        </div>
        <form onSubmit={handleSubmit(submit)}>
          <InputLightBlue
            label="Input your Email"
            type="email"
            name="email"
            id="input-email"
            register={register}
            error={errors.email?.message}
          />
          <div className="flex justify-end mt-10">
            <ButtonSubmit label="Reset" type="submit" />
            {loading ? <div>Loading..</div> : <></>}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
