import { createElement, getBody } from './Helper';

export default function showInfoAlert(text) {
  const tagName = 'div';
  const className = 'alert alert-primary alert_info';
  const info = createElement(tagName, className);
  info.textContent = `Searching for '${text}'`;

  getBody().append(info);
  setTimeout(() => {
    getBody().removeChild(info);
  }, 2000);
}
