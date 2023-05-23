/* eslint-disable react-hooks/exhaustive-deps */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Student from "../pages/student";
import DetailSchool from "../pages/student/DetailSchool";
import Admin from "../pages/admin";
import AddSchool from "../pages/admin/AddSchool";
import EditSchool from "../pages/admin/EditSchool";
import AdminProfile from "../pages/admin/Profile";
import Admission from "../pages/admin/Admission";
import DetailAdmission from "../pages/admin/DetailAdmission";
import UpdateProgress from "../pages/admin/UpdateProgress";
import TestResult from "../pages/admin/TestResult";
import RegistrationForm from "../pages/student/RegistrationForm";
import RegisterSchool from "../pages/student/RegisterSchool";
import Progress from "../pages/student/Progress";
import FirstRegistration from "../pages/student/FirstRegistration";
import Transaction from "../pages/student/Transaction";
import HerRegistration from "../pages/student/HerRegistration";
import Profile from "../pages/student/Profile";
import ForgetPassword from "../pages/auth/ForgetPassword";
import NewPassword from "../pages/auth/NewPassword";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import PdfSubmission from "../pages/admin/PdfDetailSubmission";

axios.defaults.baseURL =
  "https://app.swaggerhub.com/apis/ropel12/Api-Documentation/1.0.0";
const Router = () => {
  const [noData, setNoData] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;
  const checkRole = cookie.role;

  useEffect(() => {
    fetchDataSchool();
  }, []);

  const fetchDataSchool = () => {
    axios
      .get(`https://go-event.online/admin/school`, {
        headers: {
          Authorization: `Bearer ${cookie.tkn}`,
        },
      })
      .then(() => {
        setNoData(false);
      })
      .catch(() => {
        setNoData(true);
      });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: checkToken ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Home /> : <Register />,
    },
    {
      path: "/pwd-reset",
      element: <ForgetPassword />,
    },
    {
      path: "/pwd-new/:token",
      element: <NewPassword />,
    },
    {
      path: "/student",
      element: <Student />,
    },
    {
      path: "/student/detail-school/:id",
      element: <DetailSchool />,
    },
    {
      path: "/student/registration-form/:id",
      element: checkToken ? (
        checkRole === "student" ? (
          <RegistrationForm />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/register-school",
      element: checkToken ? (
        checkRole === "student" ? (
          <RegisterSchool />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/progresses/:id",
      element: checkToken ? (
        checkRole === "student" ? (
          <Progress />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/transaction",
      element: checkToken ? (
        checkRole === "student" ? (
          <Transaction />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/first-registration/:id",
      element: checkToken ? (
        checkRole === "student" ? (
          <FirstRegistration />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/herregistration",
      element: checkToken ? (
        checkRole === "student" ? (
          <HerRegistration />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/student/profile",
      element: checkToken ? (
        checkRole === "student" ? (
          <Profile />
        ) : (
          <Student />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/admin",
      element: checkToken ? (
        checkRole === "administrator" ? (
          <Admin />
        ) : (
          <Home />
        )
      ) : (
        <Home />
      ),
    },
    {
      path: "/admin/profile",
      element:
        checkToken && checkRole === "administrator" ? (
          <AdminProfile />
        ) : (
          <Home />
        ),
    },
    {
      path: "/admin/edit-school/:id",
      element:
        checkToken && checkRole === "administrator" ? <EditSchool /> : <Home />,
    },
    {
      path: "/admin/add-school",
      element:
        checkToken && checkRole === "administrator" && noData ? (
          <AddSchool />
        ) : (
          <Home />
        ),
    },
    {
      path: "/admin/admission",
      element:
        checkToken && checkRole === "administrator" ? <Admission /> : <Home />,
    },
    {
      path: "/admin/admission/:id",
      element:
        checkToken && checkRole === "administrator" ? (
          <DetailAdmission />
        ) : (
          <Home />
        ),
    },
    {
      path: "/admin/admission/pdf/:id",
      element:
        checkToken && checkRole === "administrator" ? (
          <PdfSubmission />
        ) : (
          <Home />
        ),
    },
    {
      path: "/admin/progress/:id",
      element:
        checkToken && checkRole === "administrator" ? (
          <UpdateProgress />
        ) : (
          <Home />
        ),
    },
    {
      path: "/admin/result",
      element:
        checkToken && checkRole === "administrator" ? <TestResult /> : <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
