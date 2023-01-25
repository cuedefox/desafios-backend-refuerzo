import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormProd from "../components/FormProd";
import Products from "../components/Products";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Oops, parece que hubo un error</h1>,
        children: [
            {
                path: "/",
                element: <FormProd />
            },
            {
                path: "/products",
                element: <Products />,
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;
