const loadMovieById = (id) => {
  const movieInfoUrl = `https://www.omdbapi.com/?i=${id}&apikey=34b4c91`;
  return fetch(movieInfoUrl)
    .then((response) => response.json())
    .then((response) => {
      if (response.Response === 'True') {
        return Promise.resolve(response);
      }
      return Promise.reject(response.Error);
    });
};

const loadMovies = (searchValue, page) => {
  const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=34b4c91`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.Response === 'True') {
        const promises = response.Search.map((movie) => loadMovieById(movie.imdbID));
        return Promise.all(promises);
      }
      return Promise.reject(response.Error);
    });
};

export { loadMovies, loadMovieById };
