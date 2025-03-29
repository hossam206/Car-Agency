import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Components/Loader";
import ProtectRoutes from "./routes/protectRoutes";
import { AuthContextProvider } from "./Context/AuthProvider.tsx";
import ContentLoader from "./Components/ContentLoader/inedx.tsx";
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddNew = lazy(() => import("./pages/Addnew"));
const EditCar = lazy(() => import("./pages/Editcar"));
const ViewDocument = lazy(() => import("./pages/ViewDocument"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route (No Auth Required) */}
        <Route path="api/car/view/:documentId" element={<ViewDocument />} />

        {/* Wrap everything else with Auth Context */}
        <Route
          path="/*"
          element={
            <AuthContextProvider>
              <Routes>
                {/* Public Route */}
                <Route
                  path="/Login"
                  element={
                    <Suspense fallback={<ContentLoader />}>
                      <Login />
                    </Suspense>
                  }
                />

                {/* Protected Routes */}
                <Route element={<ProtectRoutes />}>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addnew"
                    element={
                      <Suspense fallback={<ContentLoader />}>
                        <AddNew />
                      </Suspense>
                    }
                  />
                  <Route
                    path="cars/editCar/:id"
                    element={
                      <Suspense fallback={<ContentLoader />}>
                        <EditCar />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </AuthContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
