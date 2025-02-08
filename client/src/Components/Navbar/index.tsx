import { useAuth } from "@/Context/AuthProvider";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="bg-slate-50">
      <div className="container flex flex-row items-center justify-between py-2  ">
        <div>
          <h1 className="text-xl font-semibold">Car Agency</h1>
        </div>
        <button
          className="relative cursor-pointer w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center after:absolute after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2 after:content-['Logout'] after:bg-gray-700 after:text-white after:text-xs after:px-2 after:py-1 after:rounded-md after:opacity-0 hover:after:opacity-100 after:transition-opacity"
          onClick={() => handleLogout()}
        >
          <IoIosLogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
