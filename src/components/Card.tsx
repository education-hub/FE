import { FC } from "react";
import { ButtonSubmit, ButtonCancelDelete } from "./Button";

interface AddCostType {
  title?: string;
  price: number;
  image: string;
}

export const CardCost: FC<AddCostType> = (props) => {
  const { title, price, image } = props;
  return (
    <div className="flex flex-col gap-5">
      <div className="p-10 bg-@light-blue flex flex-col items-center text-lg font-semibold hover:-translate-y-2 hover:drop-shadow-lg duration-500">
        <img src={image} alt="" className="h-32 hover:scale-110 duration-500" />
        <p className="mt-10">{title}</p>
        <p className="mt-5 text-@orange">Rp {price.toLocaleString("id")}</p>
      </div>
    </div>
  );
};

interface AddQuizType {
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: number;
  onClick1: React.MouseEventHandler<HTMLButtonElement>;
  onClick2: React.MouseEventHandler<HTMLButtonElement>;
}

export const CardAddQuiz: FC<AddQuizType> = (props) => {
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    onClick1,
    onClick2,
  } = props;
  return (
    <>
      <div className="flex flex-col gap-1 my-10">
        <p>Question</p>
        <div className="bg-@blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-white font-medium px-4 focus:outline-none  w-full">
          {question}
        </div>
      </div>
      <div className="grid md:grid-cols-2 mt-10 gap-x-7 gap-y-5">
        <div className="flex flex-col gap-1">
          <p>Option 1</p>
          <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {option1}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Option 2</p>
          <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {option2}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Option 3</p>
          <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {option3}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Option 4</p>
          <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {option4}
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-10">
        <div className="flex flex-col gap-1 mt-5">
          <p>Answer</p>
          <div className="bg-@light-blue flex items-center justify-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {answer}
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <ButtonCancelDelete label="Delete" onClick={onClick1} />
        </div>
        <div className="flex flex-col justify-end">
          <ButtonSubmit label="Edit" onClick={onClick2} />
        </div>
      </div>
    </>
  );
};

interface DetailAdmissionType {
  number: number;
  title: string;
  data: string | number;
}

export const CardDetailAdmission: FC<DetailAdmissionType> = (props) => {
  const { number, title, data } = props;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 bg-sky-100 border-2 border-sky-700">
      <div className="flex gap-3 p-3 ">
        <p>{number}.</p>
        <p>{title}</p>
      </div>
      <div className="flex gap-3 border-l-2 border-white p-3">
        <p>{data}</p>
      </div>
    </div>
  );
};

export const CardDetailAdmission2: FC<DetailAdmissionType> = (props) => {
  const { number, title, data } = props;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 bg-sky-200 border-2 border-sky-700">
      <div className="flex gap-3  p-3 ">
        <p>{number}.</p>
        <p>{title}</p>
      </div>
      <div className="flex gap-3 border-l-2 border-white p-3">
        <p>{data}</p>
      </div>
    </div>
  );
};

interface DetailAdmissionAddressType {
  number: number;
  province: string;
  city: string;
  district: string;
  village: string;
  zip_code: string;
}

export const CardDetailAdmissionAddress: FC<DetailAdmissionAddressType> = (
  props
) => {
  const { number, province, city, district, village, zip_code } = props;
  return (
    <>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 bg-sky-100 border-t-2 border-l-2 border-r-2 border-sky-700">
        <div className="flex gap-3 px-3 pt-3 lg:p-3">
          <p>{number}.</p>
          <p>Address</p>
        </div>
        <div className="sm:pl-7 lg:pl-0 col-span-2">
          <div className="flex pt-3 gap-5 lg:border-l-2 border-l-white">
            {/* provence */}
            <div className="pl-5 flex flex-col w-full lg:pb-5 ">
              <p className="text-gray-700">Province</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{province}</p>
              </div>
            </div>
            {/* city */}
            <div className="pr-5 flex flex-col w-full lg:pb-5">
              <p className="text-gray-700">City</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-3 bg-sky-100 border-l-2 border-r-2 border-sky-700">
        <div className="hidden lg:block gap-5 p-3"></div>
        <div className="sm:pl-7 lg:pl-0 col-span-2 space-x-3">
          <div className="flex pt-3 gap-5 lg:border-l-2 border-white">
            {/* district */}
            <div className="pl-5 flex flex-col w-full ">
              <p className="text-gray-700">District</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{district}</p>
              </div>
            </div>
            {/* village */}
            <div className="pr-5 flex flex-col w-full pb-5">
              <p className="text-gray-700">Village</p>
              <div className="bg-white  px-2  md:px-3 flex items-center  h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{village}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-3 bg-sky-100 border-b-2 border-l-2 border-r-2 border-sky-700">
        <div className="hidden lg:block lg:gap-5 p-3"></div>
        <div className="sm:pl-7 lg:pl-0 col-span-1 space-x-3">
          <div className="flex lg:pt-3 gap-5 lg:border-l-2 border-white">
            {/* zip_code */}
            <div className="pl-5 flex flex-col w-full pb-5">
              <p className="text-gray-700">Zip Code</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{zip_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CardDetailAdmissionAddress2: FC<DetailAdmissionAddressType> = (
  props
) => {
  const { number, province, city, district, village, zip_code } = props;
  return (
    <>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 bg-sky-200 border-t-2 border-l-2 border-r-2 border-sky-700">
        <div className="flex gap-5 px-3 pt-3 lg:p-3">
          <p>{number}.</p>
          <p>Address</p>
        </div>
        <div className=" sm:pl-7 lg:pl-0 col-span-2 space-x-3">
          <div className="flex pt-3 gap-5 lg:border-l-2 border-white">
            {/* provence */}
            <div className="pl-5 flex flex-col w-full lg:pb-5">
              <p className="text-gray-700">Province</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{province}</p>
              </div>
            </div>
            {/* city */}
            <div className="pr-5 flex flex-col w-full lg:pb-5">
              <p className="text-gray-700">City</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-3 bg-sky-200 border-l-2 border-r-2 border-sky-700">
        <div className="hidden lg:block gap-5 p-3"></div>
        <div className="sm:pl-7 lg:pl-0 col-span-2 space-x-3">
          <div className="flex pt-3 gap-5 lg:border-l-2 border-white">
            {/* district */}
            <div className="pl-5 flex flex-col w-full ">
              <p className="text-gray-700">District</p>
              <div className="bg-white px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{district}</p>
              </div>
            </div>
            {/* village */}
            <div className="pr-5 flex flex-col w-full pb-5">
              <p className="text-gray-700">Village</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{village}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-3 bg-sky-200 border-b-2 border-l-2 border-r-2 border-sky-700">
        <div className="hidden lg:block lg:gap-5 p-3"></div>
        <div className="sm:pl-7 lg:pl-0 col-span-1 space-x-3">
          <div className="flex lg:pt-3 gap-5 lg:border-l-2 border-white">
            {/* zip_code */}
            <div className="pl-5 flex flex-col w-full pb-5">
              <p className="text-gray-700">Zip Code</p>
              <div className="bg-white  px-2 md:px-3 flex items-center h-20 sm:h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>{zip_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
