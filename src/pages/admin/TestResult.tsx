import { FC } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const TestResult: FC = () => {
  const navigate = useNavigate();
  return (
    <LayoutAdmin>
      <div className="p-20 flex flex-col gap-10">
        <div className="grid grid-cols-3 gap-20">
          <div className="">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Satrio Wibowo</p>
            </div>
          </div>
          <div>
            <p>Email</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>satrio@gmail.com</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="bg-@blue duration-500 px-7 h-16 flex w-32 justify-center items-center text-white font-semibold">
              <p>PASSED</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-20">
          <div className="">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Amelia Rosnaida</p>
            </div>
          </div>
          <div>
            <p>Email</p>
            <div className="bg-@light-blue px-3 flex items-center h-16  text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>amelia@gmail.com</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="bg-@orange duration-500 px-7 h-16 w-32 justify-center flex items-center text-white font-semibold">
              <p>FAILED</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-20">
          <div className="">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none">
              <p>Dayanti Minahasa</p>
            </div>
          </div>
          <div>
            <p>Email</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none">
              <p>dayanti@gmail.com</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="bg-@blue duration-500 px-7 h-16 w-32 justify-center flex items-center text-white font-semibold">
              <p>PASSED</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default TestResult;
