import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface RegisteredSchool {
  school_name: string;
  school_image: string;
  school_web: string;
  progress_id: number;
}

const RegisterSchool: FC = () => {
  const [datas, setDatas] = useState<RegisteredSchool[]>([]);
  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/users/progress`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  return (
    <Layout>
      <div className="p-20 grid grid-flow-row auto-rows-max gap-10">
        {datas.map((data) => {
          return (
            <div
              className="grid grid-cols-9 gap-4 tracking-normal"
              key={data.progress_id}
            >
              <div className="flex items-center justify-center">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${data.school_image}`}
                  alt="school_pict"
                  className="max-w-[150px] max-h-[100px]"
                />
              </div>
              <div className="col-span-3 grid grid-rows-3">
                <p className="font-semibold text-gray-500">School Name</p>
                <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                  {data.school_name}
                </div>
              </div>
              <div className="col-span-3 grid grid-rows-3">
                <p className="font-semibold text-gray-500">School Website</p>
                <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                  {data.school_web}
                </div>
              </div>
              <div className="col-span-2 grid grid-rows-3 h-full w-full">
                <p className="text-white">Button Submit</p>
                <div className="row-span-2">
                  <Link to={`/student/progresses/${data.progress_id}`}>
                    <ButtonSubmit label="Detail Progress" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default RegisterSchool;
