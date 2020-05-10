import { getBody } from './Helper';

function createModalFade() {
  const modalFade = document.createElement('div');
  modalFade.className = 'modal fade show';
  modalFade.addEventListener('click', (e) => {
    if (!e.target.classList.contains('card-title')) {
      getBody().removeChild(modalFade);
    }
  });
  return modalFade;
}

function createModalDialog() {
  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-dialog-scrollable';
  return modalDialog;
}

function createModalContent() {
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  return modalContent;
}

function createModalBody(element) {
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.append(element);
  return modalBody;
}

export default class Modal {
  constructor(card) {
    this.card = card;
  }

  render() {
    const modalFade = createModalFade();
    const modalDialog = createModalDialog();
    const modalContent = createModalContent();
    const modalBody = createModalBody(this.card.renderModal());

    modalContent.append(modalBody);
    modalDialog.append(modalContent);
    modalFade.append(modalDialog);
    return modalFade;
  }
}
