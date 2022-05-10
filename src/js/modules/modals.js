const modals = () => {
  let checkOpen;
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }
  
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (checkOpen) {
          clearInterval(checkOpen);
        }

      });
    });

    close.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === "Escape") {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  const showModalByTime = function(selector, time) {
    return setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  };

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  checkOpen = showModalByTime('.popup', 60000);
  
};

export default modals;