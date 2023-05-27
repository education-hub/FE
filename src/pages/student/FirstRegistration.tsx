import { FC, useState, useEffect } from "react";

import { Layout } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { string } from "zod";

interface TransactionType {
  item_name: string;
  item_price: number;
  type: string;
  total: number;
  one_time: {
    name: string;
    price: number;
  }[];
  interval: {
    name: string;
    price: number;
  }[];
  expire: string;
  invoice: string;
  payment_code: string;
  payment_method: string;
}

interface CheckoutType {
  school_id: number;
  type: string;
  payment_method: string;
}

const FirstRegistration: FC = () => {
  const [data, setData] = useState<TransactionType>({
    item_name: "",
    item_price: 0,
    type: "",
    total: 0,
    one_time: [],
    interval: [],
    expire: "",
    invoice: "",
    payment_code: "",
    payment_method: "",
  });

  const [myType, setMyType] = useState(string);
  const [selectedValue, setSelectedValue] = useState("");
  const [cookie] = useCookies(["tkn"]);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
        setMyType(data.type);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const final = {
    school_id: id,
    type: myType,
    payment_method: selectedValue,
  };

  const handleCheckoutClick = () => {
    const checkout: CheckoutType = {
      school_id: Number(final.school_id),
      type: String(final.type),
      payment_method: final.payment_method,
    };

    axios
      .post(`https://go-event.online/transactions/checkout`, checkout, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        fetchData();
      });
  };

  const handleButtonClick = () => {
    if (data.payment_method === "bca") {
      setRedirectUrl("https://simulator.sandbox.midtrans.com/bca/va/index");
    } else if (data.payment_method === "indomaret") {
      setRedirectUrl("https://simulator.sandbox.midtrans.com/indomaret/index");
    } else if (data.payment_method === "qris") {
      setRedirectUrl("https://simulator.sandbox.midtrans.com/qris/index");
    }
  };

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <Layout>
      {/* First Registration Payment */}
      <div className="p-20 w-full h-full">
        <div className="p-5 bg-@blue w-full px-10 h-full text-center">
          <p className="text-2xl font-bold tracking-wide">
            {data.type === "registration"
              ? "First Registration Payment"
              : data.type === "herregistration"
              ? "Her-Registration Payment"
              : "Payment Summary"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-96 bg-@light-blue p-20">
          {data.type === "registration" ? (
            <div className="w-full px-10 h-full">
              <p className="text-2xl font-bold pb-80">
                First registration : Rp {data.item_price}
              </p>
              <div>
                <select
                  className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none w-full"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="" selected disabled hidden>
                    Payment Method
                  </option>
                  <option value="bca">BCA</option>
                  <option value="indomaret">Indomaret</option>
                  <option value="qris">Qris</option>
                </select>
                <p>Selected value: {selectedValue}</p>
              </div>
            </div>
          ) : data.type === "herregistration" ? (
            <div className="w-full px-10 h-full">
              <p className="text-2xl font-bold">One Payment</p>
              <table className="font-semibold text-base tracking-wide">
                {data.one_time.map((item, index) => (
                  <tr key={index}>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">:</td>
                    <td className="p-4">Rp {item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </table>
              <p className="text-2xl font-bold mt-7">Interval Payment</p>
              <table className="font-semibold text-base tracking-wide">
                {data.interval.map((item, index) => (
                  <tr key={index}>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">:</td>
                    <td className="p-4">Rp {item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </table>
              <div>
                <select
                  className="bg-@light-blue h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none w-full"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="" selected disabled hidden>
                    Payment Method
                  </option>
                  <option value="bca">BCA</option>
                  <option value="indomaret">Indomaret</option>
                  <option value="qris">Qris</option>
                </select>
                <p>Selected value: {selectedValue}</p>
              </div>
            </div>
          ) : null}
          {data.type === "registration" || data.type === "herregistration" ? (
            <div className="bg-white w-full px-10 h-full text-center">
              <p className="text-2xl font-bold pb-44 pt-10 tracking-wide">
                Detail Payment
              </p>
              <p className="text-2xl font-bold mb-16 tracking-wide">
                Total Rp {data.total}
              </p>
              <ButtonCancelDelete
                label="Checkout"
                onClick={() => handleCheckoutClick()}
              />
            </div>
          ) : (
            // ..::Payment Summary::.. //
            <div className="col-span-2 flex justify-center">
              <div className="bg-white py-10 w-1/2 justify-center flex">
                <div className="grid grid-rows-4 gap-7">
                  <div className="grid grid-cols-6">
                    <p className="col-span-3 text-2xl font-bold tracking-wide">
                      Invoice
                    </p>
                    <p className="text-2xl font-bold tracking-wide">:</p>
                    <p className="col-span-2 text-2xl font-bold tracking-wide">
                      {data.invoice}
                    </p>
                  </div>
                  <div className="grid grid-cols-6">
                    <p className="col-span-3 text-2xl font-bold tracking-wide">
                      Payment Method
                    </p>
                    <p className="text-2xl font-bold tracking-wide">:</p>
                    <p className="col-span-2 text-2xl font-bold tracking-wide">
                      {data.payment_method}
                    </p>
                  </div>
                  <div className="grid grid-cols-6">
                    <p className="col-span-3 text-2xl font-bold tracking-wide">
                      Payment Code
                    </p>
                    <p className="text-2xl font-bold tracking-wide">:</p>
                    <p className="col-span-2 text-2xl font-bold tracking-wide">
                      {data.payment_code}
                    </p>
                  </div>
                  <div className="grid grid-cols-6">
                    <p className="col-span-3 text-2xl font-bold tracking-wide">
                      Total
                    </p>
                    <p className="text-2xl font-bold tracking-wide">:</p>
                    <p className="col-span-2 text-2xl font-bold tracking-wide">
                      Rp{data.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end mt-14">
          <p className="text-xl p-5 font-semibold tracking-wider bg-@light-blue">
            Pay Before: {data.expire}
          </p>
          <ButtonSubmit label="Pay" onClick={handleButtonClick} />
        </div>
      </div>
    </Layout>
  );
};

export default FirstRegistration;
