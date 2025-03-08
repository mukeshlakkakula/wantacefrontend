import { useEffect, useState } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <img
            src={`http://localhost:5000${recipe.image}`}
            alt={recipe.title}
            width="200"
          />
          <p>{recipe.ingredients.join(", ")}</p>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
