import { FC, Fragment, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import axios from "axios";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
  TextAreaWhite,
} from "../../components/Input";
import { ComboBox } from "../../components/ComboBox";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";

const schema = z.object({
  npsn: z.string().min(8, { message: "npsn mush 8 number" }),
  name: z.string().min(3, { message: "School name is required" }),
  description: z
    .string()
    .min(20, { message: "description must have minimum 20 characters" }),
  province: z.string().min(1, { message: "Province is required" }),
  city: z.string().min(1, { message: "City is required" }),
  district: z.string().min(1, { message: "district is required" }),
  village: z.string().min(1, { message: "sub district is required" }),
  detail: z
    .string()
    .min(20, { message: "detail must have minimum 20 characters" }),
  zipcode: z.string().min(6, { message: "zip code must 6 numbers" }),
  students: z.string().min(1, { message: "how many students is required" }),
  teachers: z.string().min(1, { message: "how many teachers is required" }),
  staff: z.string().min(1, { message: "how many staff is required" }),
  accreditation: z.string().min(1, { message: "Accreditaon is required" }),
  web: z
    .string()
    .min(1, { message: "school website is required" })
    .url({ message: "Must be a valid video URL" }),
  image: z.any(),
  video: z
    .string()
    .min(1, { message: "Youtube url is required" })
    .url({ message: "Must be a valid video youtube embedded URL" }),
  pdf: z.any().refine((files) => files?.length === 1, "pdf is required."),
});

type Schema = z.infer<typeof schema>;

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

interface LocationDataType {
  id: number;
  id_provinsi: string;
  id_kota: string;
  id_kecamatan: string;
  nama: string;
}

