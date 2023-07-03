import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    _ingColumn = document.querySelector('.add-ingredients');
    _btnAddIngredient = document.querySelector('.btn--add-ingredient');

    _countIngredients = 6;

    constructor() {
        super();
        this._addHandlerAddIngredient();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    _addHandlerAddIngredient() {
        this._btnAddIngredient.addEventListener('click', this._markupAddIngredient.bind(this));
    }

    _markupAddIngredient() {
        this._countIngredients++;
        const markup = `
        <label>Ingredient ${this._countIngredients}</label>
        <input
        type="text"
        name="ingredient-${this._countIngredients}" 
        placeholder="Format: 'Quantity,Unit,Description'"/>
        `
        this._ingColumn.insertAdjacentHTML('beforeend', markup);
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        [this._btnClose, this._overlay].forEach(el =>
            el.addEventListener('click', this.toggleWindow.bind(this))
        );
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    _generateMarkup() {

    }


}

export default new AddRecipeView();