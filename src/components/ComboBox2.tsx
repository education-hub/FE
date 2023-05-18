import { TbArrowsMoveVertical, TbCheck } from "react-icons/tb";
import { FC, InputHTMLAttributes, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { clsx } from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  datas?: any[];
  error?: string;
  register?: any;
  noLabel?: boolean;
  name: string;
  multiple?: any;
  setValue?: any;
}

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const Autocomplete: FC<Props> = ({
  datas,
  placeholder,
  register,
  disabled,
  noLabel,
  error,
  name,
  id,
  multiple,
  setValue,
  ...props
}) => {
  const [selected, setSelected] = useState<any>([]);
  const [query, setQuery] = useState("");

  const filteredDatas = datas?.filter((data) =>
    data.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="form-control mb-3 w-full">
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          if (multiple) {
            setValue(
              name,
              value
                .map((data: any) => {
                  return data.name;
                })
                .join(", "),
              { shouldValidate: true }
            );
          } else {
            setValue(name, value.name, { shouldValidate: true });
          }
        }}
        multiple={multiple}
        name={name}
      >
        {!noLabel && (
          <Combobox.Label
            className="label-text text-base font-bold tracking-wider text-gray-700"
            htmlFor={id}
          >
            {placeholder}
          </Combobox.Label>
        )}
        <div className="relative w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-slate-50 text-left shadow-md focus:border-blue-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <Combobox.Input
              {...props}
              {...(register ? register(name) : {})}
              className={clsx(
                "input input-bordered w-full border-red-500 bg-gray-50 p-2 text-base text-gray-700 shadow-md focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 disabled:border-slate-200 disabled:bg-slate-200",
                !error && "border-gray-50"
              )}
              id={id}
              onChange={(event) => setQuery(event.target.value)}
              disabled={disabled}
              placeholder={placeholder}
              displayValue={(datas: any) =>
                multiple
                  ? datas
                      .map((data: any) => {
                        return data.name;
                      })
                      .join(", ")
                  : datas?.name
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <TbArrowsMoveVertical
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {error && (
            <label className="label">
              <span className="break-words text-base font-light text-red-500">
                {error}
              </span>
            </label>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute text-@dark z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredDatas?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredDatas?.map((data) => (
                  <Combobox.Option
                    key={data.id}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-default select-none py-2 pl-10 pr-4",
                        active ? "bg-blue-900 text-white" : "text-gray-900"
                      )
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate text-base",
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          {data.name}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              "absolute inset-y-0 left-0 flex items-center pl-3",
                              active ? "text-white" : "text-blue-900"
                            )}
                          >
                            <TbCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Autocomplete;
