import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const API_URL = "http://localhost:5000"; // Change this if needed

export default function Dashboard() {
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
        alert(`✅ Recipe ${editId ? "updated" : "added"} successfully!`);
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
        alert(
          `❌ Failed to ${editId ? "update" : "add"} recipe: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("❌ An error occurred while submitting the recipe.");
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await fetch(`${API_URL}/recipes/${id._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert(" Recipe deleted successfully!");
        fetchRecipes();
      } else {
        const errorMessage = await res.text();
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

  // Handle Drag & Drop Sorting
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRecipes((prev) => {
        const oldIndex = prev.findIndex((r) => r._id === active.id);
        const newIndex = prev.findIndex((r) => r._id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
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
        <button onClick={() => setModal(!modal)}>Add Recipe</button>
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

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={recipes.map((recipe) => recipe._id)}
          strategy={verticalListSortingStrategy}
        >
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
              <SortableRecipe
                key={recipe._id}
                recipe={recipe}
                navigate={navigate}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setModal={setModal}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRecipe({
  recipe,
  navigate,
  handleEdit,
  handleDelete,
  setModal,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: recipe._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "2px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#000",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
    </div>
  );
}
