import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkupButton(currentPage, type) {
        return `
              <button data-goto="${type === 'next' ? currentPage + 1 : currentPage - 1}" class="btn--inline pagination__btn--${type}">
                ${type === 'next' ? `<span>Page ${currentPage + 1}</span>` : ''}
                <svg class="search__icon">
                   <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}"></use>
                </svg>
                ${type === 'prev' ? `<span>Page ${currentPage - 1}</span>` : ''}
              </button> 
            `;
    };

    _generatePageNumber(curPage) {
        return `<span class="page--inline">${curPage}</span>`
    }


    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `${this._generatePageNumber(curPage)} ${this._generateMarkupButton(curPage, 'next')}`;
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            return `${this._generatePageNumber(curPage)} ${this._generateMarkupButton(curPage, 'prev')}`;;
        }
        // Other page
        if (curPage < numPages) {
            return `${this._generateMarkupButton(curPage, 'prev')} 
            ${this._generatePageNumber(curPage)} ${this._generateMarkupButton(curPage, 'next')}`;;
        }
        // Page 1, and there are NO other pages
        if (curPage === 1 && numPages === 1) {
            return ``;
        }

    }

}

export default new PaginationView();