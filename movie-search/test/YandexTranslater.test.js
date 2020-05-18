import translate from "../src/js/YandexTranslater";

describe('Test YandexTranslater requests', () => {

    test('Translate should return translation of a russian word', done => {

        const mockSuccessResponse = {
            name: 'mom',
            code: 200
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const str = 'мама';
        const translation = translate(str);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const key = process.env.YANDEX_KEY;
        const url = `${process.env.YANDEX_URL}?key=${key}&text=${str}&lang=ru-en`;
        expect(global.fetch).toHaveBeenCalledWith(url);

        translation.then(trans => {
            expect(trans).toBe(mockSuccessResponse);

            global.fetch.mockClear();
            done();
        })
    });

    test('Translate should return error if something goes wrong', done => {

        const errorResponse = {
            code: 401,
            message: 'error'
        };
        const mockJsonPromise = Promise.resolve(errorResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const str = 'мама';
        const translation = translate(str);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const key = process.env.YANDEX_KEY;
        const url = `${process.env.YANDEX_URL}?key=${key}&text=${str}&lang=ru-en`;
        expect(global.fetch).toHaveBeenCalledWith(url);

        translation
            .catch(err => {
                expect(err).toBe(errorResponse.message);

                global.fetch.mockClear();
                done();
            })
    });
});
