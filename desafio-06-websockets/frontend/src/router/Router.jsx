import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "../containers/MainContainer";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Oops, parece que hubo un error</h1>,
        children: [
            {
                path: "/",
                element: <MainContainer />
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;
