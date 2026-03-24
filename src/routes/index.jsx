import { createBrowserRouter } from "react-router";
import Template from "../templates";
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
        ]
    }
]);