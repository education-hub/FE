import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";

const Transaction: FC = () => {
  return (
    <Layout>
      <div className="p-20">
        <div className="grid grid-cols-9 gap-4 mt-5">
          <div>
            <img src="/SMA-N-1-Yogyakarta.jpg" alt="" className="h-20 w-auto" />
          </div>
          <div className="col-span-3 grid grid-rows-3">
            <p className="font-semibold text-gray-500">School Name</p>
            <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
              SMAN 2 Yogyakarta
            </div>
          </div>
          <div className="col-span-2 h-full w-full">
            <ButtonSubmit label="Detail Transaction" />
          </div>
        </div>
        <div className="grid grid-cols-9 gap-4 mt-16">
          <div>
            <img src="/school.png" alt="" className="h-20 w-auto" />
          </div>
          <div className="col-span-3 grid grid-rows-3">
            <p className="font-semibold text-gray-500">School Name</p>
            <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
              SMAN 1 Yogyakarta
            </div>
          </div>
          <div className="col-span-2 h-full w-full">
            <ButtonSubmit label="Detail Transaction" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
