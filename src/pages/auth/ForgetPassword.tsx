import { FC } from "react";
import { Layout } from "../../components/Layout";
import { InputLightBlue } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";

const ForgetPassword: FC = () => {
  return (
    <Layout>
      <div className="h-screen pt-20 md:w-[50%] mx-auto text-lg text-@dark">
        <div className="mb-10 text-center">
          <p className="text-2xl font-bold">Reset Password</p>
        </div>
        <p className="mb-2">Input your email</p>
        <InputLightBlue />
        <div className="flex justify-end mt-10">
          <ButtonSubmit label="Reset" />
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
