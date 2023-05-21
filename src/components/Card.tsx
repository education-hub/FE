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
      <div className="p-10 bg-@light-blue flex flex-col items-center text-lg font-semibold hover:scale-105 duration-500">
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
      <div className="grid grid-cols-2 mt-10 gap-x-20 gap-y-5">
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
      <div className="flex justify-between">
        <div className="flex flex-col w-[10%] gap-1 mt-5">
          <p>Answer</p>
          <div className="bg-@light-blue flex items-center justify-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
            {answer}
          </div>
        </div>
        <div className="flex gap-10 mt-5 justify-end items-end">
          <ButtonCancelDelete label="Delete" onClick={onClick1} />
          <ButtonSubmit label="Edit" onClick={onClick2} />
        </div>
      </div>
    </>
  );
};
