import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonSubmit: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button
      className="bg-@blue hover:bg-@orange hover:-translate-y-2 duration-500 px-7 py-5 text-white font-medium"
      {...props}
    >
      {label}
    </button>
  );
};

export const ButtonCancelDelete: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button
      className="bg-@orange hover:bg-@blue hover:-translate-y-2 duration-500 px-7 py-5 text-white font-medium"
      {...props}
    >
      {label}
    </button>
  );
};

export const ButtonCheckout: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button
      className="bg-fuchsia-500 hover:bg-indigo-600 hover:-translate-y-2 duration-500 px-7 py-5 text-white font-medium"
      {...props}
    >
      {label}
    </button>
  );
};