const AddSchool: FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const Submit: SubmitHandler<Schema> = (data) => {
    console.log(data);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState("");
  const [src, setSrc] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber] = useState(1);
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);

  const [selectedProvince, setSelectedProvince] =
    useState<Partial<LocationDataType | null>>(null);
  const [selectedCities, setSelectedCities] =
    useState<Partial<LocationDataType | null>>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<Partial<LocationDataType | null>>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<Partial<LocationDataType | null>>(null);

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  useEffect(() => {
    dataProvince();
  }, []);

  useEffect(() => {
    dataCity();
  }, [selectedProvince]);

  useEffect(() => {
    dataDistrict();
  }, [selectedCities]);

  useEffect(() => {
    dataSubDistrict();
  }, [selectedDistrict]);

  const dataProvince = () => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        const provincesData = response.data;
        setProvinces(provincesData.provinsi);
      });
  };

  const dataCity = () => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvince?.id}`
      )
      .then((response) => {
        const citiesData = response.data;
        setCities(citiesData.kota_kabupaten);
      });
  };

  const dataDistrict = () => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${selectedCities?.id}`
      )
      .then((response) => {
        const districtData = response.data;
        setDistricts(districtData.kecamatan);
        console.log(districtData.kecamatan);
      });
  };

  const dataSubDistrict = () => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${selectedDistrict?.id}`
      )
      .then((response) => {
        const subDistrictData = response.data;
        setSubDistricts(subDistrictData.kelurahan);
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.value);
  };

  const handleSubmitVideo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSrc(video);
    console.log(src);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePdfInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const hadlePostSchool: SubmitHandler<Schema> = (data) => {
    console.log(data);
    axios
      .post(`https://go-event.online/school`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Submit FAQ Success!!",
          text: message,
          showCancelButton: false,
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
    <LayoutAdmin>
      <form onSubmit={handleSubmit(hadlePostSchool)}>
        <div className="grid grid-cols-2 px-20 py-20 gap-20 text-lg">
          <div className=" flex flex-col gap-3">
            <InputLightBlue
              label="National School Identification Number (NPSN)"
              type="number"
              name="npsn"
              id="input-npsn"
              register={register}
              error={errors.npsn?.message}
            />
            <InputLightBlue
              label="School Name"
              type="text"
              name="name"
              id="input-school_name"
              register={register}
              error={errors.name?.message}
            />
            <TextAreaLightBlue
              label="Description"
              name="description"
              id="unput-description"
              register={register}
              error={errors.description?.message}
            />
            <InputLightBlue
              label="School Website"
              type="text"
              name="web"
              id="input-school_web"
              register={register}
              error={errors.web?.message}
            />
            <div className="flex flex-col gap-1 my-5">
              <p className="block text-gray-700 font-bold">Location</p>
              <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
                <div className="grid grid-cols-2 gap-10">
                  {/* provence */}
                  <ComboBox
                    title={"Provinces"}
                    data={provinces}
                    selected={selectedProvince}
                    setSelected={setSelectedProvince}
                    name="province"
                    register={register}
                    error={errors.province?.message}
                  />
                  {/* city */}
                  <ComboBox
                    title={"City/Regency"}
                    data={cities}
                    selected={selectedCities}
                    setSelected={setSelectedCities}
                    name="city"
                    register={register}
                    error={errors.city?.message}
                  />
                  {/* district */}
                  <ComboBox
                    title={"District"}
                    data={districts}
                    selected={selectedDistrict}
                    setSelected={setSelectedDistrict}
                    name="district"
                    register={register}
                    error={errors.district?.message}
                  />
                  {/* sub-district */}
                  <ComboBox
                    title={"Sub-district"}
                    data={subDistricts}
                    selected={selectedSubDistrict}
                    setSelected={setSelectedSubDistrict}
                    name="village"
                    register={register}
                    error={errors.village?.message}
                  />
                  <div className="flex flex-col gap-1 col-span-2 ">
                    <TextAreaWhite
                      label="Detail"
                      name="detail"
                      id="input-detail"
                      register={register}
                      error={errors.detail?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <InputWhite
                      label="Zip Code"
                      type="number"
                      name="zipcode"
                      id="input-zipcode"
                      register={register}
                      error={errors.zipcode?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
            <InputLightBlue
              label="How Many Students"
              type="number"
              name="students"
              id="input-students"
              register={register}
              error={errors.students?.message}
            />
            <InputLightBlue
              label="How Many Teachers"
              type="number"
              name="teachers"
              id="input-teachers"
              register={register}
              error={errors.teachers?.message}
            />
            <InputLightBlue
              label="How Many Teachers"
              type="number"
              name="teachers"
              id="input-teachers"
              register={register}
              error={errors.teachers?.message}
            />
            <InputLightBlue
              label="How Many Staff"
              type="number"
              name="staff"
              id="input-staff"
              register={register}
              error={errors.staff?.message}
            />
            <InputLightBlue
              label="Accreditation"
              type="text"
              name="accreditation"
              id="input-accreditation"
              register={register}
              error={errors.accreditation?.message}
            />
          </div>
          <div>
            <div>
              {image ? (
                <img src={image} alt="Preview" className="w-full h-auto" />
              ) : (
                <></>
              )}
              {/* <input
                type="file"
                className="bg-@light-blue w-full p-5"
                id="input-image"
                {...register("image")}
                onChange={handleImageChange}
              />
              {errors.image && (
                <label className="label">
                  <span className="font-light text-sm text-red-500 break-words">
                    {errors.image.message?.toString()}
                  </span>
                </label>
              )} */}
              <input
                type="file"
                id="input-image"
                // name="image"
                {...register("image")}
              />
              {errors.image && <span>{errors.image.message?.toString()}</span>}
            </div>
            <div className="mt-10">
              <div>
                <iframe
                  className="w-full h-96"
                  src={src ? src : "https://www.youtube.com/embed/LlCwHnp3kL4"}
                  title="Introduction Video"
                  allowFullScreen
                />
              </div>
              <p className="mt-5">Insert Video Youtube URL</p>
              <InputLightBlue
                type="text"
                // value={video}
                label="Video"
                id="input-video"
                name="video"
                register={register}
                error={errors.video?.message}
                onChange={handleInputChange}
              />
              <div className="flex justify-end my-5">
                <ButtonSubmit
                  label="Preview Video"
                  onClick={(event) => handleSubmitVideo(event)}
                />
              </div>
            </div>
            <div className="mt-10 bg-@light-blue p-2 flex flex-col gap-10">
              {pdfFile && (
                <div>
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="application/pdf"
                className="bg-@light-blue w-full p-5"
                id="input-pdf"
                {...register("pdf")}
                onChange={handlePdfInputChange}
              />
            </div>
            {errors.pdf && (
              <label className="label">
                <span className="font-light text-sm text-red-500 break-words">
                  {errors.pdf.message?.toString()}
                </span>
              </label>
            )}
            <div className=" flex justify-end mt-3">
              <ButtonSubmit label="view pdf" onClick={() => setIsOpen(true)} />
            </div>
          </div>
          <div className="flex col-span-2 justify-end gap-10">
            <ButtonCancelDelete label="Cancel" />
            <ButtonSubmit label="Post School" type="submit" />
          </div>
        </div>
      </form>
      <>
        {/* modal extraculliculer */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => !isOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                    >
                      View Brochure
                    </Dialog.Title>
                    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                      <Viewer fileUrl={"/sampel.pdf"} />
                    </Worker>
                    <ButtonCancelDelete
                      label="close"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </LayoutAdmin>
  );
};

export default AddSchool;
