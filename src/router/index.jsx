import { createBrowserRouter } from "react-router-dom";
// import MapDetail from "../components/MapDetail";
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
            },
            // {
            //     path: "/map-detail",
            //     element: <MapDetail />
            // },
        ]
    },
]);