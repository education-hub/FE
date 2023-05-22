import { FC, useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { ComboBoxStudent } from "../../components/ComboBox";
import {
  InputLightBlue,
  InputWhite,
  TextAreaWhite,
} from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SelectLightBlue } from "../../components/Input";

const gender = z.enum(["Man", "Woman"]);

const schema = z.object({
  student_photo: z
    .any()
    .refine((files) => files?.length === 1, "Image is required."),
  student_name: z
    .string()
    .min(3, { message: "Must contain at least 3 character(s)" }),
  place_date: z
    .string()
    .min(3, { message: "Must contain at least 3 character(s)" }),
  gender: gender,
  religion: z.string().min(1, { message: "Choose 1 option" }),
  graduation_from: z
    .string()
    .min(3, { message: "Must contain at least 3 character(s)" }),
  nisn: z.string().min(10, { message: "NISN must 10 character(s)" }),
  student_province: z.string().min(1, { message: "Required" }),
  student_district: z.string().min(1, { message: "Required" }),
  student_village: z.string().min(1, { message: "Required" }),
  student_detail: z
    .string()
    .min(20, { message: "Must contain at least 20 character(s)" }),
  student_zip_code: z.string().min(5, { message: "Must 5 character(s)" }),
  student_city: z.string().min(1, { message: "Required" }),
  parent_province: z.string().min(1, { message: "Required" }),
  parent_district: z.string().min(1, { message: "Required" }),
  parent_village: z.string().min(1, { message: "Required" }),
  parent_zip_code: z.string().min(5, { message: "Must 5 character(s)" }),
  parent_city: z.string().min(1, { message: "Required" }),
  parent_name: z
    .string()
    .min(3, { message: "Must contain at least 3 character(s)" }),
  parent_job: z
    .string()
    .min(3, { message: "Must contain at least 3 character(s)" }),
  parent_religion: z.string().min(1, { message: "Choose 1 option" }),
  parent_gender: gender,
  parent_phone: z
    .string()
    .min(10, { message: "Must contain at least 10 character(s)" }),
  parent_detail: z
    .string()
    .min(20, { message: "Must contain at least 20 character(s)" }),
  parent_signature: z
    .any()
    .refine((files) => files?.length === 1, "Image is required."),
  student_signature: z
    .any()
    .refine((files) => files?.length === 1, "Image is required."),
});

