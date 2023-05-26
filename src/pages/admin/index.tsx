/* eslint-disable react-hooks/exhaustive-deps */
import {
  TbWorldWww,
  TbMapPin,
  TbArrowsMoveVertical,
  TbCheck,
  TbBrandWhatsapp,
} from "react-icons/tb";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Fragment, FC, useEffect, useState, MouseEvent } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ProgressBar } from "@react-pdf-viewer/core";
import { Link, useNavigate } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
} from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { VideoBackground } from "../../components/videoBackground";
import { CardAddQuiz, CardCost } from "../../components/Card";
import { NavbarIndexAdmin } from "../../components/Navbar";
import { AccordionFAQ } from "../../components/Accordion";
import { LayoutAdmin } from "../../components/Layout";
import { Footer } from "../../components/Footer";
import {
  GmeetDataType,
  ExtracurricularDataType,
  UpdateExtracurricularDataType,
  AchievementDataType,
  UpdateAchievementDataType,
  FAQDataType,
  DetailSchoolDataType,
  FAQUpdateDataType,
  AddCostDataType,
  CostDataType,
  QuizDataType,
} from "../../utils/user";

const interval = [
  { interval: 0, name: "One time payment" },
  { interval: 1, name: "Every 1 month" },
  { interval: 3, name: "Every 3 month" },
  { interval: 6, name: "Every 6 month" },
];

