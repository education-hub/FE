import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface TransactionType {
  school_name: string;
  school_image: string;
  school_id: number;
}

const Transaction: FC = () => {
  const [datas, setDatas] = useState<TransactionType[]>([]);
  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/transactions`, {
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
      <div className="p-20">
        {datas.map((data) => {
          return (
            <div
              className="grid grid-cols-8 gap-4 tracking-normal mt-5"
              key={data.school_id}
            >
              <div className="flex items-center justify-center">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${data.school_image}`}
                  alt="school_pict"
                  className="max-w-[150px] max-h-[100px]"
                />
              </div>
              <div className="col-span-4 grid grid-rows-3">
                <p className="font-semibold text-gray-500">School Name</p>
                <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                  {data.school_name}
                </div>
              </div>
              <div className="col-span-3 grid grid-rows-3 h-full w-full">
                <p className="text-white">Button Detail Transaction</p>
                <div className="row-span-2">
                  <Link to={`/student/first-registration/${data.school_id}`}>
                    <ButtonSubmit label="Detail Transaction" />
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

export default Transaction;
