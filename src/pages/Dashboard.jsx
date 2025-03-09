import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // Prevent accidental drags
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = recipes.findIndex((r) => r._id === active.id);
    const newIndex = recipes.findIndex((r) => r._id === over.id);

    setRecipes(arrayMove(recipes, oldIndex, newIndex));
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Draggable </h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={recipes} strategy={verticalListSortingStrategy}>
          <div
            className="recipe-list"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100vw",
              gap: "10px",
            }}
          >
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                navigate={navigate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function RecipeCard({ recipe, navigate }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: recipe._id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    transition: transition || "transform 0.2s ease",
    padding: "10px",
    margin: "5px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#000",
    backgroundColor: "#fff",
    cursor: "grab",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {recipe.image && (
        <img
          onClick={() => navigate(`/recipe/${recipe._id}`)}
          src={recipe.image}
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
