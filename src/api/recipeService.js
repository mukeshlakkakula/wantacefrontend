import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes";

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addRecipe = async (recipe) => {
  const response = await axios.post(API_URL, recipe);
  return response.data;
};
