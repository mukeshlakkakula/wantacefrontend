import React, { useEffect, useState } from "react";
import { fetchRecipeById } from "../api/recipeService";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const data = await fetchRecipeById(id);
      if (data) setRecipe(data);
    };
    getRecipe();
  }, [id]);

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
        <h1> Recipe Details </h1>
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

export default RecipeDetail;
