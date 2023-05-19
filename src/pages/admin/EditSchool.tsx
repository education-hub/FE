import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
  TextAreaWhite,
} from "../../components/Input";
import axios from "axios";
import { ComboBox } from "../../components/ComboBox";
import { Document, Page } from "react-pdf";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

interface SchoolDataType {
  accreditation: string;
  achievement: string | null; // belum ketahuan data aslinya jika ditambahkan
  city: string;
  description: string;
  detail: string;
  district: string;
  extracurriculars: string | null; // belum ketahuan data aslinya jika ditambahkan
  gmeet: string;
  id: number;
  image: any;
  name: string;
  npsn: string;
  payment: {
    interval: string | null; // belum ketahuan data aslinya jika ditambahkan
    onetime: string | null; // belum ketahuan data aslinya jika ditambahkan
  };
  pdf: any;
  province: string;
  quizLinkPreview: string;
  quizLinkPub: string;
  reviews: string | null; // belum ketahuan data aslinya jika ditambahkan
  staff: string;
  students: string;
  teachers: string;
  video: string;
  village: string;
  web: string;
  zipcode: string;
}

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
  image: z.any().refine((files) => files?.length === 1, "Image is required."),
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

const EditSchool: FC = () => {
  const [schoolData, setSchoolData] = useState<Partial<SchoolDataType>>({});
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState("");
  const [src, setSrc] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber] = useState(1);
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  // const params = useParams();
  // const { id } = params;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchoolData();
    fetchProvince();
  }, []);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const fetchSchoolData = () => {
    axios
      .get(`https://go-event.online/admin/school`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        setSchoolData(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Success",
          text: message,
          showCancelButton: false,
        });
      });
  };

  return (
    <LayoutAdmin>
      <div className="grid grid-cols-2 px-20 py-20 gap-20 text-lg">
        <div>
          <div className="flex flex-col gap-1">
            <p>National School Identification Number (NPSN)</p>
            <InputLightBlue type="text" defaultValue={schoolData.npsn} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>School Name</p>
            <InputLightBlue type="text" defaultValue={schoolData.name} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Description</p>
            <TextAreaLightBlue defaultValue={schoolData.description} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>School Website</p>
            <InputLightBlue type="text" defaultValue={schoolData.web} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Location</p>
            <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
              <div className="grid grid-cols-2 gap-10">
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
                  <p className="text-gray-400">Detail</p>
                  <TextAreaWhite defaultValue={schoolData.detail} />
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="text-gray-400">Zip Code</p>
                  <InputWhite defaultValue={schoolData.zipcode} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Students</p>
            <InputLightBlue type="text" defaultValue={schoolData.students} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Teachers</p>
            <InputLightBlue type="text" defaultValue={schoolData.teachers} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Staff</p>
            <InputLightBlue type="text" defaultValue={schoolData.staff} />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Accreditation</p>
            <div className="w-32">
              <InputLightBlue
                type="text"
                defaultValue={schoolData.accreditation}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            {image && (
              <div
                className="relative z-10 h-96 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(image)})`,
                }}
              >
                <div className="relative z-20 bg-red-300 bg-gradient-to-b from-gray-400 to-black h-full opacity-60"></div>
              </div>
            )}
            {!image && (
              <div
                className="relative z-10 h-96 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(/sman3.jpg)`,
                }}
              >
                <div className="relative z-20 bg-red-300 bg-gradient-to-b from-gray-400 to-black h-full opacity-60"></div>
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
              onChange={handleInputChange}
            />
            <div className="flex justify-end my-5">
              <ButtonSubmit
                label="Add URL"
                onClick={(event) => handleSubmit(event)}
              />
            </div>
          </div>
          <div className="mt-10 bg-@light-blue p-5 flex flex-col gap-10">
            {pdfFile && (
              <div>
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
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
              onChange={handlePdfInputChange}
            />
          </div>
        </div>
        <div className="flex col-span-2 justify-end gap-10">
          <ButtonCancelDelete
            label="Cancel"
            onClick={() => navigate("/admin")}
          />
          <ButtonSubmit label="Update School" />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default EditSchool;
