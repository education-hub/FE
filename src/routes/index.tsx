import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Admin from "../pages/admin";
import AddSchool from "../pages/admin/AddSchool";
import EditSchool from "../pages/admin/EditSchool";
import AdminProfile from "../pages/admin/Profile";
import Admission from "../pages/admin/Admission";

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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
