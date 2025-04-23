import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
  
    if (!role) {
      toast.error("Please select a role.");
      return;
    }
  
    const payload = { email, password };
    console.log("Logging in with:", payload, "as", role);
  
    try {
      let loginRes;
      if (role.toLowerCase() === "admin") {
        loginRes = await axios.post("http://localhost:8001/api/auth/admin/login", payload);
      } else {
        loginRes = await axios.post("http://localhost:8001/api/auth/user/login", payload);
      }
  
      const token = loginRes.data.data.accessToken;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", role);
      localStorage.setItem("loggedIn", "true");
  
      toast.success("Login Success");
  
      navigate(role.toLowerCase() === "admin" ? "/" : "/");

      // same as register
    } catch (err) {
      let errorMessage = "Login Failed";
    
      if (err.response && err.response.data) {
        const data = err.response.data;
    
        if (typeof data.message === "string") {
          errorMessage = data.message;
        } else if (typeof data.message === "object") {
          errorMessage = Object.values(data.message).join("\n");
        }
      }
    
      toast.error(errorMessage);
      console.error("Login Failed:", errorMessage);
    }
    
  };
  

  return (
    <div className="min-h-screen bg-contain bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="block w-full p-2 mb-4 border focus:outline-none focus:ring-2 focus:ring-black rounded-3xl"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 border focus:outline-none focus:ring-2 focus:ring-black rounded-3xl"
          />

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full p-2 mb-4 border focus:outline-none focus:ring-2 focus:ring-black rounded-3xl"
          >
            <option value="">--Select Role--</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button type="submit" className="bg-red-500 text-white w-full py-2 rounded">
            Login
          </button>

          <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-600">New Here?</p>
            <Link to={"/Register"}>
              <span className="text-blue-700">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
