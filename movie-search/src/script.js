import './sass/style.scss';
import initMainPage from './js/MainPage';

require('dotenv').config();

window.onload = () => {
  initMainPage();
};
