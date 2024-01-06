import View from "./view";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _message = "your recipe is uploaded successfully :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnClose = document.querySelector(".btn--close-modal");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");

  constructor() {
    super();
    this._handlerOpenWindow();
    this._handleCloseWindow();
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _handlerOpenWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _handleCloseWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));

    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  handlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      // const ingFieldSets = this.querySelectorAll(".upload__column fieldset");

      // console.log(ingFieldSets);
      // console.log(...new FormData(ingFieldSets));

      // console.log([...new FormData(ingFieldSets)]);
      //
      const formArr = [...new FormData(this)];
      // console.log(formArr);
      // const data = Object.fromEntries(formArr);
      // console.log(data);
      handler(formArr);
      // console.log(data, "form data");
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
