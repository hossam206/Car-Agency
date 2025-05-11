// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// const api = import.meta.env.VITE_API_URL;

// interface AuthContextType {
//   loading: boolean;
//   accessToken: string | null;
//   loginService: (credentials: {
//     email: string;
//     password: string;
//   }) => Promise<{ status: number; data: any }>;
//   handleLogout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const loginService = async (credentials: {
//     email: string;
//     password: string;
//   }) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${api}/auth/login`, credentials, {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       });

//       const tokenString = response?.data?.accessToken;
//       console.log(tokenString);

//       if (!tokenString) {
//         navigate("/Login");
//         setLoading(false);
//         return { status: 401, data: "No accessToken found" };
//       }

//       setAccessToken(tokenString);
//       navigate("/");
//       setLoading(false);
//       return { status: 200, data: response.data };
//     } catch (error) {
//       console.error("Login failed:", error);
//       setLoading(false);
//       return { status: 500, data: "Login error" };
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${api}/auth/logout`, {
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         setAccessToken(null);
//         Cookies.remove("accessToken");
//         navigate("/Login");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         accessToken,
//         loading,
//         loginService,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthContextProvider");
//   }
//   return context;
// };

// export default AuthContextProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

interface AuthContextType {
  accessToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
    setLoading(false);
  }, []);

  const loginService = async (credentials: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/auth/login`, credentials, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const token = response?.data?.accessToken;
        if (!token) {
          navigate("/Login");
          setLoading(false);
          return { status: 401, data: "No accessToken found" };
        }

        setAccessToken(token);
        localStorage.setItem("accessToken", token);
        navigate("/");
      }

      setLoading(false);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      return { status: 500, data: "Login error" };
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${api}/auth/logout`, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/Login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, loading, loginService, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
