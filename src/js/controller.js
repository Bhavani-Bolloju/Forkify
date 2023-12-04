import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import icons from "../img/icons.svg";
// import "core.js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  try {
    // load recipe
    recipeView.spinner();
    await model.loadRecipe(id);
    // render recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.handlerRender(controlRecipes);
};

init();
