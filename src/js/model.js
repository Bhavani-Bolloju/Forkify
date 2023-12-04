import { API_URL } from "./config";
import { getJson } from "./helper";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const data = await getJson(`${API_URL}/${id}`);
  try {
    let { recipe } = data?.data;
    state.recipe = {
      id: recipe?.id,
      publisher: recipe?.publisher,
      ingredients: recipe?.ingredients,
      sourceUrl: recipe.source_url,
      title: recipe?.title,
      image: recipe?.image_url,
      cookingTime: recipe?.cooking_time,
      servings: recipe?.servings,
    };
  } catch (err) {
    console.log(err, "err");
  }
};
