import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FC, Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgressBar } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
  TextAreaWhite,
} from "../../components/Input";
import { Dialog, Transition } from "@headlessui/react";
import { LayoutAdmin } from "../../components/Layout";
import { ComboBox } from "../../components/ComboBox";
import {
  ProvinceDataType,
  CitiesDataType,
  DistrictDataType,
  SubDistrictDataType,
} from "../../utils/user";

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
  zipcode: z.string().min(5, { message: "zip code must 5 numbers" }),
  students: z.string().min(1, { message: "how many students is required" }),
  teachers: z.string().min(1, { message: "how many teachers is required" }),
  staff: z.string().min(1, { message: "how many staff is required" }),
  accreditation: z.string().min(1, { message: "Accreditaon is required" }),
  web: z
    .string()
    .min(1, { message: "school website is required" })
    .url({ message: "Must be a valid video URL" }),
  image: z.any().refine((files) => {
    if (files?.length === 1) {
      const acceptedFormats = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = files[0].name.split(".").pop().toLowerCase();
      return acceptedFormats.includes(fileExtension);
    }
    return false;
  }, "Image is required and should be in a specific format. jpg, jpeg, png, and gif"),
  video: z
    .string()
    .min(1, { message: "Youtube url is required" })
    .url({ message: "Must be a valid video youtube embedded URL" }),
  pdf: z
    .any()
    .refine((files) => files?.length === 1, "pdf is required.")
    .refine(
      (files) => files[0]?.type === "application/pdf",
      "Only PDF files are allowed."
    ),
});

export type Schema = z.infer<typeof schema>;

const AddSchool: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [src, setSrc] = useState("");
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  document.title = "Add School | Admin Management";

  useEffect(() => {
    fetchProvince();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const video = watch("video");
  const viewPdf = watch("pdf");
  const [pdfFile, setPdfFile] = useState<string | null>("");

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

  const generatePreview = () => {
    if (viewPdf) {
      if (typeof viewPdf[0] === "string") {
        setPdfFile(viewPdf[0]);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPdfFile(reader.result as string);
        };
        reader.readAsDataURL(viewPdf[0]);
      }
    }
  };

  const handleSubmitVideo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSrc(video);
  };

  const hadlePostSchool: SubmitHandler<Schema> = (data) => {
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      if (key === "image" || key === "pdf") formData.append(key, data[key][0]);
      formData.append(key, data[key]);
    }

    axios
      .post(`https://go-event.online/school`, formData, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Post School Success!!",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin");
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
    <LayoutAdmin>
      <form onSubmit={handleSubmit(hadlePostSchool)}>
        <div className="text-lg grid py-20 px-20 gap-20 grid-cols-2">
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
            <div className="flex flex-col my-5 gap-1">
              <p className="font-bold text-gray-700 block">Location</p>
              <div className="bg-@light-blue font-medium border-2 text-md text-@dark p-10 sm:text-lg focus:outline-none">
                <div className="grid gap-10 grid-cols-2">
                  {/* provence */}
                  <ComboBox
                    title={"Provinces"}
                    datas={provinces}
                    name="province"
                    register={register}
                    setValue={setValue}
                    onChange={(id) => fetchCity(id)}
                    error={errors.province?.message}
                  />
                  {/* city */}
                  <ComboBox
                    title={"City/Regency"}
                    datas={cities}
                    name="city"
                    register={register}
                    setValue={setValue}
                    onChange={(id) => fetchDistrict(id)}
                    error={errors.city?.message}
                  />
                  {/* district */}
                  <ComboBox
                    title={"District"}
                    datas={districts}
                    name="district"
                    register={register}
                    setValue={setValue}
                    onChange={(id) => fetchSubDistrict(id)}
                    error={errors.district?.message}
                  />
                  {/* sub-district */}
                  <ComboBox
                    title={"Sub-district"}
                    datas={subDistricts}
                    name="village"
                    register={register}
                    setValue={setValue}
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
              <div>
                <img
                  className="h-auto w-full"
                  src={
                    watch("image") && typeof watch("image")[0] === "object"
                      ? URL.createObjectURL(watch("image")[0])
                      : "/photo.png"
                  }
                  alt="School-image"
                />
              </div>
              <InputLightBlue
                type="file"
                label="Image"
                id="input-image"
                name="image"
                register={register}
                error={errors.image?.message?.toString()}
              />
            </div>
            <div className="mt-10">
              <div>
                <iframe
                  className="h-96 w-full"
                  src={src ? src : "https://www.youtube.com/embed/LlCwHnp3kL4"}
                  title="Introduction Video"
                  allowFullScreen
                />
              </div>
              <p className="mt-5">Insert Video Youtube URL</p>
              <InputLightBlue
                type="text"
                label="Video"
                id="input-video"
                name="video"
                register={register}
                error={errors.video?.message}
              />
              <div className="flex my-5 justify-end">
                <ButtonSubmit
                  type="button"
                  label="Preview Video"
                  onClick={(event) => handleSubmitVideo(event)}
                />
              </div>
            </div>
            <div className="flex flex-col mt-10 p-2 gap-10">
              {pdfFile && (
                <div className="h-[600px]">
                  <h3>PDF Preview:</h3>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={pdfFile}
                      plugins={[defaultLayoutPluginInstance]}
                      renderLoader={(percentages: number) => (
                        <div>
                          <ProgressBar progress={Math.round(percentages)} />
                        </div>
                      )}
                    />
                  </Worker>
                </div>
              )}
              <InputLightBlue
                type="file"
                label="Pdf"
                accept="application/pdf"
                id="input-pdf"
                name="pdf"
                register={register}
                error={errors.pdf?.message?.toString()}
              />
            </div>
            <div className="flex mt-3 justify-end">
              <ButtonSubmit
                type="button"
                label="view pdf"
                onClick={() => {
                  generatePreview();
                }}
              />
            </div>
          </div>
          <div className="flex gap-10 col-span-2 justify-end">
            <ButtonCancelDelete label="Cancel" />
            <ButtonSubmit label="Post School" type="submit" />
          </div>
        </div>
      </form>
      <>
        {/* modal view pdf */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="z-10 relative" onClose={() => !isOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-black bg-opacity-25 inset-0 fixed" />
            </Transition.Child>
            <div className="inset-0 fixed overflow-y-auto">
              <div className="flex min-h-full text-center p-4 items-center justify-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-white shadow-xl text-left w-full max-w-2xl p-16 transform transition-all overflow-hidden align-middle">
                    <Dialog.Title
                      as="h3"
                      className="font-semibold text-xl  text-@dark text-center py-5 leading-6"
                    >
                      View Brochure
                    </Dialog.Title>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      {pdfFile ? (
                        <div
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.3)",
                            height: "750px",
                          }}
                        >
                          <Viewer
                            fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
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
