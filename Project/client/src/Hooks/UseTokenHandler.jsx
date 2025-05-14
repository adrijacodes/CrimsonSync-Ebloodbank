import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UseTokenHandler = () => {
  const navigate = useNavigate();

  const handleTokenExpiry = (error) => {
    const errorMsg = error?.response?.data?.message || error.message;

    if (
      errorMsg?.toLowerCase().includes("jwt expired") ||
      error?.response?.status === 401
    ) {
      toast.info("Your session has expired. Please login to continue");
      localStorage.clear();
      navigate("/login");
    } else {
      toast.error(errorMsg);
      console.error("Logout error:", error);
    }
  };

  return { handleTokenExpiry };
};

export default UseTokenHandler;
