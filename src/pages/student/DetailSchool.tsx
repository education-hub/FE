import { FC, useState, Fragment } from "react";

import { Layout } from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { CardCost } from "../../components/Card";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { TextAreaLightBlue } from "../../components/Input";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { AccordionFAQStudent } from "../../components/AccordionStudent";
import {
  TbWorldWww,
  TbMapPin,
  TbArrowsMoveVertical,
  TbCheck,
} from "react-icons/tb";
import { InputLightBlue } from "../../components/Input";

const src = "https://www.youtube.com/embed/WrBQNImsV74";

const DetailSchool: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navigate = useNavigate();

  return (
    <Layout>
      {/* Section 1 */}
      <div className="grid lg:grid-cols-2 p-20 gap-20 text-@dark">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl">SMAN 3 YOGYAKARTA</h1>
          <p className="text-lg">
            SMA Negeri 3 Yogyakarta, better known to many as Padmanaba or SMA 3
            B, is one of the oldest senior high schools and high schools located
            in Yogyakarta, the Province of the Special Region of Yogyakarta,
            Indonesia.
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
              Find more about school, go to school Website:{" "}
              <span className="text-@orange hover:text-@blue">
                <Link
                  to="https://sma3jogja.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            <p className="text-lg font-semibold">Yogyakarta, D.I Yogyakarta</p>
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
          <iframe
            className="w-full h-96"
            src={src}
            title="Introduction Video"
            allowFullScreen
          />
          <div className="grid grid-cols-3 gap-10">
            <ButtonSubmit label="Register" />
            <ButtonSubmit label="Brochure" />
            <ButtonSubmit label="FAQ" onClick={openModalFAQ} />
          </div>
        </div>
        <div className="flex space-x-10 h-44">
          <div className="p-8 grid grid-rows-2 grid-flow-col gap-2 bg-@light-blue w-full px-10 h-full">
            <p>join g-meet school introduction at Mon, 16-05-2023</p>
            <div className="items-center">
              <ButtonSubmit label="Join" />
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
            <img src="/scout.webp" alt="" className="h-32 w-auto" />
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Scout</h1>
              <p className="text-lg">
                The Scout is a non-formal educational organization that
                organizes scouting education in Indonesia. The word Scout is an
                abbreviation of Praja Muda Karana which means Young People who
                Like to Work.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-@blue w-full px-10 h-20 justify-center items-center flex text-white">
            <p>ACHIEVEMENT</p>
          </div>
          <div className="flex  space-x-10">
            <img src="/math.png" alt="" className="h-32 w-auto" />
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">
                1’st Matematic Olympiade{" "}
              </h1>
              <p className="text-lg">
                The material tested or contested in the Mathematics Olympiad
                consists of several branches of mathematics, including; number
                theory, algebra, geometry and combinatorics.
              </p>
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
                  title={"Her Registration"}
                  price={1000000}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/school.png"}
                  title={"Building"}
                  price={2000000}
                />
                <div className="flex flex-col gap-5 bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-5">
                <CardCost
                  image={"/books.png"}
                  title={"Books"}
                  price={2000000}
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
                        question={"Is the school accredited ?"}
                        answer={
                          "Of course , school is accreditation, and the accreditation is A"
                        }
                      />
                      <AccordionFAQStudent
                        question={"Any public transportation near school ?"}
                        answer={"Yes , is F34 school bus"}
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
                        <ButtonSubmit label="Click Here" />
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
