import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const api = import.meta.env.VITE_API_URL;

interface AuthContextType {
  loading: boolean;
  loginService: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ status: number; data: any }>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate(); // ✅ Correct usage inside `BrowserRouter`
  const [loading, setLoading] = useState(false);

  // handle Login service
  const loginService = async (credentials: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/user/login`, credentials, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });console.log(response);
      if (response.status === 200) {
        const tokenString = Cookies.get("AuthToken");
        if (!tokenString) {
          navigate("/Login");
          setLoading(false);
          return { status: 401, data: "No AuthToken found" };
        }
        if (tokenString) {
          setLoading(false);
          navigate("/");
        }
      }

      setLoading(false);
      return { status: response.status, data: response.data };
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      return { status: 500, data: "Login error" };
    }
  };

  // handle Logout service
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${api}/user/logout`, {
        withCredentials: true,
      });
      if (response.status == 200) {
        Cookies.remove("AuthToken");
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ loginService, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
