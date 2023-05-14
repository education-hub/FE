import { FC } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";

const Admission: FC = () => {
  return (
    <LayoutAdmin>
      <div className="p-20 flex flex-col gap-10">
        <div className="grid grid-cols-6 gap-20">
          <div>
            <img src="/org1.png" alt="" />
          </div>
          <div>
            <p>Student_id</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>1</p>
            </div>
          </div>
          <div className="col-span-2">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Satrio Wibowo</p>
            </div>
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Detail Admission" />
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Update Progress" />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-20">
          <div>
            <img src="/org2.png" alt="" />
          </div>
          <div>
            <p>Student_id</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>2</p>
            </div>
          </div>
          <div className="col-span-2">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Dayanti Minahasa</p>
            </div>
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Detail Admission" />
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Update Progress" />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-20">
          <div>
            <img src="/org3.png" alt="" />
          </div>
          <div>
            <p>Student_id</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>3</p>
            </div>
          </div>
          <div className="col-span-2">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Amelia Rosnaida</p>
            </div>
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Detail Admission" />
          </div>
          <div className="pt-6">
            <ButtonSubmit label="Update Progress" />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Admission;
