import { RESULT_PER_PAGE } from "../config";

class PaginationView {
  _parentEl = document.querySelector(".pagination");
  _btnPrev = document.querySelector(".pagination__btn--prev");
  _btnNext = document.querySelector(".pagination__btn--next");
  _currentPage;
  _totalPages;

  render(totalresults) {
    const totalRecipeItems = totalresults.results;

    this._currentPage = totalresults.page;
    this._totalPages = Math.ceil(totalRecipeItems.length / RESULT_PER_PAGE);
    this._controlPageButtons(this._currentPage, this._totalPages);
  }

  addHandleClick(handler) {
    this._parentEl.addEventListener("click", e => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      if (btn.classList.contains("pagination__btn--prev")) {
        if (this._currentPage <= 1) {
          return;
        }
        this._currentPage -= 1;
      } else {
        if (this._currentPage >= this._totalPages) {
          return;
        }
        this._currentPage += 1;
      }
      this._controlPageButtons(this._currentPage, this._totalPages);
      handler(this._currentPage);
    });
  }

  _controlPageButtons(currentPage, totalPages) {
    //if on first page and no more items left - hide both the btns
    if (this._currentPage === 1 && this._totalPages <= 1) {
      this._btnNext.classList.add("inactive");
      this._btnPrev.classList.add("inactive");
    }

    //if on first page and more items - hide prev btn - show next btn
    if (this._currentPage === 1 && this._totalPages > 1) {
      this._btnPrev.classList.add("inactive");
      this._btnNext.classList.remove("inactive");
    }

    //if on last page - show only prev button - hide next btn
    if (this._currentPage > 1 && this._totalPages === currentPage) {
      this._btnPrev.classList.remove("inactive");
      this._btnNext.classList.add("inactive");
    }

    //if on any other page - show both the btns
    if (this._currentPage > 1 && this._currentPage != this._totalPages) {
      this._btnPrev.classList.remove("inactive");
      this._btnNext.classList.remove("inactive");
    }

    this._btnNext.querySelector("span").textContent = `Page ${
      this._currentPage + 1
    }`;
    this._btnPrev.querySelector("span").textContent = `Page ${
      this._currentPage - 1
    }`;
  }
}

export default new PaginationView();
