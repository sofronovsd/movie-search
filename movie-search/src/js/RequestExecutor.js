import state from './State';
import * as alert from './Alert';
import Card from './Card';
import { getSwiperWrapper } from './Helper';
import { loadMovies } from './OmdbRestService';

export function executeMovieRequest(isNewSearch, searchValue) {
  state.page = isNewSearch ? 1 : state.page + 1;
  return loadMovies(searchValue, state.page)
    .then((movies) => {
      if (movies instanceof Error) {
        alert.showAlert(searchValue);
        return;
      }
      if (isNewSearch) {
        state.swiper.off('slideChange');
        state.swiper.removeAllSlides();
        state.swiper.destroy();
      }
      for (let i = 0; i < movies.length; i += 1) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.append(new Card(movies[i]).render());
        if (isNewSearch) {
          getSwiperWrapper().append(slide);
        } else {
          state.swiper.appendSlide(slide);
          state.swiper.update();
        }
      }
    })
    .catch(() => alert.showAlert(searchValue));
}

export function executeDefaultMovieRequest() {
  return loadMovies(state.searchString, state.page)
    .then((movies) => {
      if (movies instanceof Error) {
        alert.showAlert(state.searchString);
        return;
      }
      for (let i = 0; i < movies.length; i += 1) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.append(new Card(movies[i]).render());
        getSwiperWrapper().append(slide);
      }
    })
    .catch(() => alert.showAlert(state.searchString));
}
