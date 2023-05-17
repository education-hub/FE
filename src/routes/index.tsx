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

axios.defaults.baseURL =
  "https://app.swaggerhub.com/apis/ropel12/Api-Documentation/1.0.0";
const Router = () => {
  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;
  const checkRole = cookie.role;
  console.log(checkToken, checkRole);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
      path: "/student/detail-school",
      element: <DetailSchool />,
    },
    {
      path: "/student/registration-form",
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
      path: "/student/progress",
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
      path: "/student/first-registration",
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
      element: <AdminProfile />,
    },
    {
      path: "/admin/edit-school",
      element: <EditSchool />,
    },
    {
      path: "/admin/add-school",
      element: <AddSchool />,
    },
    {
      path: "/admin/admission",
      element: <Admission />,
    },
    {
      path: "/admin/admission/:student_id",
      element: <DetailAdmission />,
    },
    {
      path: "/admin/progress/:student_id",
      element: <UpdateProgress />,
    },
    {
      path: "/admin/result",
      element: <TestResult />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
