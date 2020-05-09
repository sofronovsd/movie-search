const {loadMovies, loadMovieById} = require('../src/js/OmdbRestService');

test('Service should return list of movies', done => {

    const mockSuccessResponse = Promise.resolve({Search: ['search']});
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const searchValue = 'мама';
    const page = 1;
    const movies = loadMovies(searchValue, page);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const url = `http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=34b4c91`;
    expect(global.fetch).toHaveBeenCalledWith(url);

    movies.then(response => {
        expect(response).toStrictEqual([{Search: ['search']}]);

        global.fetch.mockClear();
        done();
    })
});

test('Service should return movie', done => {

    const mockSuccessResponse = {movie: "movie"};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const id = 'id';
    const movies = loadMovieById(id);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const url = `http://www.omdbapi.com/?i=${id}&apikey=34b4c91`;
    expect(global.fetch).toHaveBeenCalledWith(url);

    movies.then(response => {
        expect(response).toBe(mockSuccessResponse);

        global.fetch.mockClear();
        done();
    })
});
