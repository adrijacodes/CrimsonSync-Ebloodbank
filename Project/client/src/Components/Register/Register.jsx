import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // ✅ Added role state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }
    //console.log(role);

    const payload = {
      email,
      password,
      name,
      // role: role.toLowerCase
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

     
      alert("Register Success");
      //console.log("Registration Successful", res.data.data);
     // console.log(res.data.data.accessToken);
      
     localStorage.setItem("token", JSON.stringify(res.data.data.accessToken));
      localStorage.setItem("registered", "true"); // set a flag
      navigate("/");
    } catch (err) {
      alert("Register Failed");
      console.error("Registration Failed", err);
    }
    
  };

  return (
    <div className="min-h-screen bg-contain bg-center"style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Account
          </h2>

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
            value={role} // ✅ controlled input
            onChange={(e) => setRole(e.target.value)} // set role state
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
