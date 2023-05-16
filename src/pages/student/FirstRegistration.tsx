import { FC, useState, Fragment } from "react";

import { Layout } from "../../components/Layout";
import { Transition, Dialog } from "@headlessui/react";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

const FirstRegistration: FC = () => {
  const [, setIsOpen] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);

  const openModalPayment = () => {
    setIsOpenPayment(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
          <ButtonSubmit label="Pay" onClick={openModalPayment} />
        </div>
      </div>

      <>
        {/* modal FAQ */}
        <Transition appear show={isOpenPayment} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                    >
                      Payment
                    </Dialog.Title>
                    <div className="pb-10">
                      <div className="grid grid-rows-3 grid-flow-col gap-10 mt-10">
                        <div className="grid grid-cols-4 gap-16 text-lg tracking-wide">
                          <div className="col-span-2">
                            <p className="bg-@blue text-white p-4">Invoice</p>
                            <p className="bg-@light-blue text-black py-6 pl-4">
                              INV/01/XXX/XXX
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="bg-@blue text-white p-4">
                              Payment Method
                            </p>
                            <p className="bg-@light-blue text-black py-6 pl-4">
                              BCA
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-16 text-lg tracking-wide">
                          <div className="col-span-2">
                            <p className="bg-@blue text-white p-4">Total</p>
                            <p className="bg-@light-blue text-black py-6 pl-4">
                              200.000
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="bg-@blue text-white p-4">
                              Code Payment
                            </p>
                            <p className="bg-@light-blue text-black py-6 pl-4">
                              xxx
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-16 text-lg tracking-wide">
                          <div className="col-span-2">
                            <p className="bg-@blue text-white p-4">
                              Expired Date
                            </p>
                            <p className="bg-@light-blue text-black py-6 pl-4">
                              12/05/2023
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-5 justify-end">
                      <ButtonCancelDelete label="Pay Now" />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </Layout>
  );
};

export default FirstRegistration;
