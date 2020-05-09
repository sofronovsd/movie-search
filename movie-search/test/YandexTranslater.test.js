const {translate} = require('../src/js/YandexTranslater');

test('Translate should return translation of a russian word', done => {

    const mockSuccessResponse = 'mom';
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const str = 'мама';
    const translation = translate(str);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const key = 'trnsl.1.1.20200509T131642Z.6a076b7ce57fa8ea.e4df4c1f41fae1a674c0739f1e952a032d281e64';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${str}&lang=ru-en`;
    expect(global.fetch).toHaveBeenCalledWith(url);

    translation.then(trans => {
        expect(trans).toBe('mom');

        global.fetch.mockClear();
        done();
    })
});