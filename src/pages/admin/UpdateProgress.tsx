/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import Pusher from "pusher-js";

import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { LayoutAdmin } from "../../components/Layout";
import { RadioLightBlue } from "../../components/Input";
import { CardProgress } from "../../components/Card";

const APP_KEY = "198b35e916a3f0811a9c";
const CLUSTER_NAME = "ap1";

const pusher = new Pusher(APP_KEY, {
  cluster: CLUSTER_NAME,
});

interface objAddType {
  progress_status: string;
}

const UpdateProgress: FC = () => {
  const [pusherStatus, setPusherStatus] = useState<string>("");
  const [selectedStep, setSelectedStep] = useState<string>("");
  const [objAdd] = useState<objAddType>({ progress_status: selectedStep });
  const [loading, setLoading] = useState<boolean>(false);
  const [progress_id, setProgress_id] = useState<string>("");
  const [student, setStudent] = useState({});

  const [cookie] = useCookies(["tkn", "uname"]);
  const checkToken = cookie.tkn;

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  document.title = "Update Progress | Admin Role";

  useEffect(() => {
    const channel = pusher.subscribe("my-channel");
    channel.bind("ADMINADMISSION", (data: any) => {
      console.log(data);
      setPusherStatus(data.status);
      setProgress_id(data.progress_id);
    });
    return () => {
      channel.unbind("ADMINADMISSION");
      pusher.unsubscribe("my-channel");
    };
  }, []);

  useEffect(() => {
    handleShowPusher();
  }, [pusherStatus]);

  console.log(id, progress_id);

  const handleShowPusher = () => {
    if (id == progress_id) {
      Swal.fire({
        icon: "info",
        title: `${pusherStatus}`,
        showCancelButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
    }
  };

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

  const updateStatus = () => {
    const requesBody = { ...objAdd, progress_status: selectedStep };
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
      <div className="overflow-x-auto p-2 sm:p-7 md:p-12 lg:p-20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <div className="grid grid-cols-8">
                <div className="p-2 border-2 flex items-center text-center justify-center bg-@blue font-semibold text-white">
                  NO
                </div>
                <div className="p-2 border-2 flex items-center  text-center col-span-3  justify-center bg-@blue font-semibold text-white">
                  STEP
                </div>
                <div className="p-2 border-2 flex items-center text-center col-span-2 justify-center bg-@blue font-semibold text-white">
                  STUDENT STEPS
                </div>
                <div className="p-2 border-2 flex items-center text-center col-span-2 justify-center bg-@blue font-semibold text-white">
                  UPDATE PROGRESS
                </div>
              </div>
              <CardProgress
                number={1}
                steps=" Check file Registration "
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Check File Registration" ? (
                      <ImCheckmark />
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={<></>}
              />
              <CardProgress
                number={2}
                steps=" File Approved "
                student_steps={
                  <div className="flex flex-col items-center justify-center">
                    {student === "File Approved" ? (
                      <div className="flex flex-col items-center justify-center">
                        <ImCheckmark />
                        <p className="text-green-500">File Approved</p>
                      </div>
                    ) : student === "Failed File Approved" ? (
                      <div className="flex flex-col items-center justify-center">
                        <ImCheckmark />
                        <p className="text-red-500">File Rejected</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <div className="flex flex-col items-center">
                      <RadioLightBlue
                        type="radio"
                        name="selectedStep"
                        onClick={() => {
                          setSelectedStep("File Approved");
                        }}
                        checked={selectedStep === "File Approved"}
                      />
                      <p>Approved</p>
                    </div>
                    <div className="flex flex-col items-center ">
                      <RadioLightBlue
                        type="radio"
                        name="selectedStep"
                        onClick={() => {
                          setSelectedStep("Failed File Approved");
                        }}
                        checked={selectedStep === "Failed File Approved"}
                      />
                      <p>Rejected</p>
                    </div>
                  </div>
                }
              />
              <CardProgress
                number={3}
                steps="Sending Detail costs registration"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Send Detail Costs Registration" ? (
                      <ImCheckmark />
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send Detail Costs Registration");
                    }}
                    checked={selectedStep === "Send Detail Costs Registration"}
                  />
                }
              />
              <CardProgress
                number={4}
                steps="Done Payment"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Done Payment" ? <ImCheckmark /> : <></>}{" "}
                  </div>
                }
                update_progress={""}
              />
              <CardProgress
                number={5}
                steps="Sending Test Link"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Send Test Link" ? <ImCheckmark /> : <></>}
                  </div>
                }
                update_progress={
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send Test Link");
                    }}
                    checked={selectedStep === "Send Test Link"}
                  />
                }
              />
              <CardProgress
                number={6}
                steps="Test Result"
                student_steps={
                  <div className="flex flex-col items-center justify-center">
                    {student === "Test Result" ? (
                      <div className="flex flex-col items-center justify-center">
                        <ImCheckmark />
                        <p className="text-green-500">Test Passed</p>
                      </div>
                    ) : student === "Failed Test Result" ? (
                      <div className="flex flex-col items-center justify-center">
                        <ImCheckmark />
                        <p className="text-red-500">Test Failed</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={<></>}
              />
              <CardProgress
                number={7}
                steps=" Sending Detail costs her-registration"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Sending Detail Cost Her-Registration" ? (
                      <ImCheckmark />
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Send Detail Costs Her-Registration");
                    }}
                    checked={
                      selectedStep === "Send Detail Costs Her-Registration"
                    }
                  />
                }
              />
              <CardProgress
                number={8}
                steps=" Already paid her-registration"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Already Paid Her-Registration" ? (
                      <ImCheckmark />
                    ) : (
                      <></>
                    )}
                  </div>
                }
                update_progress={""}
              />
              <CardProgress
                number={9}
                steps="Finish"
                student_steps={
                  <div className="flex justify-center items-center">
                    {student === "Finish" ? <ImCheckmark /> : <></>}
                  </div>
                }
                update_progress={
                  <RadioLightBlue
                    type="radio"
                    name="selectedStep"
                    onClick={() => {
                      setSelectedStep("Finish");
                    }}
                    checked={selectedStep === "Finish"}
                  />
                }
              />
            </div>
          </>
        )}
        <div className="my-7 sm:mt-20 flex justify-end gap-10">
          <ButtonCancelDelete
            label="Cancel"
            onClick={() => navigate("/admin/admission")}
          />
          <ButtonSubmit label="Submit" onClick={() => updateStatus()} />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default UpdateProgress;
