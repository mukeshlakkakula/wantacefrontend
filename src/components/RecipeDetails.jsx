import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../api/recipeService.jsx";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeById(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img
        src={`http://localhost:5000${recipe.image}`}
        alt={recipe.title}
        width="300"
      />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
