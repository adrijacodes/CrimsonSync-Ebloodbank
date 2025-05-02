import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = JSON.parse(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const loggedIn = localStorage.getItem("loggedIn");
    setIsRegistered(registered === "true");
    setIsLoggedIn(loggedIn === "true");
  }, [location]);

  const handleLogout = async () => {
    if (!accessToken || !role) {
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
      return;
    }

    const logoutUrl =
      role.toLowerCase() === "admin"
        ? "http://localhost:8001/api/auth/admin/logout"
        : "http://localhost:8001/api/auth/user/logout";

    try {
      await axios.post(
        logoutUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Logout failed.";

      if (errorMsg.toLowerCase().includes("jwt expired")) {
        toast.info("Session expired. Please login again.");
      } else {
        toast.error(errorMsg);
        console.error("Logout error:", error);
      }
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header className="bg-red-600 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Crimson<span className="font-normal">Sync</span>
        </Link>

        {/* Centered Nav */}
        <nav className="flex-1">
          <ul className="flex justify-center items-center space-x-6 text-white font-semibold">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/About">About</Link>
            </li>
            <li className="hover:underline">
              <Link to="/faq">FAQ's</Link>
            </li>
            <li className="hover:underline">
              <Link to="/how-it-works">How It Works</Link>
            </li>

            {!accessToken && (
              <li className="hover:underline">
                <Link to="/register">Register/Login</Link>
              </li>
            )}

            {accessToken && role === "Admin" && (
              <>
                <li className="hover:underline">
                  <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin-profile">
                    <BiSolidUserCircle className="text-3xl" />
                  </Link>
                </li>
              </>
            )}

            {accessToken && role === "User" && (
              <li>
                <Link to="/user-dashboard">
                  <BiSolidUserCircle className="text-3xl" />
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="ml-auto flex items-center gap-2 text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-red-600 transition-colors duration-200"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
