import React, { createContext, useContext, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface AuthContextType {
  user: JwtPayload | null;
  loading: boolean;
  loginService: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => void;
}

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate(); // ✅ Correct usage inside `BrowserRouter`
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(false);

  const decodeToken = ({
    Token,
  }: {
    Token?: string;
  }): CustomJwtPayload | null => {
    if (!Token) return null;
    try {
      return jwtDecode<CustomJwtPayload>(Token);
    } catch (error) {
      console.log("Error during token decoding:", error);
      return null;
    }
  };
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
      });

      if (response.status === 200) {
        const tokenString = Cookies.get("AuthToken");
        const Token = tokenString ? decodeToken({ Token: tokenString }) : null;
        if (Token) {
          setUser(Token);
          setLoading(false);
          return navigate("/");
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      // console.error("Error occurred while logging in:", error);
      setLoading(false);
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
    <AuthContext.Provider value={{ loginService, handleLogout, user, loading }}>
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
