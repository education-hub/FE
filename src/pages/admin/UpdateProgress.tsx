import { FC, useState } from "react";
import { LayoutAdmin } from "../../components/Layout";
import { Table, Head, Body, Row, Cell } from "@headlessui/react";
import { InputLightBlue, RadioLightBlue } from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

interface User {
  id: number;
  name: string;
  email: string;
}

const UpdateProgress: FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
  ]);

  const [selectedStep, setSelectedStep] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  console.log(selectedStep, status);

  return (
    <LayoutAdmin>
      <div className="overflow-x-auto p-20">
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
              <td className="px-6 py-4 whitespace-nowrap">{"Done Payment"}</td>
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
        <div className="mt-20 flex justify-end gap-10">
          <ButtonCancelDelete label="Cancel" />
          <ButtonSubmit label="Submit" />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default UpdateProgress;
