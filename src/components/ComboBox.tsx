import { FC, Fragment, useState } from "react";
import { Transition, Combobox } from "@headlessui/react";
import { TbArrowsMoveVertical, TbCheck } from "react-icons/tb";

interface ComboBoxType {
  defaultFill: string;
  title: string;
  data: any[];
  selected: {
    id?: number;
    id_provinsi?: string;
    id_kota?: string;
    id_kecamatan?: string;
    nama?: string;
  } | null;
  setSelected: React.Dispatch<
    React.SetStateAction<{
      id?: number;
      id_provinsi?: string;
      id_kota?: string;
      id_kecamatan?: string;
      nama?: string;
    } | null>
  >;
  name: string;
  register?: any;
  error: string;
}

interface Location {
  nama: string;
}

export const ComboBox: FC<Partial<ComboBoxType>> = (props) => {
  const {
    title,
    data,
    selected,
    setSelected,
    register,
    name,
    error,
    defaultFill,
  } = props;

  const [query, setQuery] = useState("");
  const filteredProvinces = data?.filter((data) =>
    data.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-@dark">
      <p className="block text-gray-700 font-bold">{title}</p>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative z-10 w-full flex items-center cursor-default bg-white h-16 pl-3 text-left focus:outline-none text-lg text-@dark ">
            <Combobox.Input
              className="w-full relative border-none py-2 pl-3 px-10 leading-5 text-@dark focus:outline-none focus:ring-0"
              displayValue={(location: Location) =>
                location?.nama || defaultFill
              }
              onChange={(event) => setQuery(event.target.value)}
              {...(register ? register(name) : {})}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <TbArrowsMoveVertical
                className="h-5 w-5 text-gray-400"
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
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredProvinces?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredProvinces?.map((province) => (
                  <Combobox.Option
                    key={province.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-@blue text-white" : "text-gray-900"
                      }`
                    }
                    // {...(register ? register(name) : {})}
                    value={province}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {province.nama}
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
