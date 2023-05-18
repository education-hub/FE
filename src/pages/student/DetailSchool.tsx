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

interface detailSchool {
  accreditation: string;
  address: string;
  description: string;
  event: {
    date: string;
    gmeet: string;
  };
  extracurriculars: [
    { name: string; img: string; description: string },
    { name: string; img: string; description: string }
  ];
  faq: {
    qa: [{ q: string; a: string }, { q: string; a: string }];
    wa: string;
  };
  image: string;
  name: string;
  prestations: [{ name: string; img: string; description: string }];
  reviews: [{ img: string; review: string }, { img: string; review: string }];
  school_fees: {
    books_fee: number;
    building_fee: number;
    m_fee: number;
    regis_fee: number;
  };
  staff: number;
  students: number;
  teachers: number;
}

const src = "https://man1gresik.sch.id/";
const srcVideo = "https://youtu.be/3Q0TeSKP20M";

const DetailSchool: FC = () => {
  const [data, setData] = useState<detailSchool>({
    accreditation: "",
    address: "",
    description: "",
    event: {
      date: "",
      gmeet: "",
    },
    extracurriculars: [
      { name: "", img: "", description: "" },
      { name: "", img: "", description: "" },
    ],
    faq: {
      qa: [
        { q: "", a: "" },
        { q: "", a: "" },
      ],
      wa: "",
    },
    image: "",
    name: "",
    prestations: [{ name: "", img: "", description: "" }],
    reviews: [
      { img: "", review: "" },
      { img: "", review: "" },
    ],
    school_fees: {
      books_fee: 0,
      building_fee: 0,
      m_fee: 0,
      regis_fee: 0,
    },
    staff: 0,
    students: 0,
    teachers: 0,
  });

  const [cookie] = useCookies(["tkn"]);
  const param = useParams();
  const { id } = param;

  const [, setIsOpen] = useState(false);
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
      .get(
        `https://virtserver.swaggerhub.com/EventPlanning/Education_Hub_Restful_API/1.0.0/schools/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.tkn}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  return (
    <Layout>
      {/* Section 1 */}
      <div className="grid lg:grid-cols-2 p-20 gap-20 text-@dark">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl">{data.name}</h1>
          <p className="text-lg">{data.description}</p>
          <div className="grid grid-cols-4 gap-10">
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
          <div className=" flex space-x-3">
            <TbWorldWww className="text-2xl" />
            <p className="text-lg">
              Find more about school, go to school Website:{" "}
              <span className="text-@orange hover:text-@blue">
                <Link to={src} target="_blank" rel="noopener noreferrer">
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
              {data.address}
            </p>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="bg-gray-200 grid grid-cols-2 p-20 gap-20 text-@dark text-lg">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Review</h1>
          <div className="grid grid-cols-3 gap-4 pb-20">
            <div className="col-span-2">
              <InputLightBlue type="text" placeholder="Add review" />
            </div>
            <ButtonSubmit label="Add" />
          </div>
          <div className="flex space-x-10 h-16">
            <img
              src={`https://storage.googleapis.com/prj1ropel/${data.reviews[0].img}`}
              alt=""
              className="h- w-auto"
            />
            <div className="flex items-center bg-@light-blue w-full px-10 h-full">
              <p>{data.reviews[0].review}</p>
            </div>
          </div>
          <div className="flex space-x-10 h-16">
            <img
              src={`https://storage.googleapis.com/prj1ropel/${data.reviews[1].img}`}
              alt=""
              className="h- w-auto"
            />
            <div className=" flex items-center bg-@light-blue w-full px-10 h-full">
              <p>{data.reviews[1].review}</p>
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
          <iframe
            className="w-full h-96"
            src={srcVideo}
            title="Introduction Video"
            allowFullScreen
          />
          <div className="grid grid-cols-3 gap-10">
            <ButtonSubmit label="Register" />
            <ButtonSubmit label="Brochure" />
            {/* {data.pdf} */}
            <ButtonSubmit label="FAQ" onClick={openModalFAQ} />
          </div>
        </div>
        <div className="flex space-x-10 h-44">
          <div className="p-8 grid grid-rows-2 grid-flow-col gap-2 bg-@light-blue w-full px-10 h-full">
            <p>join g-meet school introduction at {data.event.date}</p>
            <div className="items-center">
              <Link to={data.event.gmeet} className="block"></Link>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className="bg-white p-20 grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-10">
          <div className="bg-@blue w-full px-10 h-20 uppercase justify-center items-center flex text-white">
            <p>extracurricular</p>
          </div>
          <div className="flex space-x-10">
            <img
              src={`https://storage.googleapis.com/prj1ropel/${data.extracurriculars[0].img}`}
              alt=""
              className="h-32 w-auto"
            />
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">
                {data.extracurriculars[0].name}
              </h1>
              <p className="text-lg">{data.extracurriculars[0].description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-@blue w-full px-10 h-20 justify-center items-center flex text-white">
            <p>ACHIEVEMENT</p>
          </div>
          <div className="flex  space-x-10">
            <img
              src={`https://storage.googleapis.com/prj1ropel/${data.prestations[0].img}`}
              alt=""
              className="h-32 w-auto"
            />
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">
                {data.prestations[0].name}
              </h1>
              <p className="text-lg">{data.prestations[0].description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className="bg-gray-200 p-20">
        <div className="justify-center">
          <div>
            <div className="pb-10 text-center">
              <h1 className="text-lg font-bold">ONETIME PAYMENT</h1>
            </div>
            <div className="grid grid-cols-5 gap-20">
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/registration.png"}
                  title={"Registration"}
                  price={data.school_fees.regis_fee}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/school.png"}
                  title={"Building"}
                  price={data.school_fees.building_fee}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/books.png"}
                  title={"Books"}
                  price={data.school_fees.books_fee}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
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
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/cleaning.png"}
                  title={"Cleaning/3 Month"}
                  price={100000}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-lg">Indramayu, 15/05/2023</p>
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
                      <AccordionFAQStudent
                        question={data.faq.qa[0].q}
                        answer={data.faq.qa[0].a}
                      />
                      <AccordionFAQStudent
                        question={data.faq.qa[1].q}
                        answer={data.faq.qa[1].a}
                      />
                      <AccordionFAQStudent
                        question={"Is the school fee expensive there ?"}
                        answer={
                          "Relative, but student will guarante beacome success"
                        }
                      />
                      <div className="grid grid-cols-3 gap-4 pb-20">
                        <div className="col-span-2">
                          <div className="flex items-center bg-@light-blue w-full px-3 h-full">
                            <p>
                              Didn’t find answer? Let’s talk to our Costumer
                              Service
                            </p>
                          </div>
                        </div>
                        <Link to={data.faq.wa}>
                          <ButtonSubmit label="Click Here" />
                        </Link>
                      </div>
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
    </Layout>
  );
};

export default DetailSchool;
