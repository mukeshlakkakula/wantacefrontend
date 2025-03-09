import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://wantacebackend.onrender.com";

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch(`${API_URL}/recipes`);
    const data = await response.json();
    setRecipes(data);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedRecipes = Array.from(recipes);
    const [movedRecipe] = updatedRecipes.splice(result.source.index, 1);
    updatedRecipes.splice(result.destination.index, 0, movedRecipe);

    setRecipes(updatedRecipes);
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar />

      <h1 style={{ textAlign: "center" }}>Draggable</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="recipe-list"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100vw",
              }}
            >
              {recipes.map((recipe, index) => (
                <Draggable
                  key={recipe._id}
                  draggableId={recipe._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="recipe-card"
                      style={{
                        padding: "10px",
                        margin: "5px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "10px",
                        borderColor: "#000",
                        backgroundColor: "#fff",
                        ...provided.draggableProps.style,
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
