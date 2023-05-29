/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstRegistration from "../pages/student/FirstRegistration";
import RegistrationForm from "../pages/student/RegistrationForm";
import PdfSubmission from "../pages/admin/PdfDetailSubmission";
import RegisterSchool from "../pages/student/RegisterSchool";
import DetailAdmission from "../pages/admin/DetailAdmission";
import UpdateProgress from "../pages/admin/UpdateProgress";
import ForgetPassword from "../pages/auth/ForgetPassword";
import DetailSchool from "../pages/student/DetailSchool";
import Transaction from "../pages/student/Transaction";
import NewPassword from "../pages/auth/NewPassword";
import TestResult from "../pages/admin/TestResult";
import EditSchool from "../pages/admin/EditSchool";
import AdminProfile from "../pages/admin/Profile";
import AddSchool from "../pages/admin/AddSchool";
import Admission from "../pages/admin/Admission";
import Progress from "../pages/student/Progress";
import Profile from "../pages/student/Profile";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Student from "../pages/student";
import Admin from "../pages/admin";
import About from "../pages/About";
import Team from "../pages/Team";
import Home from "../pages";
import Disclaimer from "../pages/Disclaimer";
import { ThemeContext } from "../utils/context";

const Router = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const [noData, setNoData] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;
  const checkRole = cookie.role;

  useEffect(() => {
    fetchDataSchool();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
      path: "/about",
      element: <About />,
    },
    {
      path: "/disclaimer",
      element: <Disclaimer />,
    },
    {
      path: "/team",
      element: <Team />,
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
      path: "/student/transactions",
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
      path: "/student/transactions/:id",
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

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
