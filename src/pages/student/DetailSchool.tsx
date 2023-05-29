/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Layout } from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { CardCost } from "../../components/Card";
import { Transition, Dialog } from "@headlessui/react";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { AccordionFAQStudent } from "../../components/AccordionStudent";
import { TbWorldWww, TbMapPin } from "react-icons/tb";
import { InputLightBlue } from "../../components/Input";
import Swal from "sweetalert2";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { ProgressBar } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

interface detailSchool {
  accreditation: string;
  detail: string;
  description: string;
  gmeet_date: string;
  gmeet: string;
  province: string;
  city: string;
  district: string;
  village: string;
  zipCode: string;
  video: string;
  pdf: string;
  web: string;
  quizLinkPub: string;
  quizLinkPreview: string;
  achievements: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
  extracurriculars: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
  faqs: { id: number; question: string; answer: string }[];
  WaLink: string;
  image: string;
  name: string;
  reviews: { image: string; review: string }[];
  payments: {
    onetime: {
      id: number;
      image: string;
      description: string;
      price: number;
    }[];
    interval: {
      id: number;
      image: string;
      description: string;
      price: number;
      interval: string;
    }[];
  };
  staff: number;
  students: number;
  teachers: number;
}

interface AddReviewType {
  school_id: number;
  review: string;
}

