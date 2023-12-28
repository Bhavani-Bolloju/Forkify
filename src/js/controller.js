import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";

// import "core.js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  try {
    recipeView.spinner();
    await model.loadRecipe(id);
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    const { recipe } = model.state;

    recipeView.render(recipe);
    //bookmarks
    // recipeView.getBookmarksData(model.state.bookmarks);
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

    const result = model.getSearchResultsPage(1);
    if (result.length <= 0) {
      throw new Error("No results found, try with different keyword");
    }
    resultsView.render(result);
    paginationView.render(model.state.search);
    searchView.clearSearchInput();
  } catch (error) {
    resultsView.renderError(error.message);
  }
};

// controlSearchResults();

const controlPagination = function (page) {
  const result = model.getSearchResultsPage(page);
  resultsView.render(result);
  paginationView.render(model.state.search);
};

const controlServings = function (totalServings) {
  model.updateServings(totalServings);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  model.addBookMark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.handlerRender(controlRecipes);
  recipeView.handleUpdateServings(controlServings);
  recipeView.handleBookmarks(controlBookmarks);
  searchView.handlerSearchResult(controlSearchResults);
  paginationView.addHandleClick(controlPagination);
};
init();
