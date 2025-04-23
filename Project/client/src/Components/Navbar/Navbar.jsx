import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const loggedIn = localStorage.getItem("loggedIn");
    setIsRegistered(registered === "true");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogout = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const role = localStorage.getItem("role");

    if (!token || !role) {
      toast.error("No user session found.");
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear session info
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("registered");

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <header className="bg-red-600 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/" className="flex-1">
          <h1 className="font-bold text:sm sm:text-xl flex flex-wrap">
            <span className="text-white text-2xl">Crimson</span>
            <span className="text-white text-2xl">Sync</span>
          </h1>
        </Link>

        <nav className="flex-1">
          <ul className="flex justify-center text-white font-semibold font-sans">
            <Link to="/">
              <li className="px-4 hover:underline">Home</li>
            </Link>
            <Link to="/About">
              <li className="px-4 hover:underline">About</li>
            </Link>

            {!isRegistered && !isLoggedIn && (
              <Link to="/register">
                <li className="px-4 hover:underline">Register</li>
              </Link>
            )}

            {isRegistered && !isLoggedIn && (
              <Link to="/login">
                <li className="px-4 hover:underline">Login</li>
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link to="/admin-dashboard">
                  <li className="px-4 hover:underline">Admin Dashboard</li>
                </Link>
                <Link to="/user-dashboard">
                  <li className="px-4 hover:underline">User Dashboard</li>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <li
                className="px-4 hover:underline cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </nav>

        <div className="flex-1"></div>
      </div>
    </header>
  );
};

export default Navbar;
