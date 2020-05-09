export default class Card {
    constructor(movie) {
        this.title = movie.Title;
        this.img = movie.Poster === 'N/A' || movie.Poster === undefined ? '../img/image-not-found.png' : movie.Poster;
        this.year = movie.Year;
        this.id = movie.imdbID;
        this.rating = movie.imdbRating;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = this.img;
        img.alt = 'poster';
        img.onerror = () => {img.src = "../img/image-not-found.png"};

        card.append(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const link = document.createElement('a');
        link.href = `https://www.imdb.com/title/${this.id}`;
        link.target = '_blank';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = this.title;
        link.append(title);

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = this.year;

        const ratingBox = document.createElement('div');
        ratingBox.className = 'card__rating-box';

        const star = document.createElement('img');
        star.src = 'img/grade.svg';
        star.alt = 'star';

        const rating = document.createElement('p');
        rating.className = 'card-rating';
        rating.textContent = this.rating;

        ratingBox.append(star, rating);

        cardBody.append(link, cardText, ratingBox);

        card.append(img, cardBody);

        return card;
    }
}
