import { FC } from "react";

import { ButtonSubmit, ButtonCancelDelete } from "../../components/Button";
import { Layout } from "../../components/Layout";

const HerRegistration: FC = () => {
  return (
    <Layout>
      <div className="p-20 w-full h-full">
        <div className="p-5 bg-@blue w-full px-10 h-full text-center">
          <p className="text-2xl font-bold">Her-Registration Payment </p>
        </div>
        <div className="grid grid-cols-2 gap-96 bg-@light-blue p-20">
          <div className="w-full px-10 h-full">
            <p className="text-2xl font-bold">One Payment</p>
            <table className="font-semibold text-base tracking-wide">
              <tr>
                <td className="p-4">Her registration</td>
                <td className="p-4">:</td>
                <td className="p-4">Rp 1.000.000</td>
              </tr>
              <tr>
                <td className="p-4">Building</td>
                <td className="p-4">:</td>
                <td className="p-4">Rp 2.000.000</td>
              </tr>
              <tr className="border-separate">
                <td className="p-4">Books</td>
                <td className="p-4">:</td>
                <td className="p-4">Rp 2.000.000</td>
              </tr>
            </table>
            <p className="text-2xl font-bold mt-7">Interval Payment</p>
            <table className="font-semibold text-base tracking-wide mb-10">
              <tr>
                <td className="p-4">SPP</td>
                <td className="pl-[4.7rem]">:</td>
                <td className="p-4">Rp 500.000</td>
              </tr>
              <tr className="border-separate">
                <td className="p-4">Building</td>
                <td className="pl-[4.7rem]">:</td>
                <td className="p-4">Rp 100.000</td>
              </tr>
            </table>
            <ButtonSubmit label="Payment Method" />
          </div>
          <div className="bg-white w-full px-10 h-full text-center">
            <p className="text-2xl font-bold pb-44 pt-10 tracking-wide">
              Detail Payment
            </p>
            <p className="text-2xl font-bold mb-16 tracking-wide">
              Total Rp 5.600.000
            </p>
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

export default HerRegistration;
