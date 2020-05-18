const loadMovieById = (id) => {
  const movieInfoUrl = `${process.env.OMDB_URL}?i=${id}&apikey=${process.env.OMDB_KEY}`;
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
  const url = `${process.env.OMDB_URL}?s=${searchValue}&page=${page}&apikey=${process.env.OMDB_KEY}`;
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
