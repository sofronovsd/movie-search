export function loadMovies(searchValue, page) {
    let url = `http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=34b4c91`;
    return fetch(url)
        .then(response => response.json())
        .then(response => Promise.all(response.Search.map(movie => this.loadMovieById(movie.imdbID))))
}

export function loadMovieById(id) {
    const movieInfoUrl = `http://www.omdbapi.com/?i=${id}&apikey=34b4c91`;
    return fetch(movieInfoUrl)
        .then(response => response.json());
}

