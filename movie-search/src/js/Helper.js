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

export function createElement(tagName, className, children) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (children) {
    children.forEach((child) => element.append(child));
  }
  return element;
}
