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

const Router = () => {
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
      path: "/student",
      element: <Student />,
    },
    {
      path: "/student/detail-school",
      element: <DetailSchool />,
    },
    {
      path: "/student/registration-form",
      element: <RegistrationForm />,
    },
    {
      path: "/student/register-school",
      element: <RegisterSchool />,
    },
    {
      path: "/student/progress",
      element: <Progress />,
    },
    {
      path: "/student/transaction",
      element: <Transaction />,
    },
    {
      path: "/student/first-registration",
      element: <FirstRegistration />,
    },
    {
      path: "/student/herregistration",
      element: <HerRegistration />,
    },
    {
      path: "/admin",
      element: <Admin />,
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
