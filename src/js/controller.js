import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";

import icons from "../img/icons.svg";
// import "core.js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  // console.log(id);

  if (!id) return;

  try {
    // load recipe
    recipeView.spinner();
    await model.loadRecipe(id);
    // render recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  //read query
  const query = searchView.getQuery();

  if (!query) return;
  try {
    //load search results
    resultsView.spinner();
    await model.loadSearchResults(query);
    //render search results

    const result = model.state.search.results.slice(0, 10);

    if (result.length <= 0) {
      throw new Error("No results found, try with different keyword");
    }
    resultsView.render(result);
    //clear query input
    searchView.clearSearchInput();
  } catch (error) {
    resultsView.renderError(error.message);
  }
};

// controlSearchResults();

const init = function () {
  recipeView.handlerRender(controlRecipes);
  searchView.handlerSearchResult(controlSearchResults);
};
init();
