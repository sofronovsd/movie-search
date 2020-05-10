import { getAlert } from './Helper';
import state from './State';

export function showAlert(text) {
  const alert = getAlert();
  alert.classList.remove('alert_hidden');
  if (text === 'Movie not found!') {
    alert.textContent = `No results for "${state.searchString}"`;
  } else {
    alert.textContent = text;
  }
}

export function hideAlert() {
  const alert = getAlert();
  alert.classList.add('alert_hidden');
  alert.textContent = '';
}
