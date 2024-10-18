
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading...." : "Sign Up"}
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/register"}>
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
     
    </div>
  );
};

export default Register;
