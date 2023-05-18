import {
  FC,
  Fragment,
  useState,
  useEffect,
  FormEvent,
  MouseEvent,
} from "react";
import { LayoutAdmin } from "../../components/Layout";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";
import { Transition, Dialog } from "@headlessui/react";
import { InputLightBlue, TextAreaLightBlue } from "../../components/Input";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface user {
  username: string;
  fname: string;
  sname: string;
  email: string;
  password: string;
  address: string;
  image: any;
}

const AdminProfile: FC = () => {
  const [user, setUser] = useState<Partial<user>>({});

  const [cookie, , removeCookie] = useCookies(["tkn", "role"]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const [image, setImage] = useState<File | null>(null);
  const [objSubmit, setObjSubmit] = useState<Partial<user>>({});
  const checkToken = cookie.tkn;

  const closeModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Success",
          text: message,
          showCancelButton: false,
        });
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure want to delete your account?",
      text: "This process cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0BBBCC",
      cancelButtonColor: "#E4572E",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/users`, {
            headers: {
              Authorization: `Bearer ${cookie.tkn}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "info",
              title: "Success",
              text: message,
              showCancelButton: false,
            }).then((result) => {
              if (result.isConfirmed) {
                removeCookie("tkn");
                removeCookie("role");
                navigate("/");
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
          });
      }
    });
  };

  const handleChange = (value: string | File, key: keyof typeof objSubmit) => {
    const temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(objSubmit);
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    axios
      .put("https://go-event.online/users", formData, {
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
            setObjSubmit({});
            setIsOpen(false);
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
      .finally(() => fetchData());
  };

  return (
    <LayoutAdmin>
      <div className="p-20 grid grid-cols-2 gap-20">
        <div>
          <div className="flex flex-col">
            <div className="w-full bg-cover bg-center">
              <img
                src={
                  user && user.image === "org1.jpg"
                    ? "/org1.jpg"
                    : `https://storage.googleapis.com/prj1ropel/${
                        user && user.image
                      }`
                }
                alt=""
                className="w-full h-auto"
              />
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
          <ButtonCancelDelete label="Delete" onClick={() => handleDelete()} />
          <ButtonSubmit label="Edit" onClick={openModal} />
        </div>
      </div>
      <>
        {/* modal Edit Profile */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={() => closeModal}>
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
                    <form onSubmit={(event) => handleUpdate(event)}>
                      <div className="grid grid-cols-2 gap-10">
                        <div>
                          <div className="w-full flex flex-col items-center justify-center">
                            <img
                              src={
                                objSubmit.image
                                  ? URL.createObjectURL(objSubmit.image)
                                  : user && user.image === "org1.jpg"
                                  ? "/org1.jpg"
                                  : `https://storage.googleapis.com/prj1ropel/${
                                      user && user.image
                                    }`
                              }
                              alt="user-avatar"
                              className=" w-full h-auto border-8 border-white"
                            />
                            <input
                              placeholder=""
                              id="upload-image"
                              type="file"
                              className="p-4"
                              onChange={(event) => {
                                if (!event.currentTarget.files) {
                                  return;
                                }
                                setUser({
                                  ...user,
                                  image: URL.createObjectURL(
                                    event.currentTarget.files[0]
                                  ),
                                });
                                handleChange(
                                  event.currentTarget.files[0],
                                  "image"
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <div className="grid grid-cols-2 gap-10">
                            <div className="flex flex-col gap-1">
                              <p>First Name</p>
                              <InputLightBlue
                                type="text"
                                defaultValue={user.fname}
                                onChange={(event) =>
                                  handleChange(event.target.value, "fname")
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>Last Name</p>
                              <InputLightBlue
                                type="text"
                                defaultValue={user.sname}
                                onChange={(event) =>
                                  handleChange(event.target.value, "sname")
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Username</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={user.username}
                              onChange={(event) =>
                                handleChange(event.target.value, "username")
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Email</p>
                            <InputLightBlue
                              type="text"
                              defaultValue={user.email}
                              onChange={(event) =>
                                handleChange(event.target.value, "email")
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Address</p>
                            <TextAreaLightBlue
                              defaultValue={user.address}
                              onChange={(event) =>
                                handleChange(event.target.value, "address")
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Password</p>
                            <InputLightBlue
                              type="password"
                              defaultValue={user.password}
                              onChange={(event) =>
                                handleChange(event.target.value, "password")
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>Re-Type Password</p>
                            <InputLightBlue
                              type="password"
                              defaultValue={user.password}
                              onChange={(event) =>
                                handleChange(event.target.value, "password")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex space-x-5 justify-end">
                        <ButtonCancelDelete
                          label="Cancel"
                          onClick={(event) => closeModal(event)}
                        />
                        <ButtonSubmit label="Update" type="submit" />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </LayoutAdmin>
  );
};

export default AdminProfile;
