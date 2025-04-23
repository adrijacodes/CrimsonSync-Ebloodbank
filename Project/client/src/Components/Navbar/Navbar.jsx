import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const loggedIn = localStorage.getItem("loggedIn");
    setIsRegistered(registered === "true");
    setIsLoggedIn(loggedIn === "true");
  }, []);

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

            {/* Register shown only if not registered and not logged in */}
            {!isRegistered && !isLoggedIn && (
              <Link to="/register">
                <li className="px-4 hover:underline">Register</li>
              </Link>
            )}

            {/* Login shown only if registered but not logged in */}
            {isRegistered && !isLoggedIn && (
              <Link to="/login">
                <li className="px-4 hover:underline">Login</li>
              </Link>
            )}

            {/* Dashboard links shown only if logged in */}
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

            {/* Logout shown only if logged in */}
            {isLoggedIn && (
              <li
                className="px-4 hover:underline cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  localStorage.removeItem("registered");
                  window.location.href = "/"; // or navigate('/login')
                }}
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

