
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { id, value } = e.target; //
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setSuccess(null);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //const textResponse = await res.text();
      //   if (!res.ok) {
      //     const errorResponse = await res.json(); // Ensure the error is JSON
      //     setError(errorResponse.message);
      //     setLoading(false);
      //     return;
      //   }
      // const data = JSON.parse(textResponse);
      // console.log(data);
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    navigate('/register');
      // setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    }
    //   console.error('There was a problem with the fetch operation:', error);
    // }
    setLoading(false);
    setError(null)
    setFormData({ username: "", email: "", password: "" });
  };
  //   console.log(formData);

  return (
    
    <div className="min-h-screen bg-contain bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
          <input type="text" placeholder="Name" className="block w-full p-2 mb-4 border rounded-3xl" />
          <input type="email" placeholder="Email" className="block w-full p-2 mb-4 border rounded-3xl" />
          <input type="password" placeholder="Password" className="block w-full p-2 mb-4 border rounded-3xl" />
          <button className="bg-red-500 text-white w-full py-2 rounded">Sign Up</button>
          <div className="flex justify-center gap-2 mt-5">
        <p className="text-red-600">Already have an account?</p>
        <Link to={"/Login"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>

        </form>
      </div>
    </div>

    

  );
};

export default Register;
