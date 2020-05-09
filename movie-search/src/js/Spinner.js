import { getSpinner } from './Helper';

export function hideSpinner() {
  const spinner = getSpinner();
  spinner.classList.add('spinner_hidden');
}

export function showSpinner() {
  const spinner = getSpinner();
  spinner.classList.remove('spinner_hidden');
}
