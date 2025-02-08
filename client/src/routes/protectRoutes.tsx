import Loader from "@/Components/Loader";
import { useAuth } from "@/Context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();

  useEffect(() => {
    const Token = Cookies.get("AuthToken");
    if (!loading) {
      if (!Token) {
        navigate("/Login");
      }
    }
  }, [loading, navigate]);

  if (loading) return <Loader />;

  return <Outlet />;
};

export default ProtectRoutes;
