import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthProvider.tsx";
import { RouterProvider } from "react-router-dom"; // ✅ Import RouterProvider
import router from "./App.tsx"; // ✅ Import the router

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} /> {/* ✅ Use RouterProvider */}
    </AuthContextProvider>
  </StrictMode>
);
