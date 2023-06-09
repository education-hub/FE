import { FC, useContext } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ThemeContext } from "../../utils/context";

interface TransactionType {
  school_name: string;
  school_image: string;
  school_id: number;
}

const Transaction: FC = () => {
  const [datas, setDatas] = useState<TransactionType[]>([]);
  const [noData, setNoData] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn"]);

  const contextData = useContext(ThemeContext);
  const themeMode = contextData.theme;

  document.title = "Transactions | Student Role";

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
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      });
  }

  return (
    <Layout>
      {themeMode === "dark" ? (
        <div className="bg-@dark p-7 sm:p-20 flex flex-col gap-10 h-full md:h-screen bg-top bg-cover">
          <div>
            {!noData ? (
              <div>
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
                        <p className="font-semibold text-gray-500 dark:text-white">
                          School Name
                        </p>
                        <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                          {data.school_name}
                        </div>
                      </div>
                      <div className="col-span-3 grid grid-rows-3 h-full w-full">
                        <p className="text-white">Button Detail Transaction</p>
                        <div className="row-span-2">
                          <Link to={`/student/transactions/${data.school_id}`}>
                            <ButtonSubmit label="Detail Transaction" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-7xl font-medium flex items-center justify-center py-18 h-full text-gray-500">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="p-7 sm:p-20 flex flex-col gap-10 h-full md:h-screen bg-[url(/bg-5.jpg)] bg-top bg-cover"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5)),url(/bg-5.jpg)`,
          }}
        >
          <div>
            {!noData ? (
              <div>
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
                        <p className="font-semibold text-gray-500">
                          School Name
                        </p>
                        <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                          {data.school_name}
                        </div>
                      </div>
                      <div className="col-span-3 grid grid-rows-3 h-full w-full">
                        <p className="text-white">Button Detail Transaction</p>
                        <div className="row-span-2">
                          <Link to={`/student/transactions/${data.school_id}`}>
                            <ButtonSubmit label="Detail Transaction" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-7xl font-medium flex items-center justify-center py-18 h-full text-gray-500">
                <p>Data Not Found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Transaction;
