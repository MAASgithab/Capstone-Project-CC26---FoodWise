import { createBrowserRouter } from "react-router-dom";
import Template from "../templates";
import Dashboard from "../pages/Dashboard";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children :[
            {
                path: "/",
                element: <App />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
        ]
    }
]);