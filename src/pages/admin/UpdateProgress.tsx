import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";
import { RadioLightBlue } from "../../components/Input";

interface objAddType {
  progress_status: string;
}

const UpdateProgress: FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;
  const [objAdd] = useState<objAddType>({
    progress_status: selectedStep,
  });

  const params = useParams();
  const { id } = params;

  document.title = "Update Progress | Admin Management";

  console.log(selectedStep, status);
  console.log(checkToken);
  console.log(student);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/admin/school/progress/${id}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setStudent(data.data);
      })
      .catch((error) => {
        const { message } = error;
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

  const updateStatus = () => {
    axios
      .put(`https://go-event.online/admin/school/progress/${id}`, objAdd, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Success update",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        console.log(error);
        Swal.fire({
          icon: "error",
          title: code,
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  return (
    <LayoutAdmin>
      <div className="overflow-x-auto p-20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-@blue h-16">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-semibold text-white uppercase tracking-wider"
                >
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-mesemibolddium text-white uppercase tracking-wider"
                >
                  STEP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-semibold text-white uppercase tracking-wider"
                >
                  PASSED
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-semibold text-white uppercase tracking-wider"
                >
                  FAILED
                </th>
              </tr>
            </thead>
            <tbody className="bg-@blue divide-y-2 divide-gray-200 text-lg font-semibold text-@dark">
              <tr className="bg-@light-blue divide-x-2">
                <td className="px-6 py-4 whitespace-nowrap text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Check file Registration
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Check file Registration");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"File Approaved"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("File Approaved");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("File Approaved");
                      setStatus("failed");
                    }}
                  />
                </td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"Sending Detail costs registration"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send Detail costs registration");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">4</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"Done Payment"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Done Payment");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">5</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"Sending test link"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send test link");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">6</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"Check test result"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Check test result");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">7</td>
                <td className="px-6 py-4 whitespace-nowrap">Test result</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Test result");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Test result");
                      setStatus("failed");
                    }}
                  />
                </td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">8</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Send Detail costs her-registration
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send Detail costs her-registration");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">9</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Already paid her-registration
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Already paid her-registration");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">10</td>
                <td className="px-6 py-4 whitespace-nowrap">Finish</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("finish");
                      setStatus("passed");
                    }}
                  />
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="mt-20 flex justify-end gap-10">
          <ButtonCancelDelete label="Cancel" />
          <ButtonSubmit label="Submit" onClick={() => updateStatus()} />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default UpdateProgress;
