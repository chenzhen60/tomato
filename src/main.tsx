import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DailyReview from "./pages/daily_review";
import ErrorPage from "./pages/error_page";
import Home from "./pages/home";
import "./styles.css";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "daily_review",
                element: <DailyReview />
            }
        ]
    },

])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
