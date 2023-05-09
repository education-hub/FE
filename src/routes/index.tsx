import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
