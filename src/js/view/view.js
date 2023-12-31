import icons from "../../img/icons.svg";

export default class View {
  _data;
  render(data, render = true) {
    this._data = data;

    if (data.length <= 0) {
      this.renderMessage();
    }

    const markup = this._generateMarkup();
    if (!render) {
      return markup;
    }

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = [...newDOM.querySelectorAll("*")];

    const currentElements = [...this._parentEl.querySelectorAll("*")];

    newElements.forEach((newEl, i) => {
      const currEl = currentElements[i];

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        currEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(err = this._errorMessage) {
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

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(err = this._message) {
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

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  spinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
