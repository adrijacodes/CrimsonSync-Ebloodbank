import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export const checkTokenValidity = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decoded.exp < currentTime) {
      toast.info("Session expired. Please login again.");
      localStorage.clear();
      return false; // Token expired
    }

    return true; // Token valid
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.clear();
    return false;
  }
};
