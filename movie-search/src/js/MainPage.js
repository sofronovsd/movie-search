import * as helper from "./Helper";
import Swiper from "swiper";
import * as service from "./OmdbRestService";
import Card from "./Card";

let mySwiper;
let page = 1;

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
        showSpinner();
        hideAlert();
        searchButton.focus();
        const searchValue = getSearchValue();
        executeMovieRequest(true, searchValue)
            .then(() => {
                initSwiper();
                hideSpinner()
            });
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
    return searchInput.value.trim() === '' ? 'pie' : searchInput.value;
};

const initSwiper = () => {
    mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        speed: 1000,
        spaceBetween: 30,
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
    });

    mySwiper.on('slideChange', function () {
        const length = mySwiper.slides.length;
        if (length - mySwiper.activeIndex < 8) {
            const searchValue = getSearchValue();
            executeMovieRequest(false, searchValue)
                .then(() => hideSpinner());
        }
    });
};

const executeMovieRequest = (isNewSearch, searchValue) => {
    if (isNewSearch) {
        page = 1;
    } else {
        page++;
    }
    return service.loadMovies(searchValue, page)
        .then(movies => {
            if (movies instanceof Error) {
                showAlert(searchValue);
                return;
            }
            if (isNewSearch) {
                mySwiper.off('slideChange');
                mySwiper.removeAllSlides();
                mySwiper.destroy();
            }
            for (let i = 0; i < movies.length; i++) {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.append(new Card(movies[i]).render());
                if (isNewSearch) {
                    document.querySelector('.swiper-wrapper').append(slide);
                } else {
                    mySwiper.appendSlide(slide);
                    mySwiper.update();
                }
            }
        })
        .catch(() => showAlert(searchValue));
};

const executeDefaultMovieRequest = () => {
    const searchValue = 'pie';
    return service.loadMovies(searchValue, page)
        .then(movies => {
            if (movies instanceof Error) {
                showAlert(searchValue);
                return;
            }
            for (let i = 0; i < movies.length; i++) {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.append(new Card(movies[i]).render());
                document.querySelector('.swiper-wrapper').append(slide);
            }
        })
        .catch(() => showAlert(searchValue));
};
