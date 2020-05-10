export function getAlert() {
  return document.querySelector('.alert');
}

export function getSpinner() {
  return document.querySelector('.spinner');
}

export function getClearButton() {
  return document.querySelector('.btn_clear');
}

export function getSwiperWrapper() {
  return document.querySelector('.swiper-wrapper');
}

export function getBody() {
  return document.querySelector('body');
}

export function getSearchInput() {
  return document.getElementById('search-input');
}

export function getSearchButton() {
  return document.getElementById('search-button');
}

export function showArrows() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach((el) => el.classList.remove('arrow_hidden'));
}
