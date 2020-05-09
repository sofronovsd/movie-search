import { getAlert } from './Helper';

export function showAlert(text) {
  const alert = getAlert();
  alert.classList.remove('alert_hidden');
  alert.textContent = `No results for "${text}"`;
}

export function hideAlert() {
  const alert = getAlert();
  alert.classList.add('alert_hidden');
  alert.textContent = '';
}
