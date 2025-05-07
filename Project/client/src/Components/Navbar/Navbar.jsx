import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // state for notifications count
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const loggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedIn === "true");

    let intervalId;

    // Function to fetch notifications
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
        console.log(response.data.data.count);  // Debugging log to check response
        setNotificationCount(response.data.data.count);  // Update notification count
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Polling every 3 seconds if logged in
    if (accessToken && isLoggedIn) {
      fetchNotifications(); // Initial call to fetch notifications
      intervalId = setInterval(() => {
        const stillLoggedIn = localStorage.getItem("loggedIn");
        if (stillLoggedIn !== "true") {
          clearInterval(intervalId); // Stop polling when logged out
        } else {
          fetchNotifications(); // Continue polling for new notifications
        }
      }, 3000);
    }

    // Cleanup the interval when the component is unmounted or logged out
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

      // Handle expired JWT and navigate to login
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
            <Link to="/">
              <li className="hover:underline">Home</li>
            </Link>
            <Link to="/About">
              <li className="hover:underline">About</li>
            </Link>
            <Link to="/faq">
              <li className="hover:underline">FAQ&apos;s</li>
            </Link>
            <Link to="/how-it-works">
              <li className="hover:underline">How It Works</li>
            </Link>

            {!accessToken && (
              <Link to="/register">
                <li className="hover:underline">Register/Login</li>
              </Link>
            )}

            {accessToken && role === "Admin" && (
              <Link to="/admin-dashboard">
                <li className="hover:underline">Admin Dashboard</li>
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
