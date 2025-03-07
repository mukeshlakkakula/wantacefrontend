import React, { useState } from "react";
import axios from "axios";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/recipes", recipe);
    alert("Recipe added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Ingredients"
        onChange={(e) =>
          setRecipe({ ...recipe, ingredients: e.target.value.split(",") })
        }
        required
      />
      <textarea
        placeholder="Instructions"
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
