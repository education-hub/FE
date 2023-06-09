import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: any;
  error?: string;
  label: string;
  option1?: string;
  option2?: string;
  valueoption1?: string;
  valueoption2?: string;
}

export const InputWhite: FC<Partial<Props>> = (props) => {
  const { register, name, error, label } = props;
  return (
    <div>
      <label className="block text-gray-700 dark:text-white  font-bold">
        {label}
      </label>
      <input
        className="bg-white h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export const InputLightBlue: FC<Partial<Props>> = (props) => {
  const { register, name, error, label } = props;
  return (
    <div>
      <label className="block text-gray-700 dark:text-white font-bold">
        {label}
      </label>
      <input
        className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none w-full"
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register?: any;
  error?: string;
  label: string;
}

export const TextAreaLightBlue: FC<Partial<TextAreaProps>> = (props) => {
  const { register, name, error, label } = props;
  return (
    <div>
      <label className="block text-gray-700 dark:text-white font-bold">
        {label}
      </label>
      <textarea
        className="bg-@light-blue h-32 pt-5 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
        {...props}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export const TextAreaWhite: FC<Partial<TextAreaProps>> = (props) => {
  const { register, name, error, label } = props;
  return (
    <div>
      <label className="block text-gray-700 dark:text-white font-bold">
        {label}
      </label>
      <textarea
        className="bg-white h-32 pt-5 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
        {...props}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export const RadioLightBlue: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="h-7 sm:h-8 w-full flex items-center text-md sm:text-lg md:text-xl"
      {...props}
    />
  );
};

export const SelectLightBlue: FC<Props> = (props) => {
  const {
    register,
    name,
    error,
    option1,
    option2,
    valueoption1,
    valueoption2,
  } = props;
  return (
    <div>
      <div className="relative">
        <select
          className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full"
          {...(register ? register(name) : {})}
          {...props}
        >
          <option value="" disabled hidden>
            Select your role
          </option>
          <option value={option1}>{valueoption1}</option>
          <option value={option2}>{valueoption2}</option>
        </select>
        {error && (
          <label className="label">
            <span className="font-light text-sm text-red-500 break-words">
              {error}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};
