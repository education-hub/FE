import { FC, useState } from "react";
import { Layout } from "../../components/Layout";
import { ComboBox } from "../../components/ComboBox";
import {
  InputLightBlue,
  InputWhite,
  TextAreaWhite,
} from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

interface ProvinceDataType {
  id: number;
  nama: string;
}

interface CitiesDataType {
  id: number;
  id_provinsi: string;
  name: string;
}

interface DistrictDataType {
  id: number;
  id_provinsi: string;
  id_kota: string;
  name: string;
}

interface SubDistrictDataType {
  id: number;
  id_provinsi: string;
  id_kota: string;
  name: string;
}

const RegistrationForm: FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const [provinces] = useState<ProvinceDataType[]>([]);
  const [cities] = useState<CitiesDataType[]>([]);
  const [districts] = useState<DistrictDataType[]>([]);
  const [subDistricts] = useState<SubDistrictDataType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<{
    id: number;
    id_provinsi: string;
    id_kota: string;
    id_kecamatan: string;
    nama: string;
  } | null>(null);
  const [selectedCities, setSelectedCities] = useState<{
    id: number;
    id_provinsi: string;
    id_kota: string;
    id_kecamatan: string;
    nama: string;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    id: number;
    id_provinsi: string;
    id_kota: string;
    id_kecamatan: string;
    nama: string;
  } | null>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<{
    id: number;
    id_provinsi: string;
    id_kota: string;
    id_kecamatan: string;
    nama: string;
  } | null>(null);

  return (
    <Layout>
      <div className="p-20">
        <div className="text-center text-2xl font-bold">
          <h1>New Student Registration Form</h1>
          <h2>STM Pelita Antaris</h2>
        </div>
        <div className="p-6 my-5 text-white font-bold text-xl grid-flow-col bg-@blue w-full px-10 h-full">
          <p>A. New Student</p>
        </div>
        <div className="px-[40rem] w-full flex flex-col items-center justify-center">
          {image ? (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="h-auto w-96"
              />
            </div>
          ) : (
            <div>
              <img
                src="/person-placeholder.png"
                alt="Default"
                className="h-auto w-52 py-1 border"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
            className="bg-@light-blue w-full p-5"
          />
        </div>
        <form className="space-y-4 w-full">
          <div>
            <label className="block text-gray-700 font-bold">Fullname</label>
            <InputLightBlue type="email" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Date of Birth
            </label>
            <InputLightBlue type="text" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Gender</label>
            <div className="relative">
              <select className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                <option value="" selected disabled hidden>
                  Choose Gender
                </option>
                <option value="administrator">Man</option>
                <option value="student">Woman</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Religion</label>
            <div className="relative">
              <select className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                <option value="" selected disabled hidden>
                  Select Religion
                </option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="buddha">Buddha</option>
                <option value="konghuchu">Konghuchu</option>
                <option value="katolik">Katolik</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Graduated From
            </label>
            <InputLightBlue type="text" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">NISN</label>
            <InputLightBlue type="number" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <label className="block text-gray-700 font-bold">Location</label>
            <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
              <div className="grid grid-cols-2 gap-10">
                {/* provence */}
                <ComboBox
                  title={"Provinces"}
                  data={provinces}
                  selected={selectedProvince}
                  setSelected={setSelectedProvince}
                  defaultFill={"D.I. Yogyakarta"}
                />
                {/* city */}
                <ComboBox
                  title={"City/Regency"}
                  data={cities}
                  selected={selectedCities}
                  setSelected={setSelectedCities}
                  defaultFill={"Yogyakarta"}
                />
                {/* district */}
                <ComboBox
                  title={"District"}
                  data={districts}
                  selected={selectedDistrict}
                  setSelected={setSelectedDistrict}
                  defaultFill={"Gondokusuman"}
                />
                {/* sub-district */}
                <ComboBox
                  title={"Sub-district"}
                  data={subDistricts}
                  selected={selectedSubDistrict}
                  setSelected={setSelectedSubDistrict}
                  defaultFill={"Kotabaru"}
                />
                <div className="flex flex-col gap-1 col-span-2 ">
                  <p className="text-gray-400">Detail</p>
                  <TextAreaWhite
                    defaultValue={"Jalan Laksda Laut Yos Sudarso No : 7"}
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="text-gray-400">Zip Code</p>
                  <InputWhite defaultValue={41376} />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="p-6 mt-16 text-white font-bold text-xl grid-flow-col bg-@blue w-full px-10 h-full">
          <p>B. Parent</p>
        </div>
        <form className="space-y-4 mt-8 w-full">
          <div>
            <label className="block text-gray-700 font-bold">Fullname</label>
            <InputLightBlue type="email" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Profession</label>
            <InputLightBlue type="text" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Religion</label>
            <div className="relative">
              <select className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                <option value="" selected disabled hidden>
                  Select Religion
                </option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="buddha">Buddha</option>
                <option value="konghuchu">Konghuchu</option>
                <option value="katolik">Katolik</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Phone Number
            </label>
            <InputLightBlue type="number" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <label className="block text-gray-700 font-bold">Location</label>
            <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
              <div className="grid grid-cols-2 gap-10">
                {/* provence */}
                <ComboBox
                  title={"Provinces"}
                  data={provinces}
                  selected={selectedProvince}
                  setSelected={setSelectedProvince}
                  defaultFill={"D.I. Yogyakarta"}
                />
                {/* city */}
                <ComboBox
                  title={"City/Regency"}
                  data={cities}
                  selected={selectedCities}
                  setSelected={setSelectedCities}
                  defaultFill={"Yogyakarta"}
                />
                {/* district */}
                <ComboBox
                  title={"District"}
                  data={districts}
                  selected={selectedDistrict}
                  setSelected={setSelectedDistrict}
                  defaultFill={"Gondokusuman"}
                />
                {/* sub-district */}
                <ComboBox
                  title={"Sub-district"}
                  data={subDistricts}
                  selected={selectedSubDistrict}
                  setSelected={setSelectedSubDistrict}
                  defaultFill={"Kotabaru"}
                />
                <div className="flex flex-col gap-1 col-span-2 ">
                  <p className="text-gray-400">Detail</p>
                  <TextAreaWhite
                    defaultValue={"Jalan Laksda Laut Yos Sudarso No : 7"}
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="text-gray-400">Zip Code</p>
                  <InputWhite defaultValue={41376} />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="text-center text-xl font-medium mt-16">
          <p>Signature,</p>
        </div>
        <div className="grid grid-cols-2 gap-96">
          <div className="w-full flex flex-col items-center justify-center">
            {image ? (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="h-auto w-96"
                />
              </div>
            ) : (
              <div>
                <img
                  src="/signature-png-transparent.png"
                  alt="Default"
                  className="h-auto w-52 py-1 border"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
              }}
              className="bg-@light-blue w-full p-5"
            />
            <div className="text-center text-2xl font-medium">
              <p>Parent</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            {image ? (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="h-auto w-96"
                />
              </div>
            ) : (
              <div>
                <img
                  src="/signature-png-transparent.png"
                  alt="Default"
                  className="h-auto w-52 py-1 border"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
              }}
              className="bg-@light-blue w-full p-5"
            />
            <div className="text-center text-2xl font-medium pb-11">
              <p>Student</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[90rem]">
          <ButtonCancelDelete label="Cancel" />
          <ButtonSubmit label="Submit" />
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationForm;
