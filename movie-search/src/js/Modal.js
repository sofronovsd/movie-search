import { createElement, getBody } from './Helper';

function createModalFade(child) {
  const tagName = 'div';
  const className = 'modal fade show';
  const modalFade = createElement(tagName, className, [child]);
  modalFade.addEventListener('click', (e) => {
    if (!e.target.classList.contains('card-title')) {
      getBody().removeChild(modalFade);
    }
  });
  return modalFade;
}

function createModalBody(child) {
  const tagName = 'div';
  const className = 'modal-body';
  return createElement(tagName, className, [child]);
}

function createModalContent(child) {
  const tagName = 'div';
  const className = 'modal-content';
  return createElement(tagName, className, [child]);
}

function createModalDialog(child) {
  const tagName = 'div';
  const className = 'modal-dialog modal-dialog-scrollable';
  return createElement(tagName, className, [child]);
}

export default class Modal {
  constructor(card) {
    this.card = card;
  }

  render() {
    const modalBody = createModalBody(this.card.renderModal());
    const modalContent = createModalContent(modalBody);
    const modalDialog = createModalDialog(modalContent);
    const modalFade = createModalFade(modalDialog);

    return modalFade;
  }
}
