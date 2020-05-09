import * as helper from "./Helper";
import Swiper from "swiper";
import * as service from "./OmdbRestService";
import Card from "./Card";
import state from "./State";
import translate from "./YandexTranslater";

export default function initMainPage() {
    initStartContent();
    initSearchButton();
    initSearchInput();
    initClearButton();
}

function initSearchInput() {
    const searchInput = helper.getSearchInput();
    searchInput.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            const searchButton = helper.getSearchButton();
            searchButton.click();
        }
    });
}

function initClearButton() {
    const buttonClear = helper.getClearButton();
    buttonClear.addEventListener('click', () => {
        const searchInput = helper.getSearchInput();
        searchInput.value = '';
        searchInput.focus();
    })
}

function initSearchButton() {
    const searchButton = helper.getSearchButton();
    searchButton.addEventListener('click', () => {
        hideAlert();
        showSpinner();
        searchButton.focus();
        getSearchValue()
            .then(() => executeMovieRequest(true, state.searchString)
                .then(() => {
                    initSwiper();
                    hideSpinner()
                })
            )
            .catch(() => {
                hideSpinner();
                showAlert(state.searchString)
            })
    });
}

function initStartContent() {
    showSpinner();
    executeDefaultMovieRequest()
        .then(() => {
            initSwiper();
            hideSpinner();
        });
}

const showAlert = (text) => {
    const alert = helper.getAlert();
    alert.classList.remove('alert_hidden');
    alert.textContent = `No results for "${text}"`;
};

const hideAlert = () => {
    const alert = helper.getAlert();
    alert.classList.add('alert_hidden');
    alert.textContent = ``;
};

const hideSpinner = () => {
    const spinner = helper.getSpinner();
    spinner.classList.add('spinner_hidden');
};

const showSpinner = () => {
    const spinner = helper.getSpinner();
    spinner.classList.remove('spinner_hidden');
};

const getSearchValue = () => {
    const searchInput = helper.getSearchInput();
    const searchValue = searchInput.value;
    state.searchString = searchValue;
    if (/[А-яЁё]/.test(searchValue)) {
        return translate(searchValue)
            .then(response => state.searchString = response.text[0]);
    } else {
        return Promise.resolve();
    }
};

const initSwiper = () => {
    state.swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 50,
        speed: 1000,
        grabCursor: true,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            376: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    });

    state.swiper.on('slideChange', function () {
        const length = state.swiper.slides.length;
        if (length - state.swiper.activeIndex < 8) {
            executeMovieRequest(false, state.searchString)
                .then(() => hideSpinner());
        }
    });
};

const executeMovieRequest = (isNewSearch, searchValue) => {
    state.page = isNewSearch ? 1 : state.page + 1;
    return service.loadMovies(searchValue, state.page)
        .then(movies => {
            if (movies instanceof Error) {
                showAlert(searchValue);
                return;
            }
            if (isNewSearch) {
                state.swiper.off('slideChange');
                state.swiper.removeAllSlides();
                state.swiper.destroy();
            }
            for (let i = 0; i < movies.length; i++) {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.append(new Card(movies[i]).render());
                if (isNewSearch) {
                    document.querySelector('.swiper-wrapper').append(slide);
                } else {
                    state.swiper.appendSlide(slide);
                    state.swiper.update();
                }
            }
        })
        .catch(() => showAlert(searchValue));
};

const executeDefaultMovieRequest = () => {
    return service.loadMovies(state.searchString, state.page)
        .then(movies => {
            if (movies instanceof Error) {
                showAlert(state.searchString);
                return;
            }
            for (let i = 0; i < movies.length; i++) {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.append(new Card(movies[i]).render());
                document.querySelector('.swiper-wrapper').append(slide);
            }
        })
        .catch(() => showAlert(state.searchString));
};
