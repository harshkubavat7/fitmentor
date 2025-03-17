import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) {
      navigate("/login");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="p-2 border rounded w-full mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded w-full mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
