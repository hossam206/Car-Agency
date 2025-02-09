import { createBrowserRouter } from "react-router-dom";
import { ComponentType, Suspense, lazy } from "react";
import Loader from "./Components/Loader";
import ProtectRoutes from "./routes/protectRoutes";
import Addnew from "./pages/Addnew";
import ViewCar from "./pages/ViewCar";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
// const AddNew = lazy(() => import("./pages/Addnew"));
const DisplayDocument = lazy(() => import("./pages/DisplayDocument"));

const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/document",
    element: withSuspense(DisplayDocument),
  },
  { path: "/", element: withSuspense(Login) },
  { path: "dashboard", element: <Dashboard /> },
  { path: "document/view/:car", element: <ViewCar /> },
  // {
  //   path: "dashboard",
  //   element: (
  //     <ProtectRoutes allowedTo={["admin"]}>
  //       {withSuspense(Dashboard)}
  //     </ProtectRoutes>
  //   ),
  // },
  // {
  //   path: "addnew",
  //   element: (
  //     <ProtectRoutes allowedTo={["admin"]}>
  //       {withSuspense(AddNew)}
  //     </ProtectRoutes>
  //   ),
  // },
]);

export default router;
