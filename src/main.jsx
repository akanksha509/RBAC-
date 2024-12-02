import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./layouts/dashboard.jsx";
import DashboardPage from "./pages/index.jsx";
import RolesPage from "./pages/roles.jsx";
import PermissionsPage from "./pages/permissions.jsx";
import SignInPage from "./pages/signIn.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/",
            Component: DashboardPage,
          },
          {
            path: "/roles",
            Component: RolesPage,
          },
          {
            path: "/permissions",
            Component: PermissionsPage,
          },
        ],
      },
      {
        path: "/sign-in",
        Component: SignInPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
