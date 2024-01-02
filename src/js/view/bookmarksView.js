import View from "./view";
import previewView from "./previewView";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it";
  _message = "No bookmarks yet. Find a nice recipe and bookmark it";

  addBookmarksHandler(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join("");
  }
}

export default new BookmarksView();
