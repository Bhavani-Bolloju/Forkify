import icons from "../../img/icons.svg";
import fracty from "fracty";

class RecipeView {
  #parentContainerEl = document.querySelector(".recipe");
  #data;
  #errorMessage = "Couldn't find the recipe, please try again!!";
  #message = "";

  render(data) {
    this.#data = data;
    const markup = this.#generateRecipeMarkup();
    this.#clear();
    this.#parentContainerEl.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentContainerEl.innerHTML = "";
  }

  handlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(err = this.#errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${err}</p>
        </div>
      `;

    this.#clear();
    this.#parentContainerEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(err = this.#message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${err}</p>
        </div>
      `;

    this.#clear();
    this.#parentContainerEl.insertAdjacentHTML("afterbegin", markup);
  }

  spinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
    `;

    this.#clear();
    this.#parentContainerEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateRecipeMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#data?.image}" alt="${
      this.#data?.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#data?.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this.#data?.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this.#data?.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
       ${this.#data?.ingredients?.map(this.#generateIngredientMarkup).join("")}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this.#data?.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data?.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  #generateIngredientMarkup(ing) {
    const qty = fracty(ing.quantity);
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${qty == 0 ? "" : qty}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
  }
}

export default new RecipeView();
