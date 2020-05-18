import {loadMovieById, loadMovies} from "../src/js/OmdbRestService";

describe('Test OmdbRestService requests', () => {

    test('Service should return list of movies', done => {

        const successResponseObject = {
            Search: ['search'],
            Response: 'True'
        };
        const mockSuccessResponse = Promise.resolve(successResponseObject);
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const searchValue = 'мама';
        const page = 1;
        const movies = loadMovies(searchValue, page);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const url = `${process.env.OMDB_URL}?s=${searchValue}&page=${page}&apikey=${process.env.OMDB_KEY}`;
        expect(global.fetch).toHaveBeenCalledWith(url);

        movies.then(response => {
            expect(response).toStrictEqual([successResponseObject]);

            global.fetch.mockClear();
            done();
        })
    });

    test('Service should return movie', done => {

        const mockSuccessResponse = {movie: "movie", Response: 'True'};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const id = 'id';
        const movies = loadMovieById(id);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const url = `${process.env.OMDB_URL}?i=${id}&apikey=${process.env.OMDB_KEY}`;
        expect(global.fetch).toHaveBeenCalledWith(url);

        movies.then(response => {
            expect(response).toBe(mockSuccessResponse);

            global.fetch.mockClear();
            done();
        })
    });

    test('Service should return error if something goes wrong', done => {

        const errorResponseObject = {
            Error: 'error',
            Response: 'False'
        };
        const mockErrorResponse = Promise.resolve(errorResponseObject);
        const mockJsonPromise = Promise.resolve(mockErrorResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const searchValue = 'мама';
        const page = 1;
        const movies = loadMovies(searchValue, page);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const url = `${process.env.OMDB_URL}?s=${searchValue}&page=${page}&apikey=${process.env.OMDB_KEY}`;
        expect(global.fetch).toHaveBeenCalledWith(url);

        movies
            .catch(err => {
                expect(err).toStrictEqual(errorResponseObject.Error);

                global.fetch.mockClear();
                done();
            })
    });

});