const Admin: FC = () => {
  const [idExtracurricular, setIdExtracurricular] = useState<number>();
  const [schoolId, setSchoolId] = useState<number>();
  const [idCost, setIdCost] = useState<number>();
  const [idFAQ, setIdFAQ] = useState<number>();

  const [selectedItem, setSelectedItem] = useState<QuizDataType>({
    school_id: schoolId || 0,
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: 0,
  });
  const [updateExtracurricular, setUpdateExtracurricular] = useState<
    Partial<UpdateExtracurricularDataType>
  >({});
  const [updateAchievement, setUpdateAchievement] = useState<
    Partial<UpdateAchievementDataType>
  >({});
  const [addExtracurricural, setAddExtracurricular] = useState<
    Partial<ExtracurricularDataType>
  >({});
  const [isOpenAddExtracurricular, setIsOpenAddExtracurricular] =
    useState<boolean>(false);
  const [addAchievement, setAddAchievement] = useState<
    Partial<AchievementDataType>
  >({});
  const [isOpenIntervalPayment, setisOpenIntervalPayment] =
    useState<boolean>(false);
  const [isOpenAddAchievement, setIsOpenAddAchievement] =
    useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<Partial<DetailSchoolDataType>>(
    {}
  );
  const [updateFAQ, setUpdateFAQ] = useState<Partial<FAQUpdateDataType>>({});
  const [isOpenExtracurriculer, setIsOpenExtracurriculer] = useState(false);
  const [updateCost, setUpdateCost] = useState<Partial<CostDataType>>({});
  const [addGmeet, setAddGmeet] = useState<Partial<GmeetDataType>>({});
  const [addCost, setAddCost] = useState<Partial<AddCostDataType>>({});
  const [updatedQuestion, setUpdatedQuestion] = useState<string>("");
  const [isOpenAchievement, setIsOpenAchievement] = useState(false);
  const [updatedOption1, setUpdatedOption1] = useState<string>("");
  const [updatedOption2, setUpdatedOption2] = useState<string>("");
  const [updatedOption3, setUpdatedOption3] = useState<string>("");
  const [updatedOption4, setUpdatedOption4] = useState<string>("");
  const [addQuiz, setAddQuiz] = useState<Partial<QuizDataType>>({});
  const [isOpenDisclaimer, setIsOpenDisclaimer] = useState(false);
  const [idAchievement, setIdAchievement] = useState<number>();
  const [updatedAnswer, setUpdatedAnswer] = useState<number>();
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [faq, setFaq] = useState<Partial<FAQDataType>>({});
  const [src, setSrc] = useState<string | undefined>("");
  const [selected, setSelected] = useState(interval[0]);
  const [noData, setNoData] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizDataType[]>([]);
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);
  const [tomorrow, setTomorrow] = useState<Date>();

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;
  const navigate = useNavigate();

  document.title = "Detail School | Admin Management";

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    fetchAllData();
    minTomorrow();
  }, []);

  const minTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow);
  };

  const fetchAllData = () => {
    axios
      .get(`https://go-event.online/admin/school`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setSchoolData(data);
        setSchoolId(data.id);
        setNoData(false);
        console.log(data);
        const new_string =
          data.video
            ?.split(/,|\/|=/)
            .pop()
            ?.trim() ?? "";
        setSrc(new_string);
      })
      .catch(() => {
        setNoData(true);
      });
  };

  const deleteDataSchool = () => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/school/${schoolId}`, {
            headers: {
              Authorization: `Bearer ${checkToken}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success Delete !!",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          })
          .finally(() => fetchAllData());
      }
    });
  };

  // G-meet handle

  const handleAddGmeet = () => {
    setAddGmeet((prevAddGmeet) => ({ ...prevAddGmeet, school_id: schoolId }));
    const requestData = { ...addGmeet, school_id: schoolId };
    axios
      .post(`https://go-event.online/gmeet`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message, data } = response.data;
        Swal.fire({
          icon: "success",
          title: "Create G-meet Success!!",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setAddGmeet({});
            window.open(data.redirect, "_blank");
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        setNoData;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchAllData());
  };

  // Extracurriculer Handle

  const handleChangeExtracurricular = (
    value: string | File | number | null,
    key: keyof typeof addExtracurricural
  ) => {
    const temp = { ...addExtracurricural };
    if (value === null) {
      temp[key] = null;
    } else {
      temp[key] = value;
    }
    setAddExtracurricular(temp);
  };
  const handleChangeUpdateExtracurricular = (
    value: string | File,
    key: keyof typeof updateExtracurricular
  ) => {
    const temp = { ...updateExtracurricular };
    temp[key] = value;
    setUpdateExtracurricular(temp);
  };

  const handleSubmitExtracurriculer = () => {
    setAddExtracurricular((prevExtracurriculer) => ({
      ...prevExtracurriculer,
      school_id: schoolData.id,
    }));

    const requestData = { ...addExtracurricural, school_id: schoolId };

    axios
      .post(`https://go-event.online/extracurriculars`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Submit Extracurricular Success!!",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpenAddExtracurricular(false);
            setAddExtracurricular({});
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        setNoData;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchAllData());
  };

  const handleUpdateExtracurricular = () => {
    setUpdateExtracurricular((prevExtracurriculer) => ({
      ...prevExtracurriculer,
      id: idExtracurricular,
    }));

    const requestData = { ...updateExtracurricular, id: idExtracurricular };
    axios
      .put(`https://go-event.online/extracurriculars`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data && response.data;
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setUpdateExtracurricular({});
            setIsOpenExtracurriculer(false);
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        fetchAllData();
      });
  };

  const handleDeleteExtracurricular = (id: number) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/extracurriculars/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.tkn}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success Delete !!",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          })
          .finally(() => fetchAllData());
      }
    });
  };

  // Achievement Handle

  const handleChangeAchievement = (
    value: string | File | number | null,
    key: keyof typeof addExtracurricural
  ) => {
    const temp = { ...addAchievement };
    if (value === null) {
      temp[key] = null;
    } else {
      temp[key] = value;
    }
    setAddAchievement(temp);
  };

  const handleChangeUpdateAchievement = (
    value: string | File,
    key: keyof typeof updateAchievement
  ) => {
    const temp = { ...updateAchievement };
    temp[key] = value;
    setUpdateAchievement(temp);
  };

  const handleAddAchievement = () => {
    setAddAchievement((prevAddAcheivement) => ({
      ...prevAddAcheivement,
      school_id: schoolId,
    }));

    const requestData = { ...addAchievement, school_id: schoolId };
    axios
      .post(`https://go-event.online/achievements`, requestData, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Submit Achievemetn Success!!",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpenAddAchievement(false);
            setAddAchievement({});
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        setNoData;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchAllData());
  };

  const handleUpdateAchievement = () => {
    setUpdateAchievement((prevUpdateAchievement) => ({
      ...prevUpdateAchievement,
      id: idAchievement,
    }));
    const requestData = { ...updateAchievement, id: idAchievement };
    axios
      .put(`https://go-event.online/achievements`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data && response.data;
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setUpdateAchievement({});
            setIsOpenAchievement(false);
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        fetchAllData();
      });
  };

  const handleDeleteAchievement = (id: number) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/achievements/${id}`, {
            headers: {
              Authorization: `Bearer ${checkToken}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success Delete !!",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          })
          .finally(() => fetchAllData());
      }
    });
  };

  // Cost Handle

  const handleChangeCost = (
    value: string | File | number | null,
    key: keyof typeof addCost
  ) => {
    const temp = { ...addCost };
    if (value === null) {
      temp[key] = null;
    } else {
      temp[key] = value;
    }
    setAddCost(temp);
  };

  const handleChangeUpdateCost = (
    value: string | File,
    key: keyof typeof updateCost
  ) => {
    const temp = { ...updateCost };
    temp[key] = value;
    setUpdateCost(temp);
  };

  const handleAddCost = () => {
    setAddCost((prevCost) => ({
      ...prevCost,
      interval: selected.interval,
      school_id: schoolId,
    }));
    const requestData = {
      ...addCost,
      interval: selected.interval,
      school_id: schoolId,
    };

    axios
      .post(`https://go-event.online/payments`, requestData, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Add Cost Success!!",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setAddCost({});
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchAllData());
  };

  const handleUpdateCost = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUpdateCost((prevUpdateCost) => ({
      ...prevUpdateCost,
      id: idCost,
    }));
    const requestData = { ...updateCost, id: idCost };
    axios
      .put(`https://go-event.online/payments`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data && response.data;
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setUpdateCost({});
            setIsOpenPayment(false);
            setisOpenIntervalPayment(false);
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        fetchAllData();
      });
  };

  const handleDeleteCost = (id: number) => {
    Swal.fire({
      title: "Are you sure want to delete ?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/payments/${id}`, {
            headers: {
              Authorization: `Bearer ${checkToken}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success Delete !!",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          })
          .finally(() => fetchAllData());
      }
    });
  };

  // FAQ Handle

  const handleSubmitFAQ = () => {
    setFaq((prevFaq) => ({ ...prevFaq, school_id: schoolData.id }));
    const requestData = { ...faq, school_id: schoolId };
    axios
      .post(`https://go-event.online/faqs`, requestData, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Submit FAQ Success!!",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchAllData());
  };

  const handleUpdateFAQ = () => {
    setUpdateFAQ((prevFaq) => ({ ...prevFaq, id: idFAQ }));
    const requestData = { ...updateFAQ, id: idFAQ };
    axios
      .put(`https://go-event.online/faqs`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data && response.data;
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setUpdateFAQ({});
            setIsOpenFAQ(false);
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        fetchAllData();
      });
  };

  const handleDeleteFAQ = (id: number) => {
    Swal.fire({
      title: "Are you sure want to delete FAQ?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/faqs/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.tkn}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success Delete FAQ",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { message } = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          })
          .finally(() => fetchAllData());
      }
    });
  };

  // quiz handle
  const handleAddQuiz = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      addQuiz.question === undefined ||
      addQuiz.option1 === undefined ||
      addQuiz.option2 === undefined ||
      addQuiz.option3 === undefined ||
      addQuiz.option4 === undefined ||
      addQuiz.answer === undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "data cannot empty",
      });
      return;
    } else {
      const AddQuiz: QuizDataType = {
        ...addQuiz,
        school_id: schoolId ? schoolId : 0,
      };
      setQuiz(quiz.concat(AddQuiz));
    }
  };

  const openModalQuiz = (e: QuizDataType) => {
    setSelectedItem(e);
    setUpdatedQuestion(e.question || "");
    setUpdatedOption1(e.option1 || "");
    setUpdatedOption2(e.option2 || "");
    setUpdatedOption3(e.option3 || "");
    setUpdatedOption4(e.option4 || "");
    setUpdatedAnswer(e.answer);
    setIsOpenQuiz(true);
  };

  const closeModalQuiz = () => {
    setIsOpenQuiz(false);
  };

  const handleSaveUpdateQuiz = () => {
    const updatedQuiz = quiz.map((item) => {
      if (item === selectedItem) {
        return {
          ...item,
          question: updatedQuestion,
          option1: updatedOption1,
          option2: updatedOption2,
          option3: updatedOption3,
          option4: updatedOption4,
          answer: updatedAnswer,
        };
      }
      return item;
    });
    setQuiz(updatedQuiz as QuizDataType[]);
    closeModalQuiz();
  };

  const handleDeleteProperty = (indexToDelete: number) => {
    Swal.fire({
      title: "Are you sure to delete ?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedQuiz = quiz.filter((_, index) => index !== indexToDelete);
        setQuiz(updatedQuiz);
      }
    });
  };

  const FinalAddQuiz = () => {
    axios
      .post(`https://go-event.online/quiz`, quiz, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        Swal.fire({
          icon: "success",
          title: "Submit Quiz Success!!",
          text: data,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: message,
          showCancelButton: false,
        });
      })
      .finally(() => window.location.reload());
  };

  return (
    <>
      {!noData ? (
        <LayoutAdmin>
          <div>
            {/* Section 1 */}
            <div className="grid lg:grid-cols-2 p-7 sm:p-20 gap-10 md:gap-20 text-@dark">
              <div className="flex flex-col gap-10">
                <h1 className="text-4xl sm:text-5xl">
                  {schoolData.name?.toUpperCase()}
                </h1>
                <p className="text-lg">{schoolData.description}</p>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">
                      {schoolData.students}
                    </h1>
                    <p>Students</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">
                      {schoolData.teachers}
                    </h1>
                    <p>Teachers</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">{schoolData.staff}</h1>
                    <p>Staff</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">
                      {schoolData.accreditation}
                    </h1>
                    <p>Akreditasion</p>
                  </div>
                </div>
                <div className=" flex space-x-3">
                  <TbWorldWww className="text-2xl" />
                  <p className="text-lg">
                    School Website:{" "}
                    <span className="hover:text-@orange">
                      <Link
                        to={"https://sma3jogja.sch.id/"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {schoolData.web}
                      </Link>
                    </span>
                  </p>
                </div>
                <div className=" flex space-x-3">
                  <TbBrandWhatsapp className="text-2xl" />
                  <p className="text-lg">
                    Whatsapp Admin:{" "}
                    <span className="hover:text-@orange">
                      <Link
                        to={`${schoolData.WaLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`View Here`}
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col bg-@light-blue">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${schoolData.image}`}
                  alt=""
                  className="relative z-10 h-auto w-full"
                />
                <div className="flex pl-10 py-7 items-center space-x-5">
                  <TbMapPin className="text-3xl text-@blue" />
                  <p className="text-lg font-semibold">{schoolData.city}</p>
                </div>
              </div>
            </div>
            {/* Section 2 */}
            <div className="bg-gray-200 grid lg:grid-cols-2 p-7 sm:p-20 gap-20 text-@dark text-lg">
              <div className="flex flex-col gap-10">
                <h1 className="text-2xl font-bold">Review</h1>
                {Array.isArray(schoolData.reviews) ? (
                  schoolData.reviews?.map((e) => (
                    <div className="flex space-x-10 h-16">
                      <img
                        src={`https://storage.googleapis.com/prj1ropel/${e.image}`}
                        alt=""
                        className="h-16 w-24"
                      />
                      <div className=" flex items-center bg-@light-blue w-full px-10 h-full">
                        <p>{e.review}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col gap-10">
                <iframe
                  className="w-full h-96"
                  src={`https://www.youtube.com/embed/${src}`}
                  title="Introduction Video"
                  allowFullScreen
                />
                <div className="flex flex-col">
                  <ButtonSubmit
                    label="View Brochure"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 sm:gap-20">
                <ButtonCancelDelete
                  label="Delete School"
                  onClick={() => deleteDataSchool()}
                />
                <ButtonSubmit
                  label="Edit School"
                  onClick={() =>
                    navigate(`/admin/edit-school/${schoolData.id}`)
                  }
                />
              </div>
            </div>
            {/* Section 3 */}
            <div className="grid lg:grid-cols-2 p-7 sm:p-20 gap-7 sm:gap-20">
              <div className="grid sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="flex flex-col gap-1">
                  <p>Start Time</p>
                  <InputLightBlue
                    type="datetime-local"
                    min={`${tomorrow && tomorrow.toISOString().slice(0, 16)}`}
                    onChange={(event) =>
                      setAddGmeet({
                        ...addGmeet,
                        start_time: event.target.value + ":00",
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>End Time</p>
                  <InputLightBlue
                    type="datetime-local"
                    min={`${tomorrow && tomorrow.toISOString().slice(0, 16)}`}
                    onChange={(event) =>
                      setAddGmeet({
                        ...addGmeet,
                        end_time: event.target.value + ":00",
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end">
                <ButtonSubmit
                  label="CREATE G-MEET"
                  onClick={() => handleAddGmeet()}
                />
              </div>
              <div className="text-lg  font-semibold flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <p> link G-meet : </p>
                  <button
                    className="text-@orange flex "
                    onClick={() => window.open(schoolData?.gmeet, "_blank")}
                  >
                    <p>{schoolData?.gmeet}</p>
                  </button>
                </div>
                <div className="flex gap-3">
                  <p>G-meet Date : </p> <p>{schoolData?.gmeet_date}</p>
                </div>
              </div>
            </div>
            {/* Section 4  extracurriculer*/}
            <div className="bg-gray-200 p-7 sm:p-20 grid lg:grid-cols-2 gap-7 md:gap-12 lg:gap-20">
              <div className="flex flex-col gap-10">
                <ButtonSubmit
                  label="ADD EXTRACULLICULER"
                  onClick={() => setIsOpenAddExtracurricular(true)}
                />
                {Array.isArray(schoolData.extracurriculars) ? (
                  schoolData.extracurriculars.map((e) => (
                    <div
                      className="bg-@light-blue p-7 sm:p-10 flex flex-col gap-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
                      key={e.id}
                    >
                      <div className="flex space-x-10">
                        <img
                          src={`https://storage.googleapis.com/prj1ropel/${e.image}`}
                          alt=""
                          className="h-32 w-auto"
                        />
                        <div className="w-full flex flex-col gap-4">
                          <h1 className="text-2xl font-semibold">{e.name}</h1>
                          <p className="text-lg">{e.description}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-7 sm:gap-12 md:gap-28 lg:gap-32 xl:gap-40">
                        <ButtonCancelDelete
                          label="Delete"
                          onClick={() => handleDeleteExtracurricular(e.id)}
                        />
                        <ButtonSubmit
                          label="Edit"
                          onClick={() => {
                            setIdExtracurricular(e.id);
                            setIsOpenExtracurriculer(true);
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No extracurricular data available</p>
                )}
              </div>
              <div className="flex flex-col gap-10">
                <ButtonSubmit
                  label="ADD ACHIEVEMENT"
                  onClick={() => setIsOpenAddAchievement(true)}
                />
                {Array.isArray(schoolData.achievements) ? (
                  schoolData.achievements.map((e) => (
                    <div
                      className="bg-@light-blue   p-10 flex flex-col gap-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
                      key={e.id}
                    >
                      <div className="flex space-x-10">
                        <img
                          src={`https://storage.googleapis.com/prj1ropel/${e.image}`}
                          alt=""
                          className="h-32 w-auto"
                        />
                        <div className="w-full flex flex-col gap-4">
                          <h1 className="text-2xl font-semibold">{e.name}</h1>
                          <p className="text-lg">{e.description}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-7 sm:gap-12 md:gap-28 lg:gap-32 xl:gap-40">
                        <ButtonCancelDelete
                          label="Delete"
                          onClick={() => handleDeleteAchievement(e.id)}
                        />
                        <ButtonSubmit
                          label="Edit"
                          onClick={() => {
                            setIdAchievement(e.id);
                            setIsOpenAchievement(true);
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No extracurricular data available</p>
                )}
              </div>
            </div>
            {/* Secton 5 */}
            <div className="p-7 sm:p-20 flex flex-col gap-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                <div className="bg-@light-blue">
                  <div className=" p-10">
                    <img
                      src={
                        addCost.image
                          ? URL.createObjectURL(addCost.image)
                          : "/photo.png"
                      }
                      alt="cost-image"
                      className="w-full h-auto border-1 border-black "
                    />
                  </div>
                  <input
                    placeholder=""
                    id="upload-image"
                    type="file"
                    className="p-4"
                    onChange={(event) => {
                      if (!event.currentTarget.files) {
                        return;
                      }
                      setAddCost({
                        ...addCost,
                        image: URL.createObjectURL(
                          event.currentTarget.files[0]
                        ),
                      });
                      handleChangeCost(event.currentTarget.files[0], "image");
                    }}
                  />
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-1">
                    <p>Cost Description</p>
                    <InputLightBlue
                      type="text"
                      onChange={(event) =>
                        setAddCost({
                          ...addCost,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Price</p>
                    <InputLightBlue
                      type="number"
                      onChange={(event) =>
                        setAddCost({
                          ...addCost,
                          price: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-1">
                    <p>Interval Payment</p>
                    <div>
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-default bg-@light-blue h-16 pl-3 text-left focus:outline-none text-lg text-@dark ">
                            <span className="block truncate">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <TbArrowsMoveVertical
                                className="h-7 w-7 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition-all duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 w-full overflow-auto bg-white py-1 ring-1 ring-black ring-opacity-5 focus:outline-none text-lg">
                              {interval.map((interval, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-3 pl-10 flex items-center pr-4 ${
                                      active
                                        ? "bg-@light-blue text-@orange"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={interval}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {interval.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-@orange">
                                          <TbCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end">
                <ButtonSubmit
                  label="Add Cost"
                  onClick={() => handleAddCost()}
                />
              </div>
            </div>
            <div className="bg-gray-200 p-7 md:p-20">
              <div>
                <div className="pb-10 text-center">
                  <h1 className="text-lg font-bold">ONETIME PAYMENT</h1>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-7 2xl:gap-10">
                  {Array.isArray(schoolData.payments?.onetime) ? (
                    schoolData.payments?.onetime.map((e: CostDataType) => (
                      <div className="flex flex-col gap-5">
                        <CardCost
                          image={`https://storage.googleapis.com/prj1ropel/${e.image}`}
                          title={e.description}
                          price={e.price}
                        />
                        <div className="flex flex-col gap-5 bg-gray-200">
                          <ButtonSubmit
                            label="Edit"
                            onClick={() => {
                              setIdCost(e.id);
                              setIsOpenPayment(true);
                            }}
                          />
                          <ButtonCancelDelete
                            label="Delete"
                            onClick={() => handleDeleteCost(e.id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No one time Cost data available</p>
                  )}
                </div>
              </div>
              <div>
                <div className="pb-10 pt-16 text-center">
                  <h1 className="text-lg font-bold">INTERVAL PAYMENT</h1>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-7 2xl:gap-10">
                  {Array.isArray(schoolData.payments?.interval) ? (
                    schoolData.payments?.interval.map((e: CostDataType) => (
                      <div className="flex flex-col gap-5">
                        <CardCost
                          image={`https://storage.googleapis.com/prj1ropel/${e.image}`}
                          title={e.interval}
                          price={e.price}
                        />
                        <div className="flex flex-col gap-5 bg-gray-200">
                          <ButtonSubmit
                            label="Edit"
                            onClick={() => {
                              setIdCost(e.id);
                              setisOpenIntervalPayment(true);
                            }}
                          />
                          <ButtonCancelDelete
                            label="Delete"
                            onClick={() => handleDeleteCost(e.id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Interval time Cost data available</p>
                  )}
                </div>
              </div>
            </div>
            {/* Section 6 FAQ*/}
            <div className="pt-7 sm:pt-20 px-7 sm:px-20">
              <div className="flex flex-col gap-10">
                <h1 className="text-lg font-semibold text-center">FAQ</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 lg:gap-10 xl:gap-20">
                  <div className="flex flex-col xl:col-span-2 gap-1">
                    <p>Question</p>
                    <InputLightBlue
                      type="text"
                      onChange={(event) =>
                        setFaq({ ...faq, question: event.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col xl:col-span-2 gap-1">
                    <p>Answer</p>
                    <InputLightBlue
                      type="text"
                      onChange={(event) =>
                        setFaq({ ...faq, answer: event.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <ButtonSubmit
                      label="Add Question"
                      onClick={() => handleSubmitFAQ()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid pb-7 sm:pb-20 px-7 sm:px-20">
              {schoolData.faqs?.map((e) => (
                <AccordionFAQ
                  question={e.question}
                  answer={e.answer}
                  onClick1={() => handleDeleteFAQ(e.id)}
                  onClick2={() => {
                    setIdFAQ(e.id);
                    setIsOpenFAQ(true);
                  }}
                />
              ))}
            </div>
            {/* Section 7 */}
            <div className="bg-gray-200 py-7 sm:py-20  px-7 sm:px-20 ">
              <h1 className="text-lg font-semibold text-center">ADD QUIZ</h1>
              <div className="flex flex-col gap-1">
                <p>Question</p>
                <InputWhite
                  type="text"
                  onChange={(event) =>
                    setAddQuiz({ ...addQuiz, question: event.target.value })
                  }
                />
              </div>
              <div className="grid md:grid-cols-2 mt-10 gap-7 s:gap-x-20 gap-y-5">
                <div className="flex flex-col gap-1">
                  <p>Option 1</p>
                  <InputWhite
                    type="text"
                    onChange={(event) =>
                      setAddQuiz({ ...addQuiz, option1: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 2</p>
                  <InputWhite
                    type="text"
                    onChange={(event) =>
                      setAddQuiz({ ...addQuiz, option2: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 3</p>
                  <InputWhite
                    type="text"
                    onChange={(event) =>
                      setAddQuiz({ ...addQuiz, option3: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 4</p>
                  <InputWhite
                    type="text"
                    onChange={(event) =>
                      setAddQuiz({ ...addQuiz, option4: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-[20%] md:gap-[40%] lg:gap-[60%] xl:gap-[80%] place-content-beetween">
                <div className="flex flex-col gap-1 mt-5">
                  <p>Answer</p>
                  <InputWhite
                    type="number"
                    onChange={(event) =>
                      setAddQuiz({
                        ...addQuiz,
                        answer: Number(event.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 mt-5 justify-end">
                  <ButtonSubmit
                    label="Add"
                    onClick={(event) => handleAddQuiz(event)}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-12 md:gap-24 lg:gap-56 xl:gap-80 mt-10">
                <ButtonCancelDelete
                  label="Reset Data"
                  onClick={() => window.location.reload()}
                />
                <ButtonSubmit
                  label="View Quiz"
                  onClick={() =>
                    window.open(schoolData.quizLinkPreview, "_blank")
                  }
                />
                <ButtonSubmit
                  label="Submit"
                  onClick={() => setIsOpenDisclaimer(true)}
                />
              </div>
            </div>
            <div className="py-7 ms:py-20 px-7 sm:px-20">
              {quiz.map((e, index) => (
                <div>
                  <CardAddQuiz
                    question={e.question}
                    option1={e.option1}
                    option2={e.option2}
                    option3={e.option3}
                    option4={e.option4}
                    answer={e.answer}
                    onClick1={() => handleDeleteProperty(index)}
                    onClick2={() => openModalQuiz(e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <>
            {/* modal Add extraculliculer */}
            <Transition appear show={isOpenAddExtracurricular} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenAddExtracurricular}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Add Extraculliculer
                        </Dialog.Title>
                        <form>
                          <div className="mt-2 flex flex-col items-center justify-center">
                            <div className="w-full flex flex-col items-center justify-center">
                              <div className="w-full">
                                <img
                                  src={
                                    addExtracurricural.image
                                      ? URL.createObjectURL(
                                          addExtracurricural.image
                                        )
                                      : "/photo.png"
                                  }
                                  alt="user-avatar"
                                  className="w-full h-auto border-1 border-black "
                                />
                              </div>
                              <input
                                placeholder=""
                                id="upload-image"
                                type="file"
                                className="p-4"
                                onChange={(event) => {
                                  if (!event.currentTarget.files) {
                                    return;
                                  }
                                  setAddExtracurricular({
                                    ...addExtracurricural,
                                    image: URL.createObjectURL(
                                      event.currentTarget.files[0]
                                    ),
                                  });
                                  handleChangeExtracurricular(
                                    event.currentTarget.files[0],
                                    "image"
                                  );
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1 my-5 w-full">
                              <p>Title</p>
                              <InputLightBlue
                                type="text"
                                onChange={(event) =>
                                  setAddExtracurricular({
                                    ...addExtracurricural,
                                    title: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1 my-5 w-full">
                              <p>Description</p>
                              <TextAreaLightBlue
                                onChange={(event) =>
                                  setAddExtracurricular({
                                    ...addExtracurricural,
                                    description: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-5 justify-end">
                            <ButtonCancelDelete
                              label="Cancel"
                              onClick={(event) => {
                                event.preventDefault();
                                setIsOpenAddExtracurricular(false);
                              }}
                            />
                            <ButtonSubmit
                              label="Add"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault();
                                handleSubmitExtracurriculer();
                              }}
                            />
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Edit extraculliculer */}
            <Transition appear show={isOpenExtracurriculer} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenExtracurriculer}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Edit Extraculliculer
                        </Dialog.Title>
                        {Array.isArray(schoolData.extracurriculars) ? (
                          schoolData.extracurriculars?.map((e) => (
                            <div>
                              {e.id === idExtracurricular ? (
                                <div>
                                  <div className="mt-2 flex flex-col items-center justify-center">
                                    <div className="w-full">
                                      <img
                                        src={
                                          updateExtracurricular.image
                                            ? URL.createObjectURL(
                                                updateExtracurricular.image
                                              )
                                            : `https://storage.googleapis.com/prj1ropel/${e.image}`
                                        }
                                        alt="user-avatar"
                                        className="w-full h-auto border-1 border-black "
                                      />
                                    </div>
                                    <input
                                      placeholder=""
                                      id="upload-image"
                                      type="file"
                                      className="bg-@light-blue w-full p-5"
                                      onChange={(event) => {
                                        if (!event.currentTarget.files) {
                                          return;
                                        }
                                        setUpdateExtracurricular({
                                          ...updateExtracurricular,
                                          image: URL.createObjectURL(
                                            event.currentTarget.files[0]
                                          ),
                                        });
                                        handleChangeUpdateExtracurricular(
                                          event.currentTarget.files[0],
                                          "image"
                                        );
                                      }}
                                    />
                                    <div className="flex flex-col gap-1 my-5 w-full">
                                      <p>Title</p>
                                      <InputLightBlue
                                        type="text"
                                        defaultValue={e.name}
                                        onChange={(event) =>
                                          setUpdateExtracurricular({
                                            ...updateExtracurricular,
                                            name: event.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1 my-5 w-full">
                                      <p>Description</p>
                                      <TextAreaLightBlue
                                        defaultValue={e.description}
                                        onChange={(event) =>
                                          setUpdateExtracurricular({
                                            ...updateExtracurricular,
                                            description: event.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-4 flex space-x-5 justify-end">
                                    <ButtonCancelDelete
                                      label="Cancel"
                                      onClick={() =>
                                        setIsOpenExtracurriculer(false)
                                      }
                                    />
                                    <ButtonSubmit
                                      label="Update"
                                      onClick={() => {
                                        handleUpdateExtracurricular();
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Add Achievement */}
            <Transition appear show={isOpenAddAchievement} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenAddAchievement}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Add Achievement
                        </Dialog.Title>
                        <form>
                          <div className="mt-2 flex flex-col items-center justify-center">
                            <div className="w-full flex flex-col items-center justify-center">
                              <div className="w-full">
                                <img
                                  src={
                                    addAchievement.image
                                      ? URL.createObjectURL(
                                          addAchievement.image
                                        )
                                      : "/photo.png"
                                  }
                                  alt="Achievement-image"
                                  className="w-full h-auto border-1 border-black "
                                />
                              </div>
                              <input
                                placeholder=""
                                id="upload-image"
                                type="file"
                                className="p-4"
                                onChange={(event) => {
                                  if (!event.currentTarget.files) {
                                    return;
                                  }
                                  setAddAchievement({
                                    ...addAchievement,
                                    image: URL.createObjectURL(
                                      event.currentTarget.files[0]
                                    ),
                                  });
                                  handleChangeAchievement(
                                    event.currentTarget.files[0],
                                    "image"
                                  );
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1 my-5 w-full">
                              <p>Title</p>
                              <InputLightBlue
                                type="text"
                                onChange={(event) =>
                                  setAddAchievement({
                                    ...addAchievement,
                                    title: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1 my-5 w-full">
                              <p>Description</p>
                              <TextAreaLightBlue
                                onChange={(event) =>
                                  setAddAchievement({
                                    ...addAchievement,
                                    description: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-5 justify-end">
                            <ButtonCancelDelete
                              label="Cancel"
                              onClick={(event) => {
                                event.preventDefault();
                                setIsOpenAddAchievement(false);
                              }}
                            />
                            <ButtonSubmit
                              label="Add"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault();
                                handleAddAchievement();
                              }}
                            />
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Edit achievement */}
            <Transition appear show={isOpenAchievement} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenAchievement}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Edit Achievement
                        </Dialog.Title>
                        {Array.isArray(schoolData.achievements) ? (
                          schoolData.achievements?.map((e) => (
                            <div>
                              {e.id === idAchievement ? (
                                <div>
                                  <div className="mt-2 flex flex-col items-center justify-center">
                                    <div className="w-full">
                                      <img
                                        src={
                                          updateAchievement.image
                                            ? URL.createObjectURL(
                                                updateAchievement.image
                                              )
                                            : `https://storage.googleapis.com/prj1ropel/${e.image}`
                                        }
                                        alt="user-avatar"
                                        className="w-full h-auto border-1 border-black "
                                      />
                                    </div>
                                    <input
                                      placeholder=""
                                      id="upload-image"
                                      type="file"
                                      className="bg-@light-blue w-full p-5"
                                      onChange={(event) => {
                                        if (!event.currentTarget.files) {
                                          return;
                                        }
                                        setUpdateAchievement({
                                          ...updateAchievement,
                                          image: URL.createObjectURL(
                                            event.currentTarget.files[0]
                                          ),
                                        });
                                        handleChangeUpdateAchievement(
                                          event.currentTarget.files[0],
                                          "image"
                                        );
                                      }}
                                    />
                                    <div className="flex flex-col gap-1 my-5 w-full">
                                      <p>Title</p>
                                      <InputLightBlue
                                        type="text"
                                        defaultValue={e.name}
                                        onChange={(event) =>
                                          setUpdateAchievement({
                                            ...updateAchievement,
                                            name: event.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1 my-5 w-full">
                                      <p>Description</p>
                                      <TextAreaLightBlue
                                        defaultValue={e.description}
                                        onChange={(event) =>
                                          setUpdateAchievement({
                                            ...updateAchievement,
                                            description: event.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-4 flex space-x-5 justify-end">
                                    <ButtonCancelDelete
                                      label="Cancel"
                                      onClick={() =>
                                        setIsOpenAchievement(false)
                                      }
                                    />
                                    <ButtonSubmit
                                      label="Update"
                                      onClick={() => {
                                        handleUpdateAchievement();
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Edit ontime payment */}
            <Transition appear show={isOpenPayment} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenPayment}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Edit One Time Cost
                        </Dialog.Title>
                        {Array.isArray(schoolData.payments?.onetime) ? (
                          schoolData.payments?.onetime.map((e) =>
                            e.id === idCost ? (
                              <div>
                                <div className="mt-2 flex flex-col items-center justify-center">
                                  <div className="w-full flex flex-col items-center justify-center">
                                    <div className="w-full">
                                      <img
                                        src={
                                          updateCost.image
                                            ? URL.createObjectURL(
                                                updateCost.image
                                              )
                                            : `https://storage.googleapis.com/prj1ropel/${e.image}`
                                        }
                                        alt="user-avatar"
                                        className="w-full h-auto border-1 border-black "
                                      />
                                      <input
                                        placeholder=""
                                        id="upload-image"
                                        type="file"
                                        className="bg-@light-blue w-full p-5"
                                        onChange={(event) => {
                                          if (!event.currentTarget.files) {
                                            return;
                                          }
                                          setUpdateCost({
                                            ...updateCost,
                                            image: URL.createObjectURL(
                                              event.currentTarget.files[0]
                                            ),
                                          });
                                          handleChangeUpdateCost(
                                            event.currentTarget.files[0],
                                            "image"
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Title</p>
                                    <InputLightBlue
                                      type="text"
                                      defaultValue={e.description}
                                      onChange={(event) =>
                                        setUpdateCost({
                                          ...updateCost,
                                          description: event.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Price</p>
                                    <InputLightBlue
                                      type="number"
                                      defaultValue={e.price}
                                      onChange={(event) =>
                                        setUpdateCost({
                                          ...updateCost,
                                          price: Number(event.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex space-x-5 justify-end">
                                  <ButtonCancelDelete
                                    label="Cancel"
                                    onClick={() => setIsOpenPayment(false)}
                                  />
                                  <ButtonSubmit
                                    label="Update"
                                    onClick={(event) => {
                                      handleUpdateCost(event);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Edit interval payment */}
            <Transition appear show={isOpenIntervalPayment} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => !isOpenIntervalPayment}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Edit Interval Time Cost
                        </Dialog.Title>
                        {Array.isArray(schoolData.payments?.interval) ? (
                          schoolData.payments?.interval.map((e) =>
                            e.id === idCost ? (
                              <div>
                                <div className="mt-2 flex flex-col items-center justify-center">
                                  <div className="w-full flex flex-col items-center justify-center">
                                    <div className="w-full">
                                      <img
                                        src={
                                          updateCost.image
                                            ? URL.createObjectURL(
                                                updateCost.image
                                              )
                                            : `https://storage.googleapis.com/prj1ropel/${e.image}`
                                        }
                                        alt="user-avatar"
                                        className="w-full h-auto border-1 border-black "
                                      />
                                      <input
                                        placeholder=""
                                        id="upload-image"
                                        type="file"
                                        className="bg-@light-blue w-full p-5"
                                        onChange={(event) => {
                                          if (!event.currentTarget.files) {
                                            return;
                                          }
                                          setUpdateCost({
                                            ...updateCost,
                                            image: URL.createObjectURL(
                                              event.currentTarget.files[0]
                                            ),
                                          });
                                          handleChangeUpdateCost(
                                            event.currentTarget.files[0],
                                            "image"
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Title</p>
                                    <InputLightBlue
                                      type="text"
                                      defaultValue={e.description}
                                      onChange={(event) =>
                                        setUpdateCost({
                                          ...updateCost,
                                          description: event.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Price</p>
                                    <InputLightBlue
                                      type="number"
                                      defaultValue={e.price}
                                      onChange={(event) =>
                                        setUpdateCost({
                                          ...updateCost,
                                          price: Number(event.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex space-x-5 justify-end">
                                  <ButtonCancelDelete
                                    label="Cancel"
                                    onClick={() =>
                                      setisOpenIntervalPayment(false)
                                    }
                                  />
                                  <ButtonSubmit
                                    label="Update"
                                    onClick={(event) => {
                                      handleUpdateCost(event);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal FAQ */}
            <Transition appear show={isOpenFAQ} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40"
                onClose={() => !isOpenFAQ}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Update FAQ
                        </Dialog.Title>
                        {schoolData.faqs?.map((e) => (
                          <div>
                            {e.id === idFAQ ? (
                              <>
                                <div className="mt-2 flex flex-col items-center justify-center">
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Question</p>
                                    <InputLightBlue
                                      type="text"
                                      defaultValue={e.question}
                                      onChange={(event) =>
                                        setUpdateFAQ({
                                          ...updateFAQ,
                                          question: event.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 my-5 w-full">
                                    <p>Answer</p>
                                    <TextAreaLightBlue
                                      defaultValue={e.answer}
                                      onChange={(event) =>
                                        setUpdateFAQ({
                                          ...updateFAQ,
                                          answer: event.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex space-x-5 justify-end">
                                  <ButtonCancelDelete
                                    label="Cancel"
                                    onClick={() => setIsOpenFAQ(false)}
                                  />
                                  <ButtonSubmit
                                    label="Update"
                                    onClick={() => {
                                      handleUpdateFAQ();
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal Quiz */}
            <Transition appear show={isOpenQuiz} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40"
                onClose={() => closeModalQuiz()}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Update FAQ
                        </Dialog.Title>
                        <div className="bg-gray-200 py-20 px-20 ">
                          <h1 className="text-lg font-semibold text-center">
                            ADD QUIZ
                          </h1>
                          <div className="flex flex-col gap-1">
                            <p>Question</p>
                            <InputWhite
                              type="text"
                              defaultValue={updatedQuestion}
                              onChange={(e) =>
                                setUpdatedQuestion(e.target.value)
                              }
                            />
                          </div>
                          <div className="grid grid-cols-2 mt-10 gap-x-20 gap-y-5">
                            <div className="flex flex-col gap-1">
                              <p>Option 1</p>
                              <InputWhite
                                type="text"
                                defaultValue={updatedOption1}
                                onChange={(e) =>
                                  setUpdatedOption1(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>Option 2</p>
                              <InputWhite
                                type="text"
                                defaultValue={updatedOption2}
                                onChange={(e) =>
                                  setUpdatedOption2(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>Option 3</p>
                              <InputWhite
                                type="text"
                                defaultValue={updatedOption3}
                                onChange={(e) =>
                                  setUpdatedOption3(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>Option 4</p>
                              <InputWhite
                                type="text"
                                defaultValue={updatedOption4}
                                onChange={(e) =>
                                  setUpdatedOption4(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col w-[30%] gap-1 mt-5">
                              <p>Answer</p>
                              <InputWhite
                                type="number"
                                defaultValue={updatedAnswer}
                                onChange={(e) =>
                                  setUpdatedAnswer(Number(e.target.value))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-5 justify-end">
                          <ButtonCancelDelete
                            label="Cancel"
                            onClick={() => setIsOpenQuiz(false)}
                          />
                          <ButtonSubmit
                            label="Update"
                            onClick={() => {
                              handleSaveUpdateQuiz();
                            }}
                          />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            {/* modal DisClaimer Quiz */}
            <Transition appear show={isOpenDisclaimer} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40"
                onClose={() => !isOpenDisclaimer}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                        >
                          Disclaimer !!
                        </Dialog.Title>
                        <div className="bg-gray-200 py-20 px-20 ">
                          <div className="flex text-center">
                            <p className="text-lg font-bold">
                              Double-check all your data, make sure there's
                              nothing wrong... if you click submit, your data
                              can't be changed anymore
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-5 justify-end">
                          <ButtonCancelDelete
                            label="Cancel"
                            onClick={() => setIsOpenDisclaimer(false)}
                          />
                          <ButtonSubmit
                            label="Submit"
                            onClick={() => {
                              FinalAddQuiz();
                              setIsOpenDisclaimer(false);
                            }}
                          />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          <>
            <>
              {/* modal view pdf */}
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => !isOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>
                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-white pb-5 px-16 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                          >
                            View Brochure
                          </Dialog.Title>
                          <div className="h-[700px]">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={`data:application/pdf;base64,${schoolData.pdf}`}
                                plugins={[defaultLayoutPluginInstance]}
                                renderLoader={(percentages: number) => (
                                  <div>
                                    <ProgressBar
                                      progress={Math.round(percentages)}
                                    />
                                  </div>
                                )}
                              />
                            </Worker>
                          </div>
                          <div className="mt-16">
                            <ButtonCancelDelete
                              label="close"
                              onClick={() => setIsOpen(false)}
                            />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          </>
        </LayoutAdmin>
      ) : (
        <>
          <NavbarIndexAdmin />
          <VideoBackground videoSrc="/video.mp4">
            <div className="relative z-30 md:p-20 text-white  flex flex-col gap-5">
              <h1 className="text-3xl md:text-5xl font-bold">EducationHub</h1>
              <p className="text-xl font-medium">
                Web platform for school review and education community
              </p>
              <div className="h-1 bg-@dark animate-pulse"></div>
            </div>
          </VideoBackground>
          <div className=" md:h-96 p-24  md:p-32 text-@dark flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl text-center">
              You don't have a registered school
            </h1>
            <div className="mt-16">
              <ButtonSubmit
                label="Add School"
                onClick={() => navigate("/admin/add-school")}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Admin;
