import { FC } from "react";
import { Layout } from "../../components/Layout";
import { ButtonSubmit } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse {
  limit: number;
  products: RegisteredSchool[];
  skip: number;
  total: number;
}

interface RegisteredSchool {
  thumbnail: string;
  title: string;
  description: string;
}

const RegisterSchool: FC = () => {
  const [datas, setDatas] = useState<RegisteredSchool[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get<ApiResponse>(
        `https://dummyjson.com/products?limit=0&skip=0&select=title,thumbnail,description`
      )
      .then(({ data: { products } }) => {
        const registeredSchools: RegisteredSchool[] = products;
        setDatas(registeredSchools);
        console.log(registeredSchools);
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
            <div className="grid grid-cols-9 gap-4 tracking-normal">
              <div className="flex items-center justify-center">
                <img
                  src={data.thumbnail}
                  alt="school_pict"
                  className="max-w-[150px] max-h-[100px]"
                />
              </div>
              <div className="col-span-3 grid grid-rows-3">
                <p className="font-semibold text-gray-500">School Name</p>
                <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                  {data.title}
                </div>
              </div>
              <div className="col-span-3 grid grid-rows-3">
                <p className="font-semibold text-gray-500">School Website</p>
                <div className="row-span-2 flex items-center bg-@light-blue w-full px-3 h-full">
                  {data.description}
                </div>
              </div>
              <div className="col-span-2 grid grid-rows-3 h-full w-full">
                <p className="text-white">Button Submit</p>
                <div className="row-span-2">
                  <Link to={`/`}>
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
