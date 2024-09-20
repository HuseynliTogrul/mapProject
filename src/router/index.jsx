import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MapContent from "../components/MapContent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <MapContent />
            }
        ]
    },
]);