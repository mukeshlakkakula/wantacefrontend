import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://wantacebackend.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
      alert("Login Successfully");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
