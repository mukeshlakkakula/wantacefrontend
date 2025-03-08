import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000"; // Change this if needed

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch(`${API_URL}/recipes`);
    const data = await response.json();
    setRecipes(data);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("ingredients", formData.ingredients);
    formDataToSend.append("instructions", formData.instructions);
    if (formData.image) formDataToSend.append("image", formData.image);

    const response = await fetch(
      editId ? `${API_URL}/recipes/${editId}` : `${API_URL}/recipes`,
      {
        method: editId ? "PUT" : "POST",
        body: formDataToSend,
      }
    );

    if (response.ok) {
      fetchRecipes();
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        image: null,
      });
      setEditId(null);
    }
  };

  const handleDelete = async (id) => {
    console.log("id", id);
    await fetch(`${API_URL}/recipes/${id._id}`, { method: "DELETE" });
    fetchRecipes();
  };

  const handleEdit = (recipe) => {
    setFormData({
      title: recipe.title,
      ingredients: recipe.ingredients.join(", "),
      instructions: recipe.instructions,
      image: null,
    });
    setEditId(recipe._id);
  };

  const fetchRandomRecipe = async () => {
    const response = await fetch(`${API_URL}/recipes/random`);
    const data = await response.json();
    alert(
      `Surprise Recipe: ${data.title}\n\nIngredients: ${data.ingredients.join(
        ", "
      )}\n\nInstructions: ${data.instructions}`
    );
  };

  return (
    <div className={`container ${theme}`}>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <h1>Recipe Manager</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleInputChange}
        />
        <button type="submit">{editId ? "Update Recipe" : "Add Recipe"}</button>
      </form>

      <button onClick={fetchRandomRecipe} className="surprise-btn">
        🎲 Surprise Me!
      </button>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            {recipe.image && <img src={`${recipe.image}`} alt={recipe.title} />}
            <h2>{recipe.title}</h2>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <div className="btn-group">
              <button onClick={() => handleEdit(recipe)}>✏️ Edit</button>
              <button onClick={() => handleDelete(recipe)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
