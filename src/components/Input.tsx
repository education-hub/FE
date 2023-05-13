import { FC, InputHTMLAttributes } from "react";

export const InputWhite: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="bg-white h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

export const InputLightBlue: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

export const TextAreaLightBlue: FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return (
    <textarea
      className="bg-@light-blue h-32 pt-5 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

export const TextAreaWhite: FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return (
    <textarea
      className="bg-white h-32 pt-5 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};
