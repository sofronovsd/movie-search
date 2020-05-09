export default function translate(str) {
    const key = 'trnsl.1.1.20200509T131642Z.6a076b7ce57fa8ea.e4df4c1f41fae1a674c0739f1e952a032d281e64';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${str}&lang=ru-en`;
    return fetch(url)
        .then(response => response.json());
}
