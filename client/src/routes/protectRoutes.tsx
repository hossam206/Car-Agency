import Loader from "@/Components/Loader";
import { useAuth } from "@/Context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const { accessToken, loading } = useAuth();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/Login", { replace: true });
    }
  }, [loading, accessToken, navigate]);

  if (loading) return <Loader />;

  return <Outlet />;
};

export default ProtectRoutes;
