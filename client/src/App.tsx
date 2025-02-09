import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Components/Loader";
import ProtectRoutes from "./routes/protectRoutes";
import { AuthContextProvider } from "./Context/AuthProvider.tsx";
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DisplayDocument = lazy(() => import("./pages/DisplayDocument"));
const AddNew = lazy(() => import("./pages/Addnew"));

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/Login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/document"
            element={
              <Suspense fallback={<Loader />}>
                <DisplayDocument />
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
                <Suspense fallback={<Loader />}>
                  <AddNew />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;
