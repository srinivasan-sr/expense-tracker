import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage/index.jsx";
import SettingsPage from "./pages/SettingsPage/index.jsx";
import DashboardPage from "./pages/DashboardPage/index.jsx";
import CategoriesPage from "./pages/CategoriesPage/index.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
