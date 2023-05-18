import { Fragment, FC, useEffect, useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { VideoBackground } from "../../components/videoBackground";
import { NavbarIndexAdmin } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {
  TbWorldWww,
  TbMapPin,
  TbArrowsMoveVertical,
  TbCheck,
} from "react-icons/tb";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import {
  InputLightBlue,
  InputWhite,
  TextAreaLightBlue,
} from "../../components/Input";
import { CardAddQuiz, CardCost } from "../../components/Card";
import { AccordionFAQ } from "../../components/Accordion";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

// const src = "https://www.youtube.com/embed/WrBQNImsV74";

const interval = [
  { interval: "Onetime Payment" },
  { interval: "Every 1 Month" },
  { interval: "Every 3 Month" },
  { interval: "Every 6 Month" },
];

// interface CostDataType {
//   id: number;
//   image: any;
//   description: string;
//   price: number;
//   interval: string;
// }

interface FAQDataType {
  school_id: number;
  question: string;
  answer: string;
}

interface QuizDataType {
  school_id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
}

interface SchoolDataType {
  accreditation: string;
  achievement: string | null; // belum ketahuan data aslinya jika ditambahkan
  city: string;
  description: string;
  detail: string;
  district: string;
  extracurriculars: string | null; // belum ketahuan data aslinya jika ditambahkan
  gmeet: string;
  id: number;
  image: any;
  name: string;
  npsn: string;
  payment: {
    interval: string | null; // belum ketahuan data aslinya jika ditambahkan
    onetime: string | null; // belum ketahuan data aslinya jika ditambahkan
  };
  pdf: any;
  province: string;
  quizLinkPreview: string;
  quizLinkPub: string;
  reviews: string | null; // belum ketahuan data aslinya jika ditambahkan
  staff: string;
  students: string;
  teachers: string;
  video: string;
  village: string;
  web: string;
  zipcode: string;
}

const Admin: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<Partial<SchoolDataType>>({});
  const [selected, setSelected] = useState(interval[0]);
  const [isOpenExtracurriculer, setIsOpenExtracurriculer] = useState(false);
  const [isOpenAchievement, setIsOpenAchievement] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);
  const [isOpenDisclaimer, setIsOpenDisclaimer] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [schoolId, setSchoolId] = useState<number>();
  // const [cost, setCost] = useState<CostDataType>({});
  const [faq, setFaq] = useState<Partial<FAQDataType>>({
    school_id: 1,
  });
  // const [datasFAQ, setDatasFAQ] = useState<FAQDataType[]>([]);
  // const [idFAQ, setIdFAQ] = useState<number>();
  const [updateFAQ, setUpdateFAQ] = useState<Partial<FAQDataType>>({});
  const [selectedItem, setSelectedItem] = useState<QuizDataType>({
    school_id: schoolId,
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: 0,
  });
  const [updatedQuestion, setUpdatedQuestion] = useState<string>("");
  const [updatedOption1, setUpdatedOption1] = useState<string>("");
  const [updatedOption2, setUpdatedOption2] = useState<string>("");
  const [updatedOption3, setUpdatedOption3] = useState<string>("");
  const [updatedOption4, setUpdatedOption4] = useState<string>("");
  const [updatedAnswer, setUpdatedAnswer] = useState<number>();
  const [quiz, setQuiz] = useState<QuizDataType[]>([]);
  const [addQuiz, setAddQuiz] = useState<QuizDataType>({
    school_id: 1,
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: 0,
  });

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    axios
      .get(`https://go-event.online/admin/school`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setSchoolData(data);
        setSchoolId(data.id);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  };

  console.log(schoolId);

  // Cost Handle

  // FAQ Handle

  const handleSubmitFAQ = () => {
    console.log(faq);
    axios
      .post(`https://go-event.online/faqs`, faq, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        console.log(response);
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
      });
  };

  const handleUpdateFAQ = () => {
    axios
      .put(`https://go-event.online/`, updateFAQ, {
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
      .finally(() => fetchAllData());
  };

  // const handleDeleteFAQ = (id: number) => {
  //   Swal.fire({
  //     title: "Are you sure want to delete FAQ?",
  //     text: "This process cannot be undone!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#0BBBCC",
  //     cancelButtonColor: "#E4572E",
  //     confirmButtonText: "Delete",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .delete(`https://go-event.online/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${cookie.tkn}`,
  //           },
  //         })
  //         .then((response) => {
  //           const { message } = response.data;
  //           Swal.fire({
  //             icon: "success",
  //             title: "Success Delete FAQ",
  //             text: message,
  //             showCancelButton: false,
  //           });
  //         })
  //         .catch((error) => {
  //           const { message } = error.response.data;
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error",
  //             text: message,
  //             showCancelButton: false,
  //           });
  //         })
  //         .finally(() => fetchAllData());
  //     }
  //   });
  // };

  // quiz handle

  const handleAddQuiz = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuiz(quiz.concat(addQuiz));
  };

  const openModalQuiz = (e: QuizDataType) => {
    setSelectedItem(e);
    setUpdatedQuestion(e.question);
    setUpdatedOption1(e.option1);
    setUpdatedOption2(e.option2);
    setUpdatedOption3(e.option3);
    setUpdatedOption4(e.option4);
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
    console.log(quiz);
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

  console.log(quiz);
  return (
    <>
      {schoolData ? (
        <LayoutAdmin>
          <div>
            {/* Section 1 */}
            <div className="grid lg:grid-cols-2 p-20 gap-20 text-@dark">
              <div className="flex flex-col gap-10">
                <h1 className="text-5xl">{schoolData.name?.toUpperCase()}</h1>
                <p className="text-lg">{schoolData.description}</p>
                <div className="grid grid-cols-4 gap-10">
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
              </div>
              <div className="flex flex-col">
                <div
                  className={`relative z-10 bg-[url('/sman3.jpg')] h-96 w-full bg-cover bg-center`}
                >
                  <div className="relative z-20 bg-red-300 bg-gradient-to-b from-gray-400 to-black h-full opacity-60 "></div>
                </div>
                <div className="flex pl-10 py-7 bg-@light-blue items-center space-x-5">
                  <TbMapPin className="text-3xl text-@blue" />
                  <p className="text-lg font-semibold">{schoolData.city}</p>
                </div>
              </div>
            </div>
            {/* Section 2 */}
            <div className="bg-gray-200 grid grid-cols-2 p-20 gap-20 text-@dark text-lg">
              <div className="flex flex-col gap-10">
                <h1 className="text-2xl font-bold">Review</h1>
                <div className="flex space-x-10 h-16">
                  <img src="/org1.png" alt="" className="h- w-auto" />
                  <div className=" flex items-center bg-@light-blue w-full px-10 h-full">
                    <p>The school is good, the admin is also friendly</p>
                  </div>
                </div>
                <div className="flex space-x-10 h-16">
                  <img src="/org1.png" alt="" className="h- w-auto" />
                  <div className=" flex items-center bg-@light-blue w-full px-10 h-full">
                    <p>The yard is nice, the school is clean</p>
                  </div>
                </div>
                <div className="flex space-x-10 h-16">
                  <img src="/org1.png" alt="" className="h- w-auto" />
                  <div className=" flex items-center bg-@light-blue w-full px-10 h-full">
                    <p>I don't regret sending my child to this school</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                {/* <video controls width="100%">
                  <source src={src} type="video/mp4" />
                  Sorry, your browser doesn't support videos.
                </video> */}
                <iframe
                  className="w-full h-96"
                  src={schoolData.video}
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
              <div className="flex space-x-10">
                <ButtonCancelDelete label="Delete School" />
                <ButtonSubmit
                  label="Edit School"
                  onClick={() =>
                    navigate(`/admin/edit-school/${schoolData.id}`)
                  }
                />
              </div>
            </div>
            {/* Section 3 */}
            <div className="grid grid-cols-2 p-20 gap-20">
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-1">
                  <p>Start Time</p>
                  <InputLightBlue type="datetime-local" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>End Time</p>
                  <InputLightBlue type="datetime-local" />
                </div>
              </div>
              <div className="flex items-end justify-end">
                <ButtonSubmit label="CREATE G-MEET" />
              </div>
            </div>
            {/* Section 4 */}
            <div className="bg-gray-200 p-20 grid grid-cols-2 gap-20">
              <div className="flex flex-col gap-10">
                <ButtonSubmit label="ADD EXTRACULLICULER" />
                <div className="bg-@light-blue p-10 flex flex-col gap-10">
                  <div className="flex  space-x-10">
                    <img src="/scout.webp" alt="" className="h-32 w-auto" />
                    <div className="w-full flex flex-col gap-4">
                      <h1 className="text-2xl font-semibold">Scout</h1>
                      <p className="text-lg">
                        The Scout is a non-formal educational organization that
                        organizes scouting education in Indonesia. The word
                        Scout is an abbreviation of Praja Muda Karana which
                        means Young People who Like to Work.
                      </p>
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 gap-44">
                    <ButtonCancelDelete label="Delete" />
                    <ButtonSubmit
                      label="Edit"
                      onClick={() => setIsOpenExtracurriculer(true)}
                    />
                  </div>
                </div>
                <div className="bg-@light-blue p-10 flex flex-col gap-10">
                  <div className="flex  space-x-10">
                    <img src="/scout.webp" alt="" className="h-32 w-auto" />
                    <div className="w-full flex flex-col gap-4">
                      <h1 className="text-2xl font-semibold">Scout</h1>
                      <p className="text-lg">
                        The Scout is a non-formal educational organization that
                        organizes scouting education in Indonesia. The word
                        Scout is an abbreviation of Praja Muda Karana which
                        means Young People who Like to Work.
                      </p>
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 gap-44">
                    <ButtonCancelDelete label="Delete" />
                    <ButtonSubmit
                      label="Edit"
                      onClick={() => setIsOpenExtracurriculer(true)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <ButtonSubmit label="ADD ACHIEVEMENT" />
                <div className="bg-@light-blue p-10 flex flex-col gap-10">
                  <div className="flex  space-x-10">
                    <img src="/math.png" alt="" className="h-32 w-auto" />
                    <div className="w-full flex flex-col gap-4">
                      <h1 className="text-2xl font-semibold">
                        1’st Matematic Olympiade{" "}
                      </h1>
                      <p className="text-lg">
                        The material tested or contested in the Mathematics
                        Olympiad consists of several branches of mathematics,
                        including; number theory, algebra, geometry and
                        combinatorics.
                      </p>
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 gap-44">
                    <ButtonCancelDelete label="Delete" />
                    <ButtonSubmit
                      label="Edit"
                      onClick={() => setIsOpenAchievement(true)}
                    />
                  </div>
                </div>
                <div className="bg-@light-blue p-10 h-96 flex flex-col gap-10">
                  <div className="flex  space-x-10">
                    <img src="/math.png" alt="" className="h-32 w-auto" />
                    <div className="w-full flex flex-col gap-4">
                      <h1 className="text-2xl font-semibold">
                        1’st Matematic Olympiade{" "}
                      </h1>
                      <p className="text-lg">
                        The material tested or contested in the Mathematics
                        Olympiad consists of several branches of mathematics,
                        including; number theory, algebra, geometry and
                        combinatorics.
                      </p>
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 gap-44">
                    <ButtonCancelDelete label="Delete" />
                    <ButtonSubmit
                      label="Edit"
                      onClick={() => setIsOpenAchievement(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Secton 5 */}
            <div className="p-20 flex flex-col gap-10">
              <div className="grid grid-cols-3 gap-20">
                <div className="bg-@light-blue">
                  <div className=" p-10">
                    <img src="/school.png" alt="" />
                  </div>
                  <div className="bg-cyan-100 p-5">
                    <p>Choose File</p>
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-1">
                    <p>Cost Description</p>
                    <InputLightBlue type="text" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Price</p>
                    <InputLightBlue type="number" />
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
                              {selected.interval}
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
                                        {interval.interval}
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
              <div className="flex justify-end">
                <ButtonSubmit label="Add Cost" />
              </div>
            </div>
            <div className="bg-gray-200 p-20">
              <div>
                <div className="pb-10 text-center">
                  <h1 className="text-lg font-bold">ONETIME PAYMENT</h1>
                </div>
                <div className="grid grid-cols-5 gap-20">
                  <div className="flex flex-col gap-5">
                    <CardCost
                      image={"/registration.png"}
                      title={"Her Registration"}
                      price={1000000}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200">
                      <ButtonSubmit
                        label="Edit"
                        onClick={() => setIsOpenPayment(true)}
                      />
                      <ButtonCancelDelete label="Delete" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <CardCost
                      image={"/school.png"}
                      title={"Building"}
                      price={2000000}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200">
                      <ButtonSubmit
                        label="Edit"
                        onClick={() => setIsOpenPayment(true)}
                      />
                      <ButtonCancelDelete label="Delete" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <CardCost
                      image={"books.png"}
                      title={"Books"}
                      price={2000000}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200">
                      <ButtonSubmit
                        label="Edit"
                        onClick={() => setIsOpenPayment(true)}
                      />
                      <ButtonCancelDelete label="Delete" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="pb-10 pt-16 text-center">
                  <h1 className="text-lg font-bold">INTERVAL PAYMENT</h1>
                </div>
                <div className="grid grid-cols-5 gap-20">
                  <div className="flex flex-col gap-5">
                    <CardCost
                      image={"/spp.png"}
                      title={"SPP/1 Month"}
                      price={500000}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200">
                      <ButtonSubmit
                        label="Edit"
                        onClick={() => setIsOpenPayment(true)}
                      />
                      <ButtonCancelDelete label="Delete" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <CardCost
                      image={"/cleaning.png"}
                      title={"Cleaning/3 Month"}
                      price={100000}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200">
                      <ButtonSubmit
                        label="Edit"
                        onClick={() => setIsOpenPayment(true)}
                      />
                      <ButtonCancelDelete label="Delete" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 6 */}
            <div className="pt-20 px-20">
              <div className="flex flex-col gap-10">
                <h1 className="text-lg font-semibold text-center">FAQ</h1>
                <div className="grid grid-cols-5 gap-20">
                  <div className="flex flex-col col-span-2 gap-1">
                    <p>Question</p>
                    <InputLightBlue
                      type="text"
                      onChange={(event) =>
                        setFaq({ ...faq, question: event.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col col-span-2 gap-1">
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
            <div className="pb-20 px-20">
              {/* {datasFAQ.map((e) => (
                <AccordionFAQ
                  question={e.question}
                  answer={e.answer}
                  onClick1={() => handleDeleteFAQ(e.id)}
                  onClick2={() => {
                    setIdFAQ(e.id);
                    setIsOpenFAQ(true);
                  }}
                />
              ))} */}
              <AccordionFAQ
                question={"Is the school accredited ?"}
                answer={
                  "Of course , school is accreditation, and the accreditation is A"
                }
                onClick1={() => setIsOpenFAQ(false)}
                onClick2={() => setIsOpenFAQ(true)}
              />
              <AccordionFAQ
                question={"Any public transportation near school ?"}
                answer={"Yes , is F34 school bus"}
                onClick1={() => setIsOpenFAQ(false)}
                onClick2={() => setIsOpenFAQ(true)}
              />
              <AccordionFAQ
                question={"Is the school fee expensive there ?"}
                answer={"Relative, but student will guarante beacome success"}
                onClick1={() => setIsOpenFAQ(false)}
                onClick2={() => setIsOpenFAQ(true)}
              />
            </div>
            {/* Section 7 */}
            <div className="bg-gray-200 py-20 px-20 ">
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
              <div className="grid grid-cols-2 mt-10 gap-x-20 gap-y-5">
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
              <div className="flex justify-between">
                <div className="flex flex-col w-[10%] gap-1 mt-5">
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
                <div className="flex flex-col w-[10%] gap-1 mt-5 justify-end">
                  <ButtonSubmit
                    label="Add"
                    onClick={(event) => handleAddQuiz(event)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-96 mt-10">
                <ButtonCancelDelete label="Reset Data" />
                <ButtonSubmit label="View Quiz" />
                <ButtonSubmit
                  label="Submit"
                  onClick={() => setIsOpenDisclaimer(true)}
                />
              </div>
            </div>
            <div className="py-20 px-20">
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
            {/* modal extraculliculer */}
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
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <div className="w-full flex flex-col items-center justify-center">
                            {image ? (
                              <div>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Selected"
                                  className="h-auto w-96"
                                />
                              </div>
                            ) : (
                              <div>
                                <img src="/sman3.jpg" alt="Default" />
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setImage(file);
                                }
                              }}
                              className="bg-@light-blue w-full p-5"
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Title</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"Scout"}
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Description</p>
                            <TextAreaLightBlue
                              defaultValue={
                                "The Scout is a non-formal educational organization that organizes scouting education in Indonesia. The word Scout is an abbreviation of Praja Muda Karana which means Young People who Like to Work."
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-5 justify-end">
                          <ButtonCancelDelete
                            label="Cancel"
                            onClick={() => setIsOpenExtracurriculer(false)}
                          />
                          <ButtonSubmit
                            label="Update"
                            onClick={() => {
                              alert("update");
                              setIsOpenExtracurriculer(false);
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
            {/* modal achievement */}
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
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <div className="w-full flex flex-col items-center justify-center">
                            {image ? (
                              <div>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Selected"
                                  className="h-auto w-96"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src="/math.png"
                                  alt="Default"
                                  className="h-auto w-52"
                                />
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setImage(file);
                                }
                              }}
                              className="bg-@light-blue w-full p-5"
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Title</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"1’st Matematic Olympiade"}
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Description</p>
                            <TextAreaLightBlue
                              defaultValue={
                                "The material tested or contested in the Mathematics Olympiad consists of several branches of mathematics, including; number theory, algebra, geometry and combinatorics."
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-5 justify-end">
                          <ButtonCancelDelete
                            label="Cancel"
                            onClick={() => setIsOpenAchievement(false)}
                          />
                          <ButtonSubmit
                            label="Update"
                            onClick={() => {
                              alert("update");
                              setIsOpenAchievement(false);
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
            {/* modal payment */}
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
                          Edit Achievement
                        </Dialog.Title>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <div className="w-full flex flex-col items-center justify-center">
                            {image ? (
                              <div>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Selected"
                                  className="h-auto w-96"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src="/spp.png"
                                  alt="Default"
                                  className="h-auto w-52"
                                />
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setImage(file);
                                }
                              }}
                              className="bg-@light-blue w-full p-5"
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Title</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"SPP/1 Month"}
                            />
                          </div>
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Price</p>
                            <InputLightBlue
                              type="number"
                              defaultValue={500000}
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
                            onClick={() => {
                              alert("update");
                              setIsOpenPayment(false);
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
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <div className="flex flex-col gap-1 my-5 w-full">
                            <p>Question</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"Is the school accredited ?"}
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
                              defaultValue={
                                "Of course , school is accreditation, and the accreditation is A"
                              }
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
                        <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold  leading-6 text-@dark text-center py-5"
                          >
                            View Brochure
                          </Dialog.Title>
                          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                            <Viewer fileUrl={"/sampel.pdf"} />
                          </Worker>
                          <ButtonCancelDelete
                            label="close"
                            onClick={() => setIsOpen(false)}
                          />
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
            <div className="relative z-30 p-20 text-white  flex flex-col gap-5">
              <h1 className="text-5xl font-bold">EducationHub</h1>
              <p className="text-xl font-medium">
                Web platform for school review and education community
              </p>
              <div className="h-1 bg-@dark animate-pulse"></div>
            </div>
          </VideoBackground>
          <div className="h-96 p-32 text-@dark flex flex-col items-center">
            <h1 className="text-5xl text-center">
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