export type SchemaStudent = z.infer<typeof schema>;

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
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);

  const param = useParams();
  const { id } = param;
  const navigate = useNavigate();
  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchProvince();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaStudent>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const fetchProvince = () => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        const provincesData = response.data;
        setProvinces(provincesData.provinsi);
      });
  };

  const fetchCity = (province_id: number) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${province_id}`
      )
      .then((response) => {
        const citiesData = response.data;
        setCities(citiesData.kota_kabupaten);
      });
  };

  const fetchDistrict = (city_id: number) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${city_id}`
      )
      .then((response) => {
        const districtData = response.data;
        setDistricts(districtData.kecamatan);
      });
  };

  const fetchSubDistrict = (district_id: number) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${district_id}`
      )
      .then((response) => {
        const subDistrictData = response.data;
        setSubDistricts(subDistrictData.kelurahan);
      });
  };

  const handleRegistrationForm: SubmitHandler<SchemaStudent> = (data) => {
    console.log(data);
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      if (
        key === "student_photo" ||
        key === "parent_signature" ||
        key === "student_signature"
      )
        formData.append(key, data[key][0]);
      formData.append(key, data[key]);
    }

    if (id) {
      formData.append("school_id", id);
    }

    axios
      .post(`https://go-event.online/school/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          title: "Registration Success",
          text: message,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#0BBBCC",
          confirmButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/student/register-school");
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <div className="p-20">
        <form
          onSubmit={handleSubmit(handleRegistrationForm)}
          className="space-y-4 w-full"
        >
          <div className="text-center text-2xl font-bold">
            <h1>New Student Registration Form</h1>
            <h2>STM Pelita Antaris</h2>
          </div>
          <div className="p-6 my-5 text-white font-bold text-xl grid-flow-col bg-@blue w-full px-10 h-full">
            <p>A. New Student</p>
          </div>
          <div className="px-[40rem] w-full flex flex-col items-center justify-center">
            <img
              className="h-auto w-full"
              src={
                watch("student_photo") &&
                typeof watch("student_photo")[0] === "object"
                  ? URL.createObjectURL(watch("student_photo")[0])
                  : "/photo.png"
              }
              alt="Profile"
            />
            <InputLightBlue
              type="file"
              label="Image Student Photo"
              id="input-student-photo"
              name="student_photo"
              register={register}
              error={errors.student_photo?.message?.toString()}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Fullname</label>
            <InputLightBlue
              type="text"
              name="student_name"
              id="input-student-name"
              register={register}
              error={errors.student_name?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold capitalize">
              place and date of birth
            </label>
            <InputLightBlue
              type="text"
              name="place_date"
              id="input_student_birth"
              register={register}
              error={errors.place_date?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Gender</label>
            <div className="relative">
              <SelectLightBlue
                label="Gender"
                name="gender"
                id="input-gender"
                option1="Man"
                valueoption1="Man"
                option2="Woman"
                valueoption2="Woman"
                register={register}
                error={errors.gender?.message}
              />
            </div>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Religion</label>
            <div className="relative">
              <select
                className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none w-full"
                {...register("religion", {
                  validate: (value) => value !== "" || "Choose 1 option",
                })}
              >
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
            {errors.religion && <p>{errors.religion.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Graduated From
            </label>
            <InputLightBlue
              type="text"
              name="graduation_from"
              id="input_student_graduation"
              register={register}
              error={errors.graduation_from?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">NISN</label>
            <InputLightBlue
              type="number"
              name="nisn"
              id="input_student_nisn"
              register={register}
              error={errors.nisn?.message}
            />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <label className="block text-gray-700 font-bold">Location</label>
            <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
              <div className="grid grid-cols-2 gap-10">
                {/* province */}
                <ComboBoxStudent
                  name="student_province"
                  datas={provinces}
                  register={register}
                  title={"Provinces"}
                  setValue={setValue}
                  onChange={(id) => fetchCity(id)}
                  error={errors.student_province?.message}
                />
                {/* city */}
                <ComboBoxStudent
                  name="student_city"
                  datas={cities}
                  register={register}
                  title={"City/Regency"}
                  onChange={(id) => fetchDistrict(id)}
                  setValue={setValue}
                  error={errors.student_city?.message}
                />
                {/* district */}
                <ComboBoxStudent
                  name="student_district"
                  datas={districts}
                  register={register}
                  title={"District"}
                  setValue={setValue}
                  onChange={(id) => fetchSubDistrict(id)}
                  error={errors.student_district?.message}
                />
                {/* sub-district */}
                <ComboBoxStudent
                  name="student_village"
                  datas={subDistricts}
                  register={register}
                  title={"Sub-District"}
                  setValue={setValue}
                  error={errors.student_village?.message}
                />
                <div className="flex flex-col gap-1 col-span-2 ">
                  <p className="block text-gray-700 font-bold">Detail</p>
                  <TextAreaWhite
                    name="student_detail"
                    register={register}
                    error={errors.student_detail?.message}
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="block text-gray-700 font-bold">Zip Code</p>
                  <InputWhite
                    type="number"
                    name="student_zip_code"
                    register={register}
                    error={errors.student_zip_code?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 mt-16 text-white font-bold text-xl grid-flow-col bg-@blue w-full px-10 h-full">
            <p>B. Parent</p>
          </div>

          <div className="space-y-4 mt-8 w-full">
            <div>
              <label className="block text-gray-700 font-bold">Fullname</label>
              <InputLightBlue
                type="text"
                name="parent_name"
                id="input_parent_name"
                register={register}
                error={errors.parent_name?.message}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">
                Profession
              </label>
              <InputLightBlue
                type="text"
                name="parent_job"
                id="input_parent_job"
                register={register}
                error={errors.parent_job?.message}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Gender</label>
              <div className="relative">
                <SelectLightBlue
                  label="Gender"
                  name="parent_gender"
                  id="input-parent_gender"
                  option1="Man"
                  valueoption1="Man"
                  option2="Woman"
                  valueoption2="Woman"
                  register={register}
                  error={errors.parent_gender?.message}
                />
              </div>
              {errors.parent_gender && <p>{errors.parent_gender.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Religion</label>
              <div className="relative">
                <select
                  className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none w-full"
                  {...register("parent_religion", {
                    validate: (value) => value !== "" || "Choose 1 option",
                  })}
                >
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
              {errors.parent_religion && (
                <p>{errors.parent_religion.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold">
                Phone Number
              </label>
              <InputLightBlue
                type="number"
                name="parent_phone"
                id="input_parent_phone"
                register={register}
                error={errors.parent_phone?.message}
              />
            </div>
            <div className="flex flex-col gap-1 my-5">
              <label className="block text-gray-700 font-bold">Location</label>
              <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
                <div className="grid grid-cols-2 gap-10">
                  {/* province */}
                  <ComboBoxStudent
                    title={"Provinces"}
                    datas={provinces}
                    setValue={setValue}
                    onChange={(id) => fetchCity(id)}
                    name="parent_province"
                    register={register}
                    error={errors.parent_province?.message}
                  />
                  {/* city */}
                  <ComboBoxStudent
                    title={"City"}
                    datas={cities}
                    setValue={setValue}
                    onChange={(id) => fetchDistrict(id)}
                    name="parent_city"
                    register={register}
                    error={errors.parent_city?.message}
                  />
                  {/* district */}
                  <ComboBoxStudent
                    title={"District"}
                    datas={districts}
                    setValue={setValue}
                    onChange={(id) => fetchSubDistrict(id)}
                    name="parent_district"
                    register={register}
                    error={errors.parent_district?.message}
                  />
                  {/* sub-district */}
                  <ComboBoxStudent
                    title={"Sub-District"}
                    datas={subDistricts}
                    setValue={setValue}
                    name="parent_village"
                    register={register}
                    error={errors.parent_village?.message}
                  />
                  <div className="flex flex-col gap-1 col-span-2 ">
                    <p className="block text-gray-700 font-bold">Detail</p>
                    <TextAreaWhite
                      name="parent_detail"
                      register={register}
                      error={errors.parent_detail?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="block text-gray-700 font-bold">Zip Code</p>
                    <InputWhite
                      type="number"
                      name="parent_zip_code"
                      register={register}
                      error={errors.parent_zip_code?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xl font-medium mt-16">
            <p>Signature,</p>
          </div>
          <div className="grid grid-cols-2 gap-96">
            <div className="w-full flex flex-col items-center justify-center">
              <img
                className="h-auto w-full"
                src={
                  watch("parent_signature") &&
                  typeof watch("parent_signature")[0] === "object"
                    ? URL.createObjectURL(watch("parent_signature")[0])
                    : "/photo.png"
                }
                alt="sign"
              />
              <InputLightBlue
                type="file"
                label="Image Parent Signature"
                id="input-parent-signature"
                name="parent_signature"
                register={register}
                error={errors.parent_signature?.message?.toString()}
              />
              <div className="text-center text-2xl font-medium">
                <p>Parent</p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <img
                className="h-auto w-full"
                src={
                  watch("student_signature") &&
                  typeof watch("student_signature")[0] === "object"
                    ? URL.createObjectURL(watch("student_signature")[0])
                    : "/photo.png"
                }
                alt="sign"
              />
              <InputLightBlue
                type="file"
                label="Image Student Signature"
                id="input-student-signature"
                name="student_signature"
                register={register}
                error={errors.student_signature?.message?.toString()}
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
        </form>
      </div>
    </Layout>
  );
};

export default RegistrationForm;
