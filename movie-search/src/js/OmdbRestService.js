export function loadMovies(searchValue, page) {
    let url = `http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=34b4c91`;
    return fetch(url)
        .then(response => response.json())
        .then(response => Promise.all(response.Search.map(movie => this.loadMovieByTitle(movie.Title))))
}

export function loadMovieByTitle(title) {
    const movieInfoUrl = `http://www.omdbapi.com/?t=${title}&apikey=34b4c91`;
    return fetch(movieInfoUrl)
        .then(response => response.json());
}

