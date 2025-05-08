import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const checkTokenValidity = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // ✅ Use named import
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      toast.info("Session expired. Please login again.");
      localStorage.clear();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.clear();
    return false;
  }
};
