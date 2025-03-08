const API_URL = "http://localhost:5000/api/recipes";

export const fetchRecipes = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const fetchRecipeById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const fetchRandomRecipe = async () => {
  const res = await fetch(`${API_URL}/random`);
  return res.json();
};
