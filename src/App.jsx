import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import Home from "./pages/Home.jsx";
import RecipeDetail from "./components/RecipeDetails.jsx";

import RandomRecipe from "./components/RandomRecipe.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <div style={{ width: "100%" }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes (Only accessible when logged in) */}
        <Route
          path="/surprise"
          element={<ProtectedRoute element={<RandomRecipe />} />}
        />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />{" "}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/recipe/:id"
          element={<ProtectedRoute element={<RecipeDetail />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
