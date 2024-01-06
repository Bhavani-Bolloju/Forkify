import { API_URL } from "./config";
import { AJAX } from "./helper";
import { RESULT_PER_PAGE, KEY } from "./config";

export const state = {
  recipe: {},
  search: {
    results: [],
    query: "",
    page: 1,
  },
  bookmarks: [],
};

const formatRecipe = function (recipe) {
  return {
    id: recipe?.id,
    publisher: recipe?.publisher,
    ingredients: recipe?.ingredients,
    sourceUrl: recipe.source_url,
    title: recipe?.title,
    image: recipe?.image_url,
    cookingTime: recipe?.cooking_time,
    servings: recipe?.servings,
    key: recipe?.key || "",
  };
};

export const loadRecipe = async function (id) {
  const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

  try {
    let { recipe } = data?.data;

    state.recipe = formatRecipe(recipe);

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
    const res = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = res?.data?.recipes.map(recipe => {
      return {
        id: recipe?.id,
        publisher: recipe?.publisher,
        title: recipe?.title,
        image: recipe?.image_url,
        key: recipe?.key || "",
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

  //add to the local storage whenever recipe is bookmarked

  const storeBookmarks = JSON.stringify(state.bookmarks);
  localStorage.setItem("bookmarks", storeBookmarks);
};

const getStoredBookmarks = function () {
  const getStoredBookmarks = localStorage.getItem("bookmarks");
  const storedBookmarks = JSON.parse(getStoredBookmarks);

  if (storedBookmarks?.length > 0) state.bookmarks = storedBookmarks;
};

getStoredBookmarks();

export const uploadRecipes = async function (recipe) {
  try {
    // console.log(recipe, "upload");
    const ingredientsObj = new Map();

    for (const [name, value] of recipe) {
      if (
        name.startsWith("unit") ||
        name.startsWith("quantity") ||
        name.startsWith("descr")
      ) {
        const [desc, num] = name.split("-");
        //check if key exist
        if (ingredientsObj.has(num)) {
          //if yes - modify
          //get the key
          const ing = ingredientsObj.get(num);
          //modify
          const modifyValue = {
            ...ing,
            [desc]: desc === "quantity" ? +value : value,
          };
          //set key
          ingredientsObj.set(num, modifyValue);
        } else {
          //if no - create new obj
          const ing = { [desc]: desc === "quantity" ? +value : value };
          ingredientsObj.set(num, ing);
        }
      }
    }
    // console.log(ingredientsObj);
    const ingredientsArr = [...ingredientsObj].map(val => val[1]);

    const recipeEntries = Object.fromEntries(recipe);
    // console.log(recipeEntries);

    const uploadData = {
      publisher: recipeEntries.publisher,
      ingredients: ingredientsArr,
      source_url: recipeEntries.sourceUrl,
      image_url: recipeEntries.image,
      cooking_time: recipeEntries.cookingTime,
      servings: recipeEntries.servings,
      title: recipeEntries.title,
    };

    // console.log(uploadData);
    const resData = await AJAX(`${API_URL}?key=${KEY}`, uploadData);

    const recipeData = resData?.data?.recipe;
    const data = formatRecipe(recipeData);

    state.recipe = data;
    addBookMark(data);
  } catch (error) {
    throw error;
  }
};
// export const uploadRecipes = async function (recipe) {
//   try {
//     const filterIngredients = Object.entries(recipe)
//       .filter(
//         item => item[0].startsWith("ingredient") && item[1].trim("") !== ""
//       )
//       .map(item => {
//         const ing = item[1].split(",");

//         const [quantity = 0, unit = "", description = ""] = ing;

//         if (ing.length < 3) {
//           throw new Error(
//             "Please select correct format to upload recipe ingredients!!!"
//           );
//         }

//         return { quantity: +quantity, unit, description };
//       });

//     const uploadData = {
//       publisher: recipe.publisher,
//       ingredients: filterIngredients,
//       source_url: recipe.sourceUrl,
//       image_url: recipe.image,
//       cooking_time: recipe.cookingTime,
//       servings: recipe.servings,
//       title: recipe.title,
//     };

//     const resData = await AJAX(`${API_URL}?key=${KEY}`, uploadData);

//     const recipeData = resData?.data?.recipe;
//     const data = formatRecipe(recipeData);

//     state.recipe = data;
//     addBookMark(data);
//   } catch (error) {
//     throw error;
//   }
// };
