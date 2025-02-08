import React, { createContext, useContext, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Define a proper TypeScript interface for the context
interface AuthContextType {
  user: JwtPayload | null;
  loading: boolean;
  loginService: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
}
interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

// Create context with an initial default value of `undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //   const navigate = useNavigate();
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(false);

  const decodeToken = ({
    Token,
  }: {
    Token: string;
  }): CustomJwtPayload | null => {
    try {
      return jwtDecode<CustomJwtPayload>(Token);
    } catch (error) {
      console.log("Error during token decoding:", error);
      return null;
    }
  };

  const loginService = async (credentials: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/user/login`, credentials, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(credentials);
      console.log(response);
      if (response.data) {
        const Token = decodeToken({ Token: Cookies.get("AuthToken") || "" });
        if (Token) {
          setUser(Token);
          setLoading(false);
          // Navigate("/carsData");
        }
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loginService, user, loading }}>
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
