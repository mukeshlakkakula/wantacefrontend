import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out Successfully");
    navigate("/login");
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };
  console.log("loc", location);
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
        <Link
          to="/"
          onClick={handleNavigation}
          style={{
            color: "#fff",
            borderStyle: "solid",
            borderRadius: "25px",
            padding: "3px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
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
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration:
                  location.pathname === "/dashboard" ? "underline" : "none",
                textDecorationThickness: "3px",
              }}
              to="/dashboard"
              onClick={handleNavigation}
            >
              Dashboard
            </Link>
            <Link
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration:
                  location.pathname === "/Surprise" ? "underline" : "none",
                textDecorationThickness: "3px",
              }}
              to="/Surprise"
              onClick={handleNavigation}
            >
              Surprise
            </Link>
            <button onClick={handleLogout}>Logout</button>
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
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration:
                  location.pathname === "/login" ? "underline" : "none",
                textDecorationThickness: "3px",
              }}
              to="/login"
              onClick={handleNavigation}
            >
              Login
            </Link>
            <Link
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration:
                  location.pathname === "/register" ? "underline" : "none",
                textDecorationThickness: "3px",
              }}
              to="/register"
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
