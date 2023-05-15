import { FC } from "react";
import { Layout } from "../../components/Layout";
import { InputLightBlue } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";

const ForgetPassword: FC = () => {
  return (
    <Layout>
      <div className="h-screen pt-20 md:w-[50%] mx-auto text-lg text-@dark flex flex-col gap-5">
        <div className="mb-10 text-center">
          <p className="text-2xl font-bold">New Password</p>
        </div>
        <div>
          <p className="mb-2">New Password</p>
          <InputLightBlue />
        </div>
        <div>
          <p className="mb-2">Re-Type Password</p>
          <InputLightBlue />
        </div>
        <div className="flex justify-end mt-10">
          <ButtonSubmit label="Update Password" />
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
