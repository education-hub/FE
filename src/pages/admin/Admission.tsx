import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { LayoutAdmin } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { StudentType } from "../../utils/user";

const Admission: FC = () => {
  const [student, setStudent] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(true);

  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  document.title = "Students Admission | Admin Management";

  useEffect(() => {
    fetcData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetcData = () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/admin/admission`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setStudent(data.data);
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LayoutAdmin>
      <div
        className="p-20 flex flex-col gap-10 h-screen bg-[url(/bg-2.jpg)] bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-2.jpg)`,
        }}
      >
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div>
            {!noData ? (
              <div className="grid grid-cols-6 gap-20">
                {student.map((e) => {
                  return (
                    <>
                      <div className="flex justify-end">
                        <img
                          src={`https://storage.googleapis.com/prj1ropel/${e.user_image}`}
                          alt=""
                          className="h-16 w-auto mt-6"
                        />
                      </div>
                      <div className="">
                        <p>Student_id</p>
                        <div className="bg-@light-blue px-3 flex items-center justify-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium  focus:outline-none  ">
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
            ) : (
              <div className="text-7xl font-medium flex items-center justify-center py-18 h-full text-gray-500">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Admission;
