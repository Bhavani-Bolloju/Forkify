import { API_URL } from "./config";
import { getJson } from "./helper";
import { RESULT_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: {
    results: [],
    query: "",
    page: 1,
  },
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
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.results.query = query;
    const res = await getJson(`${API_URL}?search=${query}`);
    state.search.results = res.data.recipes.map(recipe => {
      return {
        id: recipe?.id,
        publisher: recipe?.publisher,
        title: recipe?.title,
        image: recipe?.image_url,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const begin = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  return state.search.results.slice(begin, end);
};
