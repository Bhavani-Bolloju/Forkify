import View from "./view";
import previewView from "./previewView";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join("");
  }
}

export default new ResultsView();
