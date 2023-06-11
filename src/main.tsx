import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import AppLayout from "./layout/Layout";
import AccountView from "./views/account/AccountView";
import PageNotFoundView from "./views/pageNotFound/PageNotFoundView";
import PlaygroundView from "./views/playground/PlaygroundView";

const router = createBrowserRouter([
    { path: "/", element: <HomeView />, errorElement: <Navigate to="pageNotFound" /> },
    { path: "/account/:address", element: <AccountView /> },
    { path: "/pageNotFound", element: <PageNotFoundView /> },
    { path: "/playground", element: <PlaygroundView /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppLayout>
            <RouterProvider router={router} />
        </AppLayout>
    </React.StrictMode>
);
