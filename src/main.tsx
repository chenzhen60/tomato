import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import ClipboardList from "./pages/clipboard_list";
import DailyReview from "./pages/daily_review";
import ErrorPage from "./pages/error_page";
import Home from "./pages/home";
import TomatoList from "./pages/tomato/indext";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "clipboard",
        element: <ClipboardList/>,
      },
      {
        path: "tomatos",
        element: <TomatoList />,
      },
      {
        path: "daily_review",
        element: <DailyReview />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
