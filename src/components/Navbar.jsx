import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>🍽 Recipe App</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
