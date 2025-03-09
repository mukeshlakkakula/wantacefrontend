const API_URL = "https://wantacebackend.onrender.com/recipes";

export const fetchRecipes = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return await res.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch recipe");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    return null;
  }
};

export const fetchRandomRecipe = async () => {
  try {
    const res = await fetch(`${API_URL}/random`);
    if (!res.ok) throw new Error("Failed to fetch random recipe");
    return await res.json();
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
};

export const createRecipe = async (formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("ingredients", formData.ingredients);
    formDataToSend.append("instructions", formData.instructions);
    if (formData.image) formDataToSend.append("image", formData.image);

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: formDataToSend,
    });
    console.log("respon", response, formData, formDataToSend);
    if (!response.ok) throw new Error("Failed to add recipe");
    return await response.json();
  } catch (error) {
    console.error("Error adding recipe:", error);
    return null;
  }
};

export const updateRecipe = async (id, formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("ingredients", formData.ingredients);
    formDataToSend.append("instructions", formData.instructions);
    if (formData.image) formDataToSend.append("image", formData.image);
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: formDataToSend,
    });

    if (!res.ok) throw new Error("Failed to update recipe");
    return await res.json();
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    return null;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete recipe");
    return await res.json();
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    return null;
  }
};
