import { createBrowserRouter } from "react-router-dom";
import Template from "../templates";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Panduan from "../pages/Panduan";
import Jurnal from "../pages/Jurnal";
import Authentication from "../pages/Authentication";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>
            },
            {
                path: "/panduan",
                element: <Panduan />
            },
            {
                path: "jurnal",
                element: <ProtectedRoute><Jurnal /></ProtectedRoute>
            },
            {
                path: "/pendaftaran",
                element: <Authentication />
            },
        ]
    }
]);
