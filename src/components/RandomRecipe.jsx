import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomRecipe } from "../api/recipeService";
import Navbar from "./Navbar";

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  useEffect(() => {
    const getRandomRecipe = async () => {
      const data = await fetchRandomRecipe();
      if (data) setRecipe(data);
    };

    getRandomRecipe();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Surprise Recipe</h1>
        {recipe ? (
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                maxHeight: "500px",
                maxWidth: "95%",
                borderRadius: "10px",
              }}
            />
            <div style={{ minWidth: "40%" }}>
              <h2>Name: {recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading recipe...</p>
        )}
      </div>
    </>
  );
};

export default RandomRecipe;
