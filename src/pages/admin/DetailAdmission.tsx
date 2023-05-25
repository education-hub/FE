/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";
import { StudentDataType } from "../../utils/user";
import {
  CardDetailAdmission,
  CardDetailAdmission2,
  CardDetailAdmissionAddress,
  CardDetailAdmissionAddress2,
} from "../../components/Card";

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

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  document.title = "Detail Students Admission | Admin Management";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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

  return (
    <LayoutAdmin>
      {loading ? (
        <div className="h-screen">Loading...</div>
      ) : (
        <div className="p-7 sm:p-20">
          <div className="text-center text-xl font-bold">
            <div className="relative">
              <h1>Summary</h1>
              <h1>New Student Admission Form</h1>
              <h1>{student.school_name}</h1>
              <div className="flex justify-center mt-5">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${student.student_data.photo}`}
                  alt="image"
                  className="w-28 h-36 sm:absolute sm:right-0 top-0 border-2 p-2 border-@blue"
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="bg-@blue w-full text-@dark font-semibold text-lg mt-10 sm:mt-20 flex h-16 items-center px-3 ">
            <p>A. Student Datas</p>
          </div>
          <div className="bg-@light-blue flex flex-col text-lg ">
            <CardDetailAdmission
              number={1}
              title="Full Name"
              data={student.student_data.name}
            />
            <CardDetailAdmission2
              number={2}
              title="Date Of Birth"
              data={student.student_data.place_date}
            />
            <CardDetailAdmission
              number={3}
              title="Gender"
              data={student.student_data.gender}
            />
            <CardDetailAdmission2
              number={4}
              title="Religion"
              data={student.student_data.religion}
            />
            <CardDetailAdmission
              number={5}
              title="Graduation From"
              data={student.student_data.graduation_from}
            />
            <CardDetailAdmission2
              number={6}
              title="NISN"
              data={student.student_data.nisn}
            />
            <CardDetailAdmissionAddress
              number={7}
              province={student.student_data.address.province}
              city={student.student_data.address.city}
              district={student.student_data.address.district}
              village={student.student_data.address.village}
              zip_code={student.student_data.address.zip_code}
            />
          </div>
          <div className="bg-@blue w-full text-@dark font-semibold text-lg mt-10 sm:mt-20 flex h-16 items-center px-3 ">
            <p>B. Parent Datas</p>
          </div>
          <div className="bg-@light-blue flex flex-col text-lg ">
            <CardDetailAdmission
              number={1}
              title="Full Name"
              data={student.parent_data.name}
            />
            <CardDetailAdmission2
              number={2}
              title="Profession"
              data={student.parent_data.job}
            />
            <CardDetailAdmission
              number={3}
              title="Gender"
              data={student.parent_data.gender}
            />
            <CardDetailAdmission2
              number={4}
              title="Religion"
              data={student.parent_data.religion}
            />
            <CardDetailAdmission
              number={5}
              title="Phone Number"
              data={student.parent_data.phone}
            />
            <CardDetailAdmissionAddress2
              number={7}
              province={student.parent_data.address.province}
              city={student.parent_data.address.city}
              district={student.parent_data.address.district}
              village={student.parent_data.address.village}
              zip_code={student.parent_data.address.zip_code}
            />
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
          <div className="flex flex-col sm:flex-row justify-end mt-10 gap-3 sm:gap-10">
            <ButtonCancelDelete
              label="back"
              onClick={() => navigate("/admin/admission")}
            />

            <ButtonSubmit
              label="Download"
              onClick={() => navigate(`/admin/admission/pdf/${id}`)}
            />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default DetailAdmission;
