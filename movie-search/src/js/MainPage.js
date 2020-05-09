import * as helper from './Helper';
import { showSpinner, hideSpinner } from './Spinner';
import { showAlert, hideAlert } from './Alert';
import state from './State';
import { translate } from './YandexTranslater';
import initSwiper from './Swiper';
import { executeDefaultMovieRequest, executeMovieRequest } from './RequestExecutor';

const getSearchValue = () => {
  const searchInput = helper.getSearchInput();
  const searchValue = searchInput.value;
  state.searchString = searchValue;
  if (/[А-яЁё]/.test(searchValue)) {
    return translate(searchValue)
      .then((response) => {
        [state.searchString] = response.text;
      });
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
      .catch(() => {
        hideSpinner();
        showAlert(state.searchString);
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

export default function initMainPage() {
  initStartContent();
  initSearchButton();
  initSearchInput();
  initClearButton();
}
