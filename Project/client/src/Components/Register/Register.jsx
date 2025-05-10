import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    const payload = {
      email,
      password,
      name,
    };

    try {
      let res;
      if (role.toLowerCase() === "admin") {
        res = await axios.post(
          "http://localhost:8001/api/auth/admin/register",
          payload
        );
      } else {
        res = await axios.post(
          "http://localhost:8001/api/auth/user/register",
          payload
        );
      }

      toast.success("Register Success");
// setting auth details in localStorage
      localStorage.setItem("token", JSON.stringify(res.data.data.accessToken));
      localStorage.setItem("registered", "true");
      localStorage.setItem("role", role);
      navigate("/");

    } catch (err) {
      let errorMessage = "Registration Failed";

      if (err.response && err.response.data) {
        const data = err.response.data;
        if (typeof data.message === "string") {
          errorMessage = data.message;
        } else if (typeof data.message === "object") {
          errorMessage = Object.values(data.message).join("\n");
        }
      }

      toast.error(errorMessage);
      console.error("Registration Failed:", errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
  <div className="absolute inset-0  opacity-10 z-0"></div>

  <div className="relative z-10 flex items-center justify-center h-[100vh]">
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-md border border-red-500 p-8 rounded-3xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full p-2 mb-4 border focus:outline-none focus:ring-2 focus:ring-black rounded-3xl"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 mb-4 border focus:outline-none focus:ring-2 focus:ring-black rounded-3xl"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

      <button
        type="submit"
        className="bg-red-500 text-white w-full py-2 rounded"
      >
        Sign Up
      </button>

      <div className="flex justify-center gap-2 mt-5">
        <p className="text-red-600">Already have an account?</p>
        <Link to="/login">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default Register;
