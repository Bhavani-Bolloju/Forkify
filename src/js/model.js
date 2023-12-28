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
  bookmarks: [],
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

    const idExists = state.bookmarks.some(b => b.id === recipe.id);

    if (idExists) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
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

export const updateServings = function (servingsNum) {
  const currentServings = state.recipe.servings;
  const updateIngredients = state.recipe.ingredients.map(ing => {
    const updateQty = (ing.quantity / currentServings) * servingsNum;
    return { ...ing, quantity: updateQty };
  });

  state.recipe.servings = servingsNum;

  state.recipe.ingredients = updateIngredients;
};

export const addBookMark = function (recipe) {
  const bookmarks = state.bookmarks;
  const idExists = bookmarks.some(b => b.id === recipe.id);
  if (idExists) {
    state.bookmarks = [...state.bookmarks].filter(b => b.id !== recipe.id);
    state.recipe.bookmarked = false;
  } else {
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;
  }
};
