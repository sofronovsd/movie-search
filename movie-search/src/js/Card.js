import { createElement } from './Helper';

function createCardText(textContent) {
  const tagName = 'p';
  const className = 'card-text';
  const cardText = createElement(tagName, className);
  cardText.textContent = textContent;
  return cardText;
}

function createStar() {
  const tagName = 'img';
  const star = createElement(tagName);
  star.src = 'img/grade.svg';
  star.alt = 'star';
  return star;
}

function createCardBody(children) {
  const tagName = 'div';
  const className = 'card-body';
  return createElement(tagName, className, children);
}

function createRatingBox(children) {
  const tagName = 'div';
  const className = 'card__rating-box';
  return createElement(tagName, className, children);
}

function createRow(title, value) {
  const titleElement = createCardText(`${title}:`);
  const valueElement = createCardText(value);
  valueElement.classList.add('card-text_right');

  const tagName = 'div';
  const className = 'card__row';
  return createElement(tagName, className, [titleElement, valueElement]);
}

export default class Card {
  constructor(movie) {
    this.title = movie.Title;
    this.img = !movie.Poster || movie.Poster === 'N/A' ? '../img/image-not-found.png' : movie.Poster;
    this.year = movie.Year;
    this.id = movie.imdbID;
    this.rating = movie.imdbRating;
    this.actors = movie.Actors;
    this.country = movie.Country;
    this.genre = movie.Genre;
    this.plot = movie.Plot;
  }

  createImg() {
    const tagName = 'img';
    const className = 'card-img-top';
    const img = createElement(tagName, className);
    img.src = this.img;
    img.alt = 'poster';
    img.onerror = () => { img.src = '../img/image-not-found.png'; };
    return img;
  }

  createLink(child) {
    const tagName = 'a';
    const link = createElement(tagName, [child]);
    link.href = `https://www.imdb.com/title/${this.id}`;
    link.target = '_blank';
    return link;
  }

  createTitle() {
    const tagName = 'h5';
    const className = 'card-title';
    const title = createElement(tagName, className);
    title.textContent = this.title;
    return title;
  }

  createRating() {
    const tagName = 'p';
    const className = 'card-rating';
    const rating = createElement(tagName, className);
    rating.textContent = this.rating;
    return rating;
  }

  createCard(children) {
    const tagName = 'div';
    const className = 'card';
    const card = createElement(tagName, className, children);
    card.setAttribute('data-id', this.id);
    return card;
  }

  renderCard() {
    const img = this.createImg();
    const title = this.createTitle();
    const link = this.createLink(title);
    const cardText = createCardText(this.year);
    const star = createStar();
    const rating = this.createRating();
    const ratingBox = createRatingBox([star, rating]);
    const cardBody = createCardBody([link, cardText, ratingBox]);
    const card = this.createCard([img, cardBody]);

    return card;
  }

  renderModal() {
    const card = this.renderCard();
    const row1 = createRow('Country', this.country);
    const row2 = createRow('Genre', this.genre);
    const row3 = createRow('Actors', this.actors);
    const row4 = createRow('Plot', this.plot);
    card.querySelector('.card-body').append(row1, row2, row3, row4);
    return card;
  }
}
