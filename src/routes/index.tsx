import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Admin from "../pages/admin";
import AddSchool from "../pages/admin/AddSchool";

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
      path: "/admin/add-school",
      element: <AddSchool />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
