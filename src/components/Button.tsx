import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonSubmit: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button className="" {...props}>
      {label}
    </button>
  );
};
