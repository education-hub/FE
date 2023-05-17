import { FC, useEffect, useState } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

interface StudentType {
  adm_id: number;
  prog_id: number;
  user_img: any;
  usr_id: number;
  usr_name: string;
}

const Admission: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<StudentType[]>([]);
  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;

  console.log(student);

  const navigate = useNavigate();

  useEffect(() => {
    fetcData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetcData = () => {
    setLoading(true);
    // https://go-event.online
    axios
      .get(`https://go-event.online/admin/admission`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setStudent(data.data);
        console.log(data);
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
      <div className="p-20 flex flex-col gap-10">
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div className="grid grid-cols-6 gap-20">
            <div>
              <img src={"/org1.png"} alt="" />
            </div>
            <div>
              <p>Student_id</p>
              <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>1</p>
              </div>
            </div>
            <div className="col-span-2">
              <p>Fullname</p>
              <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                <p>Satrio Wibowo</p>
              </div>
            </div>
            <div className="pt-6">
              <ButtonSubmit
                label="Detail Admission"
                onClick={() => navigate("/admin/admission/1")}
              />
            </div>
            <div className="pt-6">
              <ButtonSubmit
                label="Update Progress"
                onClick={() => navigate("/admin/progress/2")}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-6 gap-20">
          <div>
            <img src="/org2.png" alt="" />
          </div>
          <div>
            <p>Student_id</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>2</p>
            </div>
          </div>
          <div className="col-span-2">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Dayanti Minahasa</p>
            </div>
          </div>
          <div className="pt-6">
            <ButtonSubmit
              label="Detail Admission"
              onClick={() => navigate("/admin/admission/1")}
            />
          </div>
          <div className="pt-6">
            <ButtonSubmit
              label="Update Progress"
              onClick={() => navigate("/admin/progress/2")}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-20">
          <div>
            <img src="/org3.png" alt="" />
          </div>
          <div>
            <p>Student_id</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>3</p>
            </div>
          </div>
          <div className="col-span-2">
            <p>Fullname</p>
            <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
              <p>Amelia Rosnaida</p>
            </div>
          </div>
          <div className="pt-6">
            <ButtonSubmit
              label="Detail Admission"
              onClick={() => navigate("/admin/admission/1")}
            />
          </div>
          <div className="pt-6">
            <ButtonSubmit
              label="Update Progress"
              onClick={() => navigate("/admin/progress/2")}
            />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Admission;
