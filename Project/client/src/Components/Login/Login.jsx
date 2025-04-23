import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }
  
    if (!role) {
      alert("Please select a role.");
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
  
      alert("Login Success");
  
      navigate(role.toLowerCase() === "admin" ? "/admin-dashboard" : "/");
    } catch (err) {
      alert("Login Failed");
      console.error("Login Failed", err.response?.data || err.message);
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
