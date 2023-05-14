import { FC } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { TbArrowUp } from "react-icons/tb";

interface AddFAQType {
  question: string;
  answer: string;
}

export const AccordionFAQStudent: FC<AddFAQType> = (props) => {
  const { question, answer } = props;
  return (
    <>
      <div className="py-5">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full relative z-20  justify-between bg-@blue px-4 h-16 items-center text-left text-lg font-semibold text-white hover:bg-cyan-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{question}</span>
                <TbArrowUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-500 transform"
                enterFrom="relative z-10 -translate-y-[80%]"
                enterTo="relative z-10 translate-y-0"
                leave="transition duration-500 transform"
                leaveFrom="relative z-10 translate-y-0"
                leaveTo="relative z-10 -translate-y-[80%] opacity-0"
              >
                <Disclosure.Panel
                  static
                  className="px-4 text-lg font-semibold text-gray-500 bg-@light-blue py-7"
                >
                  {answer}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
