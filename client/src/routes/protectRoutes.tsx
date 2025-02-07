import Loader from "@/Components/Loader";
import { useAuth } from "@/Context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectRoutes = ({ allowedTo }: { allowedTo: string[] }) => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else if (!allowedTo.includes(user?.role ?? "")) {
        navigate("/");
      }
    }
  }, [loading, user, navigate, allowedTo]);

  if (loading) return <Loader />;

  return <Outlet />;
};

export default ProtectRoutes;
