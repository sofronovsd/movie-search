import * as helper from './Helper';
import { showSpinner, hideSpinner } from './Spinner';
import { showAlert, hideAlert } from './Alert';
import state from './State';
import { translate } from './YandexTranslater';
import initSwiper from './Swiper';
import { executeDefaultMovieRequest, executeMovieRequest } from './RequestExecutor';
import showInfoAlert from './InfoAlert';
import { getSwiperWrapper, getBody } from './Helper';

import Modal from './Modal';

const getSearchValue = () => {
  const searchInput = helper.getSearchInput();
  const searchValue = searchInput.value;
  state.searchString = searchValue;
  if (/[А-яЁё]/.test(searchValue)) {
    return translate(searchValue)
      .then((response) => {
        [state.searchString] = response.text;
        showInfoAlert(state.searchString);
      })
      .catch((err) => showAlert(err));
  }
  return Promise.resolve();
};

const initSearchInput = () => {
  const searchInput = helper.getSearchInput();
  searchInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      const searchButton = helper.getSearchButton();
      searchButton.click();
    }
  });
};

const initClearButton = () => {
  const buttonClear = helper.getClearButton();
  buttonClear.addEventListener('click', () => {
    const searchInput = helper.getSearchInput();
    searchInput.value = '';
    searchInput.focus();
  });
};

const initSearchButton = () => {
  const searchButton = helper.getSearchButton();
  searchButton.addEventListener('click', () => {
    hideAlert();
    showSpinner();
    searchButton.focus();
    getSearchValue()
      .then(() => executeMovieRequest(true, state.searchString)
        .then(() => {
          initSwiper();
          hideSpinner();
        }))
      .catch((err) => {
        hideSpinner();
        showAlert(err);
      });
  });
};

const initStartContent = () => {
  showSpinner();
  executeDefaultMovieRequest()
    .then(() => {
      initSwiper();
      hideSpinner();
      helper.showArrows();
    });
};

const addSwiperWrapperClickHandler = () => {
  getSwiperWrapper().addEventListener('click', (e) => {
    if (!e.target.classList.contains('card-title')) {
      const closest = e.target.closest('.card');
      if (closest) {
        const dataId = closest.getAttribute('data-id');
        const card = state.slides.find((slide) => slide.id === dataId);
        getBody().append(new Modal(card).render());
      }
    }
  });
};

export default function initMainPage() {
  initStartContent();
  initSearchButton();
  initSearchInput();
  initClearButton();
  addSwiperWrapperClickHandler();
}
