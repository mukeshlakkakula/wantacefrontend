import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import RecipeForm from "../components/RecipeForm";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Dashboard</h1>
      <Navbar />
      <RecipeForm />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Dashboard;
