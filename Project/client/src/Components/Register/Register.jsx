import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); // to redirect after success

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form refresh
    const payload = {
      email,
      password,
      name,
      avatar: 'https://api.lorem.space/image/face?w=640&h=480', // optional required field
    };

    try {
      const res = await axios.post('https://api.escuelajs.co/api/v1/users/', payload);
      localStorage.setItem('token', JSON.stringify(res.data.access_token));
      alert('Register Success');
      console.log('Registration Successful', res);
      navigate('/login'); // redirect to login
    } catch (err) {
      alert('Register Failed');
      console.error('Registration Failed', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-contain bg-center"
      style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}
    >
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 mb-4 border rounded-3xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-4 border rounded-3xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-4 border rounded-3xl"
          />

          <select name="role" className="block w-full p-2 mb-4 border rounded-3xl">
            <option value="">--Select Role--</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button type="submit" className="bg-red-500 text-white w-full py-2 rounded">
            Sign Up
          </button>

          <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-600">Already have an account?</p>
            <Link to="/Login">
              <span className="text-blue-700">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
