import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

const FirstRegistration: FC = () => {
  return (
    <Layout>
      <div className="p-20 w-full h-full">
        <div className="p-5 bg-@blue w-full px-10 h-full text-center">
          <p className="text-2xl font-bold">First Registration Payment </p>
        </div>
        <div className="grid grid-cols-2 gap-96 bg-@light-blue p-20">
          <div className="w-full px-10 h-full">
            <p className="text-2xl font-bold pb-80">
              First registration : Rp 200.000
            </p>
            <ButtonSubmit label="Payment Method" />
          </div>
          <div className="bg-white w-full px-10 h-full text-center">
            <p className="text-2xl font-bold pb-44 pt-10">Detail Payment</p>
            <p className="text-2xl font-bold mb-16">Total Rp 200.000</p>
            <ButtonCancelDelete label="Checkout" />
          </div>
        </div>
        <div className="flex flex-row justify-end mt-14">
          <p className="text-lg p-5 font-semibold tracking-wide">
            Pay Before: xxx
          </p>
          <ButtonSubmit label="Pay" />
        </div>
      </div>
    </Layout>
  );
};

export default FirstRegistration;
