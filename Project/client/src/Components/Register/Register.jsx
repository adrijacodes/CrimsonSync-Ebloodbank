import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg2 from "../../assets/bg2.jpeg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      name,
    };

    try {
      const res = await axios.post(
        "https://crimsonsync-ebloodbank.onrender.com/api/auth/user/register",
        payload
      );

      toast.success("Register Success");

      localStorage.setItem("token", JSON.stringify(res.data.data.accessToken));
      localStorage.setItem("registered", "true");

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
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      <div className="relative z-10 w-[90%] max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-30 
             shadow-[0_0_15px_rgba(255,255,255,0.2)] ring-1 ring-white/20">
        <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-full bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-full bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full bg-red-400 text-white font-bold py-3 rounded-full hover:bg-red-500 transition"
          >
            Register
          </button>

          <div className="text-center mt-4 text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-950 underline">
              LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;