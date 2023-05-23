/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;
  const [objAdd] = useState<objAddType>({
    progress_status: selectedStep,
  });

  const params = useParams();
  const { id } = params;
  console.log(id);

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
      .get(`https://go-event.online/progresses/${id}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setStudent(data.progress_status);
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

  console.log(student);

  const updateStatus = () => {
    const requesBody = { ...objAdd, progress_status: selectedStep };
    console.log(requesBody);
    axios
      .put(`https://go-event.online/progresses/${id}`, requesBody, {
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
                      setSelectedStep("Check File Registration");
                    }}
                    checked={
                      student === "Check File Registration" ||
                      selectedStep === "Check File Registration"
                    }
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
                      setSelectedStep("File Approved");
                    }}
                    checked={
                      student === "File Approved" ||
                      selectedStep === "File Approved"
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Failed File Approaved");
                    }}
                    checked={
                      student === "Failed File Approaved" ||
                      selectedStep === "Failed File Approaved"
                    }
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
                      setSelectedStep("Send Detail Costs Registration");
                    }}
                    checked={
                      student === "Send Detail Costs Registration" ||
                      selectedStep === "Send Detail Costs Registration"
                    }
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
                    }}
                    checked={
                      student === "Done Payment" ||
                      selectedStep === "Done Payment"
                    }
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
                      setSelectedStep("Send Test Link");
                    }}
                    checked={
                      student === "Send Test Link" ||
                      selectedStep === "Send Test Link"
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className={"bg-@light-blue divide-x-2"}>
                <td className="px-6 py-4 whitespace-nowrap text-center">6</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"Check Test Result"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Check Test Result");
                    }}
                    checked={
                      student === "Check Test Result" ||
                      selectedStep === "Check Test Result"
                    }
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
                      setSelectedStep("Test Result");
                    }}
                    checked={
                      student === "Test Result" ||
                      selectedStep === "Test Result"
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Failed Test Result");
                    }}
                    checked={
                      student === "Failed Test Result" ||
                      selectedStep === "Failed Test Result"
                    }
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
                      setSelectedStep("Send Detail Costs Her-Registration");
                    }}
                    checked={
                      student === "Send Detail Costs Her-Registration" ||
                      selectedStep === "Send Detail Costs Her-Registration"
                    }
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
                      setSelectedStep("Already Paid Her-Registration");
                    }}
                    checked={
                      student === "Already Paid Her-Registration" ||
                      selectedStep === "Already Paid Her-Registration"
                    }
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
                      setSelectedStep("Finish");
                    }}
                    checked={student === "Finish" || selectedStep === "Finish"}
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
