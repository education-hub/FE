import { FC, Fragment, useState } from "react";
import { Transition, Combobox } from "@headlessui/react";
import { TbArrowsMoveVertical, TbCheck } from "react-icons/tb";
import { UseFormSetValue } from "react-hook-form";

import { Schema } from "../pages/admin/AddSchool";

interface ComboBoxType {
  defaultFill?: string | number;
  title: string;
  datas: any[];
  name: string | any;
  register?: any;
  error?: string;
  setValue: UseFormSetValue<Schema>;
  onChange?: (value: number) => void;
}

interface Location {
  nama: string;
}

export const ComboBox: FC<ComboBoxType> = (props) => {
  const {
    title,
    datas,
    register,
    name,
    error,
    onChange,
    setValue,
    defaultFill,
  } = props;
  const [selected, setSelected] = useState<any>([]);
  const [query, setQuery] = useState("");
  const filteredDatas =
    query === ""
      ? datas
      : datas.filter((data) =>
          data.nama
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="text-@dark">
      <p className="font-bold text-gray-700 block">{title}</p>
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          setValue(name, value.nama, { shouldValidate: true });
          if (onChange) onChange(value.id);
        }}
      >
        <div className="mt-1 relative">
          <div className="bg-white cursor-default flex h-16 text-left text-lg text-@dark w-full pl-3 z-10 relative items-center focus:outline-none ">
            <Combobox.Input
              {...(register ? register(name) : {})}
              className="border-none text-@dark w-full py-2 px-10 pl-3 leading-5 relative focus:outline-none focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(location: Location) =>
                location?.nama || defaultFill
              }
            />
            <Combobox.Button className="flex pr-2 inset-y-0 right-0 absolute items-center">
              <TbArrowsMoveVertical
                className="h-5 text-gray-400 w-5"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="bg-white rounded-md shadow-lg ring-black mt-1 text-base w-full max-h-60 py-1 ring-1 ring-opacity-5 z-20 absolute overflow-auto sm:text-sm focus:outline-none">
              {filteredDatas?.length === 0 && query !== "" ? (
                <div className="cursor-default py-2 px-4 text-gray-700 relative select-none">
                  Nothing found.
                </div>
              ) : (
                filteredDatas.map((data) => (
                  <Combobox.Option
                    key={data.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-@blue text-white" : "text-gray-900"
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {data.nama}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
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
        {error && (
          <label className="label">
            <span className="font-light text-sm text-red-500 break-words">
              {error}
            </span>
          </label>
        )}
      </Combobox>
    </div>
  );
};
