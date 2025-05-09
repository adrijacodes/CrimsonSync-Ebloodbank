import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const loggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedIn === "true");

    let intervalId;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/notifications/search?status=active",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setNotificationCount(response.data.data.count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (accessToken && isLoggedIn) {
      fetchNotifications();
      intervalId = setInterval(() => {
        const stillLoggedIn = localStorage.getItem("loggedIn");
        if (stillLoggedIn !== "true") {
          clearInterval(intervalId);
        } else {
          fetchNotifications();
        }
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [location, accessToken, isLoggedIn]);

  const handleLogout = async () => {
    if (!accessToken || !role) {
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/");
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
        navigate("/");
      } else {
        toast.error(errorMsg);
        console.error("Logout error:", error);
        return;
      }
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-red-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Crimson<span className="font-normal">Sync</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="text-white text-3xl md:hidden focus:outline-none"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto absolute md:static left-0 top-full md:top-auto bg-red-600 md:bg-transparent z-40 md:z-auto transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-6 text-white font-semibold p-4 md:p-0">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <li className="hover:underline py-2 md:py-0">Home</li>
            </Link>
            <Link to="/About" onClick={() => setIsMenuOpen(false)}>
              <li className="hover:underline py-2 md:py-0">About</li>
            </Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
              <li className="hover:underline py-2 md:py-0">FAQ&apos;s</li>
            </Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              <li className="hover:underline py-2 md:py-0">How It Works</li>
            </Link>
            {!accessToken && (
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:underline py-2 md:py-0">Register/Login</li>
              </Link>
            )}
            {accessToken && role === "Admin" && (
              <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:underline py-2 md:py-0">Admin Dashboard</li>
              </Link>
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        {(isLoggedIn || isRegistered) && accessToken && (
          <>
            {role === "User" && (
              <div className="flex gap-5 justify-center items-center">
                <Link to="/user-dashboard">
                  <BiSolidUserCircle className="text-3xl text-white hover:text-gray-300 transition-colors duration-200" />
                </Link>
                <Link to="/notification" className="relative">
                  <IoNotifications className="text-3xl text-white hover:text-gray-300 transition-colors duration-200" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-[10px] bg-yellow-300 text-black font-bold rounded-full px-[6px] py-[2px] shadow-md">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex items-center gap-2 text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-red-600 transition-colors duration-200"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            )}

            {role === "Admin" && (
              <div className="flex gap-5 justify-center items-center">
                <Link to="/admin-profile">
                  <BiSolidUserCircle className="text-3xl text-white hover:text-gray-300 transition-colors duration-200" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex items-center gap-2 text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-red-600 transition-colors duration-200"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};


export default Navbar;
