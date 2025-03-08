import React, { useState } from "react";
import { updateRecipe } from "../api/recipeService";

const UpdateRecipe = () => {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateRecipe(id, formData);
    if (response) alert("Recipe updated successfully!");
  };

  return (
    <div>
      <h1>Update a Recipe</h1>
      <input
        type="text"
        placeholder="Recipe ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="instructions"
          placeholder="Instructions"
          onChange={handleChange}
          required
        ></textarea>
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
