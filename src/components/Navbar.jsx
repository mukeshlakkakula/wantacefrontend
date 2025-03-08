import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logout Successfully");
    navigate("/login");
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <nav
      style={{
        backgroundColor: "#1E40AF",
        padding: "16px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "100vw",
        minWidth: "95vw",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
          onClick={handleNavigation}
        >
          My Recipe
        </Link>
        {token ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Link
              to="/dashboard"
              style={{
                color: "#fff",
                padding: "10px 16px",
                textDecoration: "none",
                borderRadius: "5px",

                backgroundColor: "#22C55E",
              }}
              onClick={handleNavigation}
            >
              Dashboard
            </Link>
            <Link
              to="/Surprise"
              style={{
                color: "#fff",
                padding: "10px 16px",
                textDecoration: "none",
                borderRadius: "5px",

                backgroundColor: "#22C55E",
              }}
              onClick={handleNavigation}
            >
              Surprise
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "#EF4444",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to="/login"
              style={{
                display: "block",
                color: "#fff",
                padding: "10px 16px",
                textDecoration: "none",
                borderRadius: "5px",
                marginBottom: "8px",
                backgroundColor: "#22C55E",
              }}
              onClick={handleNavigation}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                display: "block",
                color: "#fff",
                padding: "10px 16px",
                textDecoration: "none",
                borderRadius: "5px",
                marginBottom: "8px",
                backgroundColor: "#6B7280",
              }}
              onClick={handleNavigation}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
