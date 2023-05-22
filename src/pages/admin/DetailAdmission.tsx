import { useNavigate, useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";

interface StudentDataType {
  school_name: string;
  date_place: string;
  parent_data: {
    gender: string;
    name: string;
    job: string;
    phone: string;
    religion: string;
    address: {
      province: string;
      city: string;
      district: string;
      village: string;
      detail: string;
      zip_code: string;
    };
  };
  parent_signature: string;
  student_data: {
    gender: string;
    graduation_from: string;
    name: string;
    nisn: number;
    photo: string;
    place_date: string;
    religion: string;
    address: {
      province: string;
      city: string;
      district: string;
      village: string;
      detail: string;
      zip_code: string;
    };
  };
  student_signature: string;
}

const DetailAdmission: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<StudentDataType>({
    school_name: "",
    date_place: "",
    parent_data: {
      gender: "",
      name: "",
      job: "",
      phone: "",
      religion: "",
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        detail: "",
        zip_code: "",
      },
    },
    parent_signature: "",
    student_data: {
      gender: "",
      graduation_from: "",
      name: "",
      nisn: 0,
      photo: "",
      place_date: "",
      religion: "",
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        detail: "",
        zip_code: "",
      },
    },
    student_signature: "",
  });
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  console.log(student);

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  console.log(id);
  document.title = "Detail Students Admission | Admin Management";

  useEffect(() => {
    fetcData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetcData = () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/admin/admission/${id}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setStudent(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed to Fetch Data!!",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(student);

  return (
    <LayoutAdmin>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-20">
          <div className="text-center text-xl font-bold">
            <h1>Summary</h1>
            <h1>New Student Admission Form</h1>
            <h1>{student.school_name}</h1>
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
                <p>{student.student_data.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>2.</p>
                <p>Date Of Birth</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.student_data.place_date}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>3.</p>
                <p>Gender</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.student_data.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>4.</p>
                <p>Religion</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.student_data.religion}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>5.</p>
                <p>Graduation From</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.student_data.graduation_from}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>6.</p>
                <p>NISN</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.student_data.nisn}</p>
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
                        <p>{student.student_data.address.province}</p>
                      </div>
                    </div>
                    {/* district */}
                    <div className="">
                      <p className="text-gray-400">District</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.student_data.address.district}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-gray-400">Detail</p>
                      <div className="bg-white px-3 flex py-3 h-32 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.student_data.address.detail}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <p className="text-gray-400">Zip Code</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.student_data.address.zip_code}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p></p>
                <div className="w-full">
                  <div className="gap-10 flex flex-col">
                    {/* city */}
                    <div className="">
                      <p className="text-gray-400">City/Regency</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.student_data.address.city}</p>
                      </div>
                    </div>
                    {/* sub-district */}
                    <div className="">
                      <p className="text-gray-400">Sub-District/Village</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.student_data.address.village}</p>
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
                <p>{student.parent_data.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>2.</p>
                <p>Profession</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.parent_data.job}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>3.</p>
                <p>Gender</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.parent_data.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex gap-5">
                <p>4.</p>
                <p>Religion</p>
              </div>
              <div className="flex gap-5">
                <p>:</p>
                <p>{student.parent_data.religion}</p>
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
                        <p>{student.parent_data.address.province}</p>
                      </div>
                    </div>
                    {/* district */}
                    <div className="">
                      <p className="text-gray-400">District</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.parent_data.address.city}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-gray-400">Detail</p>
                      <div className="bg-white px-3 flex py-3 h-32 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.parent_data.address.detail}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <p className="text-gray-400">Zip Code</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.parent_data.address.zip_code}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p></p>
                <div className="w-full">
                  <div className="gap-10 flex flex-col">
                    {/* city */}
                    <div className="">
                      <p className="text-gray-400">City/Regency</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.parent_data.address.city}</p>
                      </div>
                    </div>
                    {/* sub-district */}
                    <div className="">
                      <p className="text-gray-400">Sub-District/Village</p>
                      <div className="bg-white px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                        <p>{student.parent_data.address.village}</p>
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
                <p>{student.parent_data.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end my-5 text-lg">
            <p>{student.date_place}</p>
          </div>
          <div className="text-center text-lg my-10">
            <p>Signature,</p>
          </div>
          <div className="flex justify-center gap-20">
            <div className="w-[30%] text-lg text-center flex flex-col items-center gap-3">
              <p>Parent,</p>
              <img
                src={`https://storage.googleapis.com/prj1ropel/${student.parent_signature}`}
                alt="parent signature"
                className="w-[50%]"
              />
              <p>{student.parent_data.name}</p>
            </div>
            <div className="w-[30%] text-lg text-center flex flex-col items-center gap-3">
              <p>Student,</p>
              <img
                src={`https://storage.googleapis.com/prj1ropel/${student.student_signature}`}
                alt="studnet signature"
                className="w-[50%]"
              />
              <p>{student.student_data.name}</p>
            </div>
          </div>
          <div className="flex justify-end mt-10 gap-10">
            <ButtonCancelDelete
              label="back"
              onClick={() => navigate("/admin/admission")}
            />
            <ButtonSubmit label="print" onClick={() => window.print()} />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default DetailAdmission;
