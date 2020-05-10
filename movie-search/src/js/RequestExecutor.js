import state from './State';
import { showAlert } from './Alert';
import Card from './Card';
import { getSwiperWrapper } from './Helper';
import { loadMovies } from './OmdbRestService';

export function executeMovieRequest(isNewSearch, searchValue) {
  state.page = isNewSearch ? 1 : state.page + 1;
  return loadMovies(searchValue, state.page)
    .then((movies) => {
      if (isNewSearch) {
        state.swiper.off('slideChange');
        state.swiper.off('click');
        state.swiper.removeAllSlides();
        state.swiper.destroy();
        state.slides.length = 0;
      }
      const cards = [];
      for (let i = 0; i < movies.length; i += 1) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const card = new Card(movies[i]);
        cards.push(card);
        slide.append(card.renderCard());
        if (isNewSearch) {
          getSwiperWrapper().append(slide);
        } else {
          state.swiper.appendSlide(slide);
          state.swiper.update();
        }
      }
      state.slides = state.slides.concat(cards);
    })
    .catch((err) => {
      showAlert(err);
    });
}

export function executeDefaultMovieRequest() {
  return loadMovies(state.searchString, state.page)
    .then((movies) => {
      const cards = [];
      for (let i = 0; i < movies.length; i += 1) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const card = new Card(movies[i]);
        cards.push(card);
        slide.append(card.renderCard());
        getSwiperWrapper().append(slide);
      }
      state.slides = state.slides.concat(cards);
    })
    .catch((err) => {
      console.log(err);
      showAlert(err);
    });
}
