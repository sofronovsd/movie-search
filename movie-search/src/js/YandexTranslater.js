const translate = (str) => {
  const key = 'trnsl.1.1.20200509T131642Z.6a076b7ce57fa8ea.e4df4c1f41fae1a674c0739f1e952a032d281e641';
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${str}&lang=ru-en`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.code === 200) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.message);
    });
};

module.exports = { translate };
