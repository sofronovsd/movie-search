function createCardText(textContent) {
  const cardText = document.createElement('p');
  cardText.className = 'card-text';
  cardText.textContent = textContent;
  return cardText;
}

function createStar() {
  const star = document.createElement('img');
  star.src = 'img/grade.svg';
  star.alt = 'star';
  return star;
}

function createCardBody() {
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  return cardBody;
}

function createRatingBox() {
  const ratingBox = document.createElement('div');
  ratingBox.className = 'card__rating-box';
  return ratingBox;
}

function createRow(title, value) {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.justifyContent = 'space-between';

  const titleElement = createCardText(`${title}:`);
  const valueElement = createCardText(value);
  valueElement.style.textAlign = 'right';
  row.append(titleElement, valueElement);
  return row;
}

export default class Card {
  constructor(movie) {
    this.title = movie.Title;
    this.img = movie.Poster === 'N/A' || movie.Poster === undefined ? '../img/image-not-found.png' : movie.Poster;
    this.year = movie.Year;
    this.id = movie.imdbID;
    this.rating = movie.imdbRating;
    this.actors = movie.Actors;
    this.country = movie.Country;
    this.genre = movie.Genre;
    this.plot = movie.Plot;
  }

  createImg() {
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = this.img;
    img.alt = 'poster';
    img.onerror = () => { img.src = '../img/image-not-found.png'; };
    return img;
  }

  createLink() {
    const link = document.createElement('a');
    link.href = `https://www.imdb.com/title/${this.id}`;
    link.target = '_blank';
    return link;
  }

  createTitle() {
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = this.title;
    return title;
  }

  createRating() {
    const rating = document.createElement('p');
    rating.className = 'card-rating';
    rating.textContent = this.rating;
    return rating;
  }

  createCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', this.id);
    return card;
  }

  renderCard() {
    const card = this.createCard();
    const img = this.createImg();
    const cardBody = createCardBody();
    const link = this.createLink();
    const title = this.createTitle();
    const cardText = createCardText(this.year);
    const ratingBox = createRatingBox();
    const star = createStar();
    const rating = this.createRating();

    link.append(title);
    ratingBox.append(star, rating);
    cardBody.append(link, cardText, ratingBox);
    card.append(img, cardBody);

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
