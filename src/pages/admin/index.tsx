import { Fragment, FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { VideoBackground } from "../../components/videoBackground";
import { Navbar, NavbarIndex } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {
  TbWorldWww,
  TbMapPin,
  TbArrowsMoveVertical,
  TbCheck,
  TbArrowUp,
} from "react-icons/tb";
import { InputLightBlue, InputWhite } from "../../components/Input";
import { Listbox, Transition, Disclosure } from "@headlessui/react";
import { CardAddQuiz, CardCost } from "../../components/Card";
import { AccordionFAQ } from "../../components/Accordion";

const src = "https://www.youtube.com/embed/WrBQNImsV74";

const interval = [
  { interval: "Onetime Payment" },
  { interval: "Every 1 Month" },
  { interval: "Every 3 Month" },
  { interval: "Every 6 Month" },
];

const Admin: FC = () => {
  const [school, setSchool] = useState<boolean>(false);
  const [selected, setSelected] = useState(interval[0]);

  const navigate = useNavigate();

  useEffect(() => {
    setSchool(true);
  }, []);

  return (
    <>
      {school ? (
        <LayoutAdmin>
          <div>
            {/* Section 1 */}
            <div className="grid lg:grid-cols-2 p-20 gap-20 text-@dark">
              <div className="flex flex-col gap-10">
                <h1 className="text-5xl">SMAN 3 YOGYAKARTA</h1>
                <p className="text-lg">
                  SMA Negeri 3 Yogyakarta, better known to many as Padmanaba or
                  SMA 3 B, is one of the oldest senior high schools and high
                  schools located in Yogyakarta, the Province of the Special
                  Region of Yogyakarta, Indonesia.
                </p>
                <div className="grid grid-cols-4 gap-10">
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">112</h1>
                    <p>Students</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">70</h1>
                    <p>Teachers</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">21</h1>
                    <p>Staff</p>
                  </div>
                  <div className="bg-@light-blue text-center p-3 hover:text-white hover:bg-@blue duration-500 hover:-translate-y-2">
                    <h1 className="text-3xl font-bold">A</h1>
                    <p>Akreditasion</p>
                  </div>
                </div>
                <div className=" flex space-x-3">
                  <TbWorldWww className="text-2xl" />
                  <p className="text-lg">
                    School Website :
                    <span className="hover:text-@orange">
                      <Link to="https://sma3jogja.sch.id/">
                        https://sma3jogja.sch.id/
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
                  <p className="text-lg font-semibold">
                    Yogyakarta, D.I Yogyakarta
                  </p>
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
                  src={src}
                  title="Introduction Video"
                  allowFullScreen
                />
                <div className="flex flex-col">
                  <ButtonSubmit label="View Brochure" />
                </div>
              </div>
              <div className="flex space-x-10">
                <ButtonCancelDelete label="Delete School" />
                <ButtonSubmit label="Edit School" />
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
                    <ButtonSubmit label="Edit" />
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
                    <ButtonSubmit label="Edit" />
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
                    <ButtonSubmit label="Edit" />
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
                    <ButtonSubmit label="Edit" />
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
                  <CardCost
                    image={"/registration.png"}
                    title={"Her Registration"}
                    price={1000000}
                  />
                  <CardCost
                    image={"/school.png"}
                    title={"Building"}
                    price={2000000}
                  />
                  <CardCost
                    image={"books.png"}
                    title={"Books"}
                    price={2000000}
                  />
                </div>
              </div>
              <div>
                <div className="pb-10 pt-16 text-center">
                  <h1 className="text-lg font-bold">INTERVAL PAYMENT</h1>
                </div>
                <div className="grid grid-cols-5 gap-20">
                  <CardCost
                    image={"/spp.png"}
                    title={"SPP/1 Month"}
                    price={500000}
                  />
                  <CardCost
                    image={"/cleaning.png"}
                    title={"Cleaning/3 Month"}
                    price={100000}
                  />
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
                    <InputLightBlue type="text" />
                  </div>
                  <div className="flex flex-col col-span-2 gap-1">
                    <p>Question</p>
                    <InputLightBlue type="text" />
                  </div>
                  <div className="flex flex-col justify-end">
                    <ButtonSubmit label="Add Question" />
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="pb-20 px-20">
              <AccordionFAQ
                question={"Is the school accredited ?"}
                answer={
                  "Of course , school is accreditation, and the accreditation is A"
                }
              />
              <AccordionFAQ
                question={"Any public transportation near school ?"}
                answer={"Yes , is F34 school bus"}
              />
              <AccordionFAQ
                question={"Is the school fee expensive there ?"}
                answer={"Relative, but student will guarante beacome success"}
              />
            </div>
            {/* Section 7 */}
            <div className="bg-gray-200 py-20 px-20 ">
              <h1 className="text-lg font-semibold text-center">ADD QUIZ</h1>
              <div className="flex flex-col gap-1">
                <p>Question</p>
                <InputWhite type="text" />
              </div>
              <div className="grid grid-cols-2 mt-10 gap-x-20 gap-y-5">
                <div className="flex flex-col gap-1">
                  <p>Option 1</p>
                  <InputWhite type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 2</p>
                  <InputWhite type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 3</p>
                  <InputWhite type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Option 4</p>
                  <InputWhite type="text" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-[10%] gap-1 mt-5">
                  <p>Answer</p>
                  <InputWhite type="number" />
                </div>
                <div className="flex flex-col w-[10%] gap-1 mt-5 justify-end">
                  <ButtonSubmit label="Add" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-96 mt-10">
                <ButtonCancelDelete label="Reset Data" />
                <ButtonSubmit label="View Quiz" />
                <ButtonSubmit label="Submit" />
              </div>
            </div>
            <div className="py-20 px-20">
              <CardAddQuiz
                question={"Sebutkan Ibu Kota Indonesia"}
                option1={"Surabaya"}
                option2={"Semarang"}
                option3={"D.I. Yogyakarta"}
                option4={"DKI Jakarta"}
                answer={4}
              />
              <CardAddQuiz
                question={"Apa kepanjangan dari DKI"}
                option1={"Daerah Khusus Indah"}
                option2={"Daerah Khusus Indonesia"}
                option3={"Dengan Khusus Ibu Kota"}
                option4={"Daerah Khusus Ibu"}
                answer={3}
              />
            </div>
          </div>
        </LayoutAdmin>
      ) : (
        <>
          <NavbarIndex />
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
