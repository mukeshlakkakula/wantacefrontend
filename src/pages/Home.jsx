import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://wantacebackend.onrender.com";

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("ingredients", formData.ingredients);
      formDataToSend.append("instructions", formData.instructions);
      if (formData.image) formDataToSend.append("image", formData.image);

      setModal(!modal);
      const response = await fetch(
        editId ? `${API_URL}/recipes/${editId}` : `${API_URL}/recipes`,
        {
          method: editId ? "PUT" : "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert(`Recipe ${editId ? "updated" : "added"} successfully!`);
        fetchRecipes();
        setFormData({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
        setEditId(null);
      } else {
        const errorMessage = await response.text();
        alert(`Failed to ${editId ? "update" : "add"} recipe: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert(" An error occurred while submitting the recipe.");
    }
  };

  const handleDelete = async (id) => {
    console.log("id", id);

    try {
      let res = await fetch(`${API_URL}/recipes/${id._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert(" Recipe deleted successfully!");
        fetchRecipes();
      } else {
        const errorMessage = await res.text(); // Get error message from response
        alert(` Failed to delete recipe: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert(" An error occurred while deleting the recipe.");
    }
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

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {" "}
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1>Recipe Manager</h1>{" "}
        <button
          onClick={() => {
            setModal(!modal);
          }}
        >
          Add Recipe
        </button>
      </div>
      <div
        style={{
          position: "fixed",
          display: modal ? "block" : "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          width: "80%",
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
        }}
      >
        <span
          onClick={() => setModal(!modal)}
          style={{
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: "1%",
            border: "1px",
            borderStyle: "5px",
            borderColor: "#fff",
            right: "3%",
          }}
        >
          X
        </span>
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
          <button type="submit">
            {editId ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </div>
      <div
        className="recipe-list"
        style={{
          display: "flex",

          justifyContent: "center",
          flexWrap: "wrap",
          width: "100vw",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            style={{
              padding: "10px",
              margin: "2px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "10px",
              borderColor: "#000",
            }}
          >
            {recipe.image && (
              <img
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                src={`${recipe.image}`}
                style={{
                  minWidth: "250px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  maxWidth: "350px",
                  maxHeight: "250px",
                }}
                alt={recipe.title}
              />
            )}
            <h2>{recipe.title}</h2>

            <div className="btn-group" style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  handleEdit(recipe), setModal(!modal);
                }}
              >
                ✏️
              </button>
              <button onClick={() => handleDelete(recipe)}>🗑️ </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
