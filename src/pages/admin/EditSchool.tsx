import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBox } from "../../components/ComboBox";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ProgressBar } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
  TextAreaWhite,
} from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";
import {
  ProvinceDataType,
  CitiesDataType,
  DistrictDataType,
  SubDistrictDataType,
  SchoolDataType,
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
    .url({ message: "Must be a valid video youtube embedded URL" }),
  image: z.any(),
  video: z.string().min(1, { message: "Youtube url is required" }),
  pdf: z.any(),
});

export type Schema = z.infer<typeof schema>;

const EditSchool: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<Partial<SchoolDataType>>({});
  const [src, setSrc] = useState("");
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);
  const [pdfFile, setPdfFile] = useState<string | null>("");
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  document.title = "Edit School | Admin Management";

  useEffect(() => {
    fetchSchoolData();
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

  const fetchSchoolData = () => {
    axios
      .get(`https://go-event.online/admin/school`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((res) => {
        const {
          accreditation,
          npsn,
          name,
          description,
          web,
          province,
          city,
          district,
          village,
          zipCode,
          students,
          teachers,
          staff,
          video,
          detail,
        } = res.data.data;
        const { data } = res.data;
        setSchoolData(data);
        setValue("npsn", npsn);
        setValue("accreditation", accreditation);
        setValue("name", name);
        setValue("description", description);
        setValue("web", web);
        setValue("province", province);
        setValue("city", city);
        setValue("district", district);
        setValue("village", village);
        setValue("zipcode", zipCode);
        setValue("students", students);
        setValue("teachers", teachers);
        setValue("staff", staff);
        setValue("video", video);
        setValue("detail", detail);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  };

  const handleUpdateSchool: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    console.log(data);
    const requestData = { ...data, school_id: id };
    console.log(requestData);
    axios
      .put(`https://go-event.online/admin/school`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data && response.data;
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
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
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LayoutAdmin>
      <form onSubmit={handleSubmit(handleUpdateSchool)}>
        <div className="grid grid-cols-2 px-20 py-20 gap-20 text-lg">
          <div>
            <div className="flex flex-col gap-1">
              <InputLightBlue
                label="National School Identification Number (NPSN)"
                type="number"
                name="npsn"
                id="input-npsn"
                register={register}
                error={errors.npsn?.message}
              />
            </div>
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
              <p>Location</p>
              <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
                <div className="grid grid-cols-2 gap-10">
                  {/* provence */}
                  <ComboBox
                    defaultFill={`${schoolData.province}`}
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
                    defaultFill={`${schoolData.city}`}
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
                    defaultFill={`${schoolData.district}`}
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
                    defaultFill={`${schoolData.village}`}
                    title={"Sub-district"}
                    datas={subDistricts}
                    name="village"
                    register={register}
                    setValue={setValue}
                    error={errors.village?.message}
                  />
                  <div className="flex flex-col gap-1 col-span-2 ">
                    <TextAreaWhite
                      defaultValue={schoolData.detail}
                      label="Detail"
                      name="detail"
                      id="input-detail"
                      register={register}
                      error={errors.detail?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <InputWhite
                      defaultValue={schoolData.zipCode}
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
            <div className="flex flex-col gap-3">
              <img
                className="h-auto w-full"
                src={
                  watch("image") && typeof watch("image")[0] === "object"
                    ? URL.createObjectURL(watch("image")[0])
                    : `https://storage.googleapis.com/prj1ropel/${schoolData.image}`
                }
                alt="School-image"
              />
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
                  className="w-full h-96"
                  src={src ? src : schoolData.video}
                  title="Introduction Video"
                  allowFullScreen
                />
              </div>
              <p className="mt-5">Change Youtube URL</p>
              <InputLightBlue
                defaultValue={schoolData.video}
                type="text"
                label="Video"
                id="input-video"
                name="video"
                register={register}
                error={errors.video?.message}
              />
              <div className="flex justify-end my-5">
                <ButtonSubmit
                  label="Preview Video"
                  onClick={(event) => handleSubmitVideo(event)}
                />
              </div>
            </div>
            <div className="mt-10 p-5 flex flex-col gap-10">
              <div className="h-[600px]">
                <h3>PDF Preview:</h3>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={
                      pdfFile
                        ? pdfFile
                        : `data:application/pdf;base64,${schoolData.pdf}`
                    }
                    plugins={[defaultLayoutPluginInstance]}
                    renderLoader={(percentages: number) => (
                      <div>
                        <ProgressBar progress={Math.round(percentages)} />
                      </div>
                    )}
                  />
                </Worker>
              </div>
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
                label="Preview pdf"
                onClick={() => {
                  generatePreview();
                }}
              />
            </div>
          </div>
          <div className="flex col-span-2 justify-end gap-10">
            <ButtonCancelDelete
              label="Cancel"
              onClick={() => navigate("/admin")}
            />
            <ButtonSubmit label="Update School" type="submit" />
            {loading ? <div>Loading...</div> : <></>}
          </div>
        </div>
      </form>
    </LayoutAdmin>
  );
};

export default EditSchool;
