import { getBody } from './Helper';

export default function showInfoAlert(text) {
  const info = document.createElement('div');
  info.className = 'alert alert-primary alert_info';
  info.textContent = `Searching for '${text}'`;

  getBody().append(info);
  setTimeout(() => {
    getBody().removeChild(info);
  }, 2000);
}
