import { FC, Fragment, useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { Transition, Dialog } from "@headlessui/react";
import { InputLightBlue, TextAreaLightBlue } from "../../components/Input";
import { useCookies } from "react-cookie";
import axios from "axios";

interface user {
  username: string;
  fname: string;
  sname: string;
  email: string;
  password: string;
  address: string;
  image: string;
}

const StudentProfile: FC = () => {
  const [user, setUser] = useState<user>({
    username: "",
    fname: "",
    sname: "",
    email: "",
    password: "",
    address: "",
    image: "",
  });
  const [cookie] = useCookies(["tkn"]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://go-event.online/users`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setUser(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <Layout>
      <div className="p-20 grid grid-cols-2 gap-20">
        <div>
          <div className="flex flex-col">
            <div className="w-full bg-cover bg-center">
              <img src="/org3.png" alt="" className="w-full h-auto" />
            </div>
            <div className="flex py-7 bg-@light-blue items-center justify-center space-x-5">
              <BsFacebook className="text-3xl text-@dark" />
              <BsTwitter className="text-3xl text-@dark" />
              <BsInstagram className="text-3xl text-@dark" />
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1 mb-10">
              <p>First Name</p>
              <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                <p>{user.fname}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-10">
              <p>Last Name</p>
              <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
                <p>{user.sname}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-10">
            <p>Username</p>
            <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
              <p>{user.username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-10">
            <p>Email</p>
            <div className="bg-@light-blue flex items-center h-16 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 focus:outline-none  w-full">
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-10">
            <p>Address</p>
            <div className="bg-@light-blue flex h-32 text-md sm:text-lg md:text-xl border-2 text-@dark font-medium px-4 py-4 focus:outline-none  w-full">
              <p>{user.address}</p>
            </div>
          </div>
        </div>
        <div className="grid  grid-cols-2 gap-44">
          <ButtonCancelDelete label="Delete" />
          <ButtonSubmit label="Edit" onClick={openModal} />
        </div>
      </div>
      <>
        {/* modal Edit Profile */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-white p-10 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold  leading-6 text-@dark text-center py-5 mb-5"
                    >
                      Update Profile
                    </Dialog.Title>
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="w-full flex flex-col items-center justify-center">
                          {image ? (
                            <div className="w-full">
                              <img
                                src={URL.createObjectURL(image)}
                                alt="Selected"
                                className="h-auto w-96"
                              />
                            </div>
                          ) : (
                            <div className="w-full">
                              <img
                                src="/org3.png"
                                alt="Default"
                                className="w-full"
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
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-10">
                          <div className="flex flex-col gap-1">
                            <p>First Name</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"Sohibul"}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Last Name</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={"Wafa'"}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Username</p>
                          <InputLightBlue
                            type="text"
                            defaultValue={"sohek_jogorgi99"}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Email</p>
                          <InputLightBlue
                            type="text"
                            defaultValue={"sohek_aja@gmail.com"}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Address</p>
                          <TextAreaLightBlue defaultValue={"Indramayu"} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Password</p>
                          <InputLightBlue
                            type="password"
                            defaultValue={"jakartans1"}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Re-Type Password</p>
                          <InputLightBlue
                            type="password"
                            defaultValue={"jakartans1"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex space-x-5 justify-end">
                      <ButtonCancelDelete label="Cancel" onClick={closeModal} />
                      <ButtonSubmit
                        label="Update"
                        onClick={() => {
                          alert("Submit");
                          closeModal();
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
    </Layout>
  );
};

export default StudentProfile;