const DetailSchool: FC = () => {
  const [data, setData] = useState<detailSchool>({
    accreditation: "",
    detail: "",
    description: "",
    gmeet_date: "",
    gmeet: "",
    province: "",
    city: "",
    district: "",
    village: "",
    zipCode: "",
    video: "",
    pdf: "",
    web: "",
    quizLinkPub: "",
    quizLinkPreview: "",
    achievements: [],
    extracurriculars: [],
    faqs: [],
    WaLink: "",
    image: "",
    name: "",
    reviews: [],
    payments: {
      onetime: [],
      interval: [],
    },
    staff: 0,
    students: 0,
    teachers: 0,
  });

  const [cookie] = useCookies(["tkn"]);
  const param = useParams();
  const { id } = param;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [addReview, setaddReview] = useState<AddReviewType>({
    school_id: Number(id),
    review: "",
  });

  const [src, setSrc] = useState<string | undefined>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);

  const openModalFAQ = () => {
    setIsOpenFAQ(true);
  };
  const closeModalFAQ = () => {
    setIsOpenFAQ(false);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/schools/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
        const new_string =
          data.video
            ?.split(/,|\/|=/)
            .pop()
            ?.trim() ?? "";
        setSrc(new_string);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  const AddReview = () => {
    axios
      .post(`https://go-event.online/reviews`, addReview, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Review Added",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            addReview.review = "";
          }
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

  return (
    <Layout>
      {/* Section 1 */}
      <div className="grid lg:grid-cols-2 p-7 sm:p-20 gap-10 md:gap-20 text-@dark">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl">{data.name}</h1>
          <p className="text-lg">{data.description}</p>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
            <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
              <h1 className="text-3xl font-bold">{data.students}</h1>
              <p>Students</p>
            </div>
            <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
              <h1 className="text-3xl font-bold">{data.teachers}</h1>
              <p>Teachers</p>
            </div>
            <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
              <h1 className="text-3xl font-bold">{data.staff}</h1>
              <p>Staff</p>
            </div>
            <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
              <h1 className="text-3xl font-bold">{data.accreditation}</h1>
              <p>Accreditation</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <TbWorldWww className="text-2xl" />
            <p className="text-lg">
              Find more about school, go to school Website:{" "}
              <span className="text-@orange hover:text-@blue">
                <Link to={data.web} target="_blank" rel="noopener noreferrer">
                  Click Here!
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative z-10 bg-[url('/sman3.jpg')] h-96 w-full bg-cover bg-center">
            <div className="relative z-20 bg-red-300 bg-gradient-to-b from-gray-400 to-black h-full opacity-60 "></div>
          </div>
          <div className="flex pl-10 py-7 bg-@light-blue items-center space-x-5">
            <TbMapPin className="text-3xl text-@blue" />
            <p className="text-lg font-semibold tracking-wider">
              {data.province}, {data.city}, {data.district}, {data.village}
            </p>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="bg-gray-200 grid lg:grid-cols-2 p-7 sm:p-20 gap-20 text-@dark text-lg">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Review</h1>
          <div className="grid grid-cols-3 gap-4 pb-20">
            <div className="col-span-2">
              <InputLightBlue
                type="text"
                placeholder="Add review"
                onChange={(event) =>
                  setaddReview({ ...addReview, review: event.target.value })
                }
              />
            </div>
            <ButtonSubmit label="Add" onClick={() => AddReview()} />
          </div>
          {data.reviews &&
            data.reviews.map((point) => (
              <div className="flex space-x-10 h-16">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${point.image}`}
                  alt="pp"
                  className="h-full w-auto"
                />
                <div className="flex items-center bg-@light-blue w-full px-10 h-full">
                  <p>{point.review}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-10">
          <iframe
            className="w-full h-96"
            src={`https://www.youtube.com/embed/${src}`}
            title="Introduction Video"
            allowFullScreen
          />
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-20">
            <Link to={`/student/registration-form/${id}`}>
              <ButtonSubmit label="Register" style={{ width: "100%" }} />
            </Link>
            <ButtonSubmit label="Brochure" onClick={() => setIsOpen(true)} />
            <ButtonSubmit label="FAQ" onClick={openModalFAQ} />
          </div>
        </div>
        <div className="flex space-x-10 h-44">
          <div className="p-8 grid grid-rows-2 grid-flow-col gap-2 bg-@light-blue w-full px-10 h-full">
            <p>join g-meet school introduction at {data.gmeet_date}</p>
            <div className="items-center">
              <Link to={data.gmeet} className="block">
                <ButtonSubmit label="Join" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className="bg-gray-200 p-7 sm:p-20 grid lg:grid-cols-2 gap-7 md:gap-12 lg:gap-20">
        <div className="flex flex-col gap-10">
          <div className="bg-@blue w-full px-10 h-20 uppercase justify-center items-center flex text-white">
            <p>extracurricular</p>
          </div>
          {data.extracurriculars &&
            data.extracurriculars.map((extracurricular) => (
              <div
                className="bg-@light-blue p-7 sm:p-10 flex flex-col gap-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
                key={extracurricular.id}
              >
                <div className="flex space-x-10">
                  <img
                    src={`https://storage.googleapis.com/prj1ropel/${extracurricular.image}`}
                    alt=""
                    className="h-32 w-auto"
                  />
                  <div className="w-full flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                      {extracurricular.name}
                    </h1>
                    <p className="text-lg">{extracurricular.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-@blue w-full px-10 h-20 uppercase justify-center items-center flex text-white">
            <p>ACHIEVEMENT</p>
          </div>
          {data.achievements &&
            data.achievements.map((achievements) => (
              <div
                className="bg-@light-blue   p-10 flex flex-col gap-10 hover:-translate-y-2 hover:drop-shadow-lg duration-500"
                key={achievements.id}
              >
                <div className="flex space-x-10">
                  <img
                    src={`https://storage.googleapis.com/prj1ropel/${achievements.image}`}
                    alt=""
                    className="h-32 w-auto"
                  />
                  <div className="w-full flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                      {achievements.name}
                    </h1>
                    <p className="text-lg">{achievements.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Section 4 */}
      <div className="bg-gray-200 p-20">
        <div className="justify-center">
          <div>
            <div className="pb-10 text-center">
              <h1 className="text-lg font-bold">ONETIME PAYMENT</h1>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-7 2xl:gap-10">
              {data.payments.onetime &&
                data.payments.onetime.map((payment) => (
                  <div className="flex flex-col gap-5" key={payment.id}>
                    <CardCost
                      image={`https://storage.googleapis.com/prj1ropel/${payment.image}`}
                      title={payment.description}
                      price={payment.price}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200"></div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="pb-10 pt-16 text-center">
              <h1 className="text-lg font-bold">INTERVAL PAYMENT</h1>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-7 2xl:gap-10">
              {data.payments.interval &&
                data.payments.interval.map((payment) => (
                  <div className="flex flex-col gap-5" key={payment.id}>
                    <CardCost
                      image={`https://storage.googleapis.com/prj1ropel/${payment.image}`}
                      title={payment.description}
                      price={payment.price}
                    />
                    <div className="flex flex-col gap-5 bg-gray-200"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <>
        {/* modal FAQ */}
        <Transition appear show={isOpenFAQ} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      FAQ
                    </Dialog.Title>
                    <div className="pb-10">
                      {data.faqs &&
                        data.faqs.map((faq) => (
                          <AccordionFAQStudent
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                          />
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-20">
                      <div className="col-span-2">
                        <div className="flex items-center bg-@light-blue w-full px-3 h-full">
                          <p>
                            Didn’t find answer? Let’s talk to our Costumer
                            Service
                          </p>
                        </div>
                      </div>
                      <Link to={data.WaLink}>
                        <ButtonSubmit label="Click Here" />
                      </Link>
                    </div>
                    <div className="mt-4 flex space-x-5 justify-end">
                      <ButtonCancelDelete
                        label="Close"
                        onClick={closeModalFAQ}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      {/* modal view pdf */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => !isOpen}>
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
                        fileUrl={`data:application/pdf;base64,${data.pdf}`}
                        plugins={[defaultLayoutPluginInstance]}
                        renderLoader={(percentages: number) => (
                          <div>
                            <ProgressBar progress={Math.round(percentages)} />
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
    </Layout>
  );
};

export default DetailSchool;
