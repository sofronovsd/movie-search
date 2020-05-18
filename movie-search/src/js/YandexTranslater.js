const translate = (str) => {
  const key = process.env.YANDEX_KEY;
  const url = `${process.env.YANDEX_URL}?key=${key}&text=${str}&lang=ru-en`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.code === 200) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.message);
    });
};

export default translate;
