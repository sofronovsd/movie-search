const loadMovieById = (id) => {
  const movieInfoUrl = `https://www.omdbapi.com/?i=${id}&apikey=34b4c91`;
  return fetch(movieInfoUrl)
    .then((response) => response.json());
};

const loadMovies = (searchValue, page) => {
  const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=34b4c91`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const promises = response.Search.map((movie) => loadMovieById(movie.imdbID));
      return Promise.all(promises);
    });
};

module.exports = { loadMovies, loadMovieById };
