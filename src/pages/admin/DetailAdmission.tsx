import { FC, useState } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { ComboBox } from "../../components/ComboBox";
import { InputWhite, TextAreaWhite } from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { useNavigate } from "react-router-dom";

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

const DetailAdmission: FC = () => {
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

  const navigate = useNavigate();
  return (
    <LayoutAdmin>
      <div className="p-20">
        <div className="text-center text-xl font-bold">
          <h1>Summary</h1>
          <h1>New Student Admission Form</h1>
          <h1>SMAN 3 Yogyakarta</h1>
        </div>
        <div className="bg-@blue w-full text-white font-semibold text-lg mt-20 flex h-16 items-center px-3 ">
          <p>A. Student Datas</p>
        </div>
        <div className="bg-@light-blue flex flex-col gap-3  p-10 text-lg">
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>1.</p>
              <p>Fullname</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Sochibul Wafa’</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>2.</p>
              <p>Date Of Birth</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Indramayu, 29 Februari 1995</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>3.</p>
              <p>Gender</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Man</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>4.</p>
              <p>Religion</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Islam</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>5.</p>
              <p>Graduation From</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>SMPN Kroya 1</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>6.</p>
              <p>NISN</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>35218166918283</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>7.</p>
              <p>Address</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <div>
                <div className=" flex flex-col gap-5">
                  {/* provence */}
                  <div className="">
                    <p className="text-gray-400">Province</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>East Java</p>
                    </div>
                  </div>
                  {/* district */}
                  <div className="">
                    <p className="text-gray-400">District</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Gondokusuman</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400">Detail</p>
                    <div className="bg-white px-3 flex py-3 h-32 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Jalan Laksda Laut Yos Sudarso No : 7 Kotabaru</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="text-gray-400">Zip Code</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>55224</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p></p>
              <div className="w-full">
                <div className="gap-10 flex flex-col gap-5">
                  {/* city */}
                  <div className="">
                    <p className="text-gray-400">City/Regency</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Indramayu</p>
                    </div>
                  </div>
                  {/* sub-district */}
                  <div className="">
                    <p className="text-gray-400">Sub-District/Village</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Kotabaru</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-@blue w-full text-white font-semibold text-lg mt-20 flex h-16 items-center px-3 ">
          <p>B. Parent Datas</p>
        </div>
        <div className="bg-@light-blue flex flex-col gap-3  p-10 text-lg">
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>1.</p>
              <p>Fullname</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Mas'ud Ali</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>2.</p>
              <p>Profession</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Wiraswasta</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>3.</p>
              <p>Gender</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Man</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>4.</p>
              <p>Religion</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>Islam</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>5.</p>
              <p>Address</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <div>
                <div className=" flex flex-col gap-5">
                  {/* provence */}
                  <div className="">
                    <p className="text-gray-400">Province</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>East Java</p>
                    </div>
                  </div>
                  {/* district */}
                  <div className="">
                    <p className="text-gray-400">District</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Gondokusuman</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400">Detail</p>
                    <div className="bg-white px-3 flex py-3 h-32 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Jalan Laksda Laut Yos Sudarso No : 7 Kotabaru</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="text-gray-400">Zip Code</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>55224</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p></p>
              <div className="w-full">
                <div className="gap-10 flex flex-col gap-5">
                  {/* city */}
                  <div className="">
                    <p className="text-gray-400">City/Regency</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Indramayu</p>
                    </div>
                  </div>
                  {/* sub-district */}
                  <div className="">
                    <p className="text-gray-400">Sub-District/Village</p>
                    <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>Kotabaru</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex gap-5">
              <p>6.</p>
              <p>No. Hp/Telp</p>
            </div>
            <div className="flex gap-5">
              <p>:</p>
              <p>082330920789</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end my-5 text-lg">
          <p>Indramayu, 15/05/2023</p>
        </div>
        <div className="text-center text-lg my-10">
          <p>Signature,</p>
        </div>
        <div className="flex justify-center gap-20">
          <div className="w-[30%] text-lg text-center flex flex-col items-center gap-3">
            <p>Parent,</p>
            <img src="/signature1.png" alt="" className="w-[50%]" />
            <p>Mas'ud Ali</p>
          </div>
          <div className="w-[30%] text-lg text-center flex flex-col items-center gap-3">
            <p>Student,</p>
            <img src="/signature2.png" alt="" className="w-[50%]" />
            <p>Sochibul Wafa’</p>
          </div>
        </div>
        <div className="flex justify-end mt-10 gap-10">
          <ButtonCancelDelete
            label="back"
            onClick={() => navigate("/admin/admission")}
          />
          <ButtonSubmit label="print" />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default DetailAdmission;
