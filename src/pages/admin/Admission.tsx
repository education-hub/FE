import { FC, useEffect, useState } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

interface StudentType {
  submission_id: number;
  progress_id: number;
  user_image: any;
  user_id: number;
  user_name: string;
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
        const { data } = response;
        setStudent(data.data);
        // console.log(data);
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
      <div className="p-20 flex flex-col gap-10">
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div className="grid grid-cols-6 gap-20">
            {student.map((e) => {
              return (
                <>
                  <div>
                    <img
                      src={`https://storage.googleapis.com/prj1ropel/${e.user_image}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>Student_id</p>
                    <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>{e.user_id}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p>Fullname</p>
                    <div className="bg-@light-blue px-3 flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
                      <p>{e.user_name}</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <ButtonSubmit
                      label="Detail Admission"
                      onClick={() =>
                        navigate(`/admin/admission/${e.submission_id}`)
                      }
                    />
                  </div>
                  <div className="pt-6">
                    <ButtonSubmit
                      label="Update Progress"
                      onClick={() =>
                        navigate(`/admin/progress/${e.progress_id}`)
                      }
                    />
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Admission;
