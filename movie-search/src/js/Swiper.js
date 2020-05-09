import Swiper from 'swiper';
import state from './State';
import { executeMovieRequest } from './RequestExecutor';
import { hideSpinner, showSpinner } from './Spinner';

export default function initSwiper() {
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
    },
  });

  state.swiper.on('slideChange', () => {
    const { length } = state.swiper.slides;
    if (length - state.swiper.activeIndex < 8) {
      showSpinner();
      executeMovieRequest(false, state.searchString)
        .then(() => hideSpinner());
    }
  });
}
