import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const loginRes = await axios.post('https://api.escuelajs.co/api/v1/auth/login', payload);
      const token = loginRes.data.access_token;
      localStorage.setItem("token", JSON.stringify(token));

      // Now get user profile (which includes role info)
      const profileRes = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const user = profileRes.data;
      localStorage.setItem("role", user.role); 
      alert("Login Success");

      // Redirect based on role
      if (user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      alert("Login Failed");
      console.error("Login Failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-contain bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form onSubmit={handleSubmit} className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="block w-full p-2 mb-4 border rounded-3xl" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="block w-full p-2 mb-4 border rounded-3xl" />
          <button type="submit" className="bg-red-500 text-white w-full py-2 rounded">Login</button>
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
}

export default Login;
