import { createBrowserRouter } from "react-router-dom";
import { ComponentType, Suspense, lazy } from "react";
import Loader from "./Components/Loader";
import ProtectRoutes from "./routes/protectRoutes";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const addnew = lazy(() => import("./pages/Addnew"));
const displayDocument = lazy(() => import("./pages/DisplayDocument"));
const withSuspense = (Component: ComponentType) => {
  return () => (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/displayDocument",
    element: withSuspense(displayDocument)(),
  },
  { path: "/", element: withSuspense(Login)() },
  { path: "dashboard", element: withSuspense(Dashboard)() },
  // {
  //   path: "dashboard",
  //   element: (
  //     <ProtectRoutes allowedTo={["admin"]}>
  //       {withSuspense(Dashboard)()}
  //     </ProtectRoutes>
  //   ),
  // },
  // {
  //   path: "addnew",
  //   element: (
  //     <ProtectRoutes allowedTo={["admin"]}>
  //       {withSuspense(addnew)()}
  //     </ProtectRoutes>
  //   ),
  // },
]);

export default router;
