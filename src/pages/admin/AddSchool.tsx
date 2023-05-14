import { FC, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
  TextAreaWhite,
} from "../../components/Input";
import { Listbox, Transition, Disclosure, Combobox } from "@headlessui/react";
import {
  TbWorldWww,
  TbMapPin,
  TbArrowsMoveVertical,
  TbCheck,
  TbArrowUp,
} from "react-icons/tb";
import axios from "axios";
import { ComboBox } from "../../components/ComboBox";
import { Document, Page } from "react-pdf";

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

const AddSchool: FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState("");
  const [src, setSrc] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [provinces, setProvinces] = useState<ProvinceDataType[]>([]);
  const [cities, setCities] = useState<CitiesDataType[]>([]);
  const [districts, setDistricts] = useState<DistrictDataType[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictDataType[]>([]);
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

  const handleAddVideo = (event: any) => {
    event.preventDefault();
    setVideo(event.target.value);
  };

  const handleChangeVideo = (event: any) => {
    setVideo(event.target.value);
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

  return (
    <LayoutAdmin>
      <div className="grid grid-cols-2 px-20 py-20 gap-20 text-lg">
        <div>
          <div className="flex flex-col gap-1">
            <p>National School Identification Number (NPSN)</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>School Name</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Description</p>
            <TextAreaLightBlue />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>School Website</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Location</p>
            <div className="bg-@light-blue p-10 text-md sm:text-lg border-2 text-@dark font-medium focus:outline-none">
              <div className="grid grid-cols-2 gap-10">
                {/* provence */}
                <ComboBox
                  title={"Provinces"}
                  data={provinces}
                  selected={selectedProvince}
                  setSelected={setSelectedProvince}
                />
                {/* city */}
                <ComboBox
                  title={"City/Regency"}
                  data={cities}
                  selected={selectedCities}
                  setSelected={setSelectedCities}
                />
                {/* district */}
                <ComboBox
                  title={"District"}
                  data={districts}
                  selected={selectedDistrict}
                  setSelected={setSelectedDistrict}
                />
                {/* sub-district */}
                <ComboBox
                  title={"Sub-district"}
                  data={subDistricts}
                  selected={selectedSubDistrict}
                  setSelected={setSelectedSubDistrict}
                />
                <div className="flex flex-col gap-1 col-span-2 ">
                  <p className="text-gray-400">Detail</p>
                  <TextAreaWhite />
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="text-gray-400">Zip Code</p>
                  <InputWhite />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Students</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Teachers</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>How many Staff</p>
            <InputLightBlue type="text" />
          </div>
          <div className="flex flex-col gap-1 my-5">
            <p>Accreditation</p>
            <div className="w-32">
              <InputLightBlue type="text" />
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
              value={video}
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
          <ButtonCancelDelete label="Cancel" />
          <ButtonSubmit label="Post School" />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AddSchool;
