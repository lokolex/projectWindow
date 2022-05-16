const modals = (state) => {
  let checkOpen;
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');

    let kHelp = 1;

    const showModal = () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };

    const messageRemove = () => {
      showModal();
      divMessage.remove();
      kHelp = 1;
      return kHelp;
    };

    const divMessage = document.createElement('div');
    divMessage.innerHTML = 'Заполните все поля!';
    divMessage.style.marginTop = '10px';
    divMessage.style.color = 'red';
    

    trigger.forEach(item => {
      if (kHelp) {
        item.addEventListener('click', (e) => {
          if (e.target) {
            e.preventDefault();
          }

          //мой код
          if (item.classList.contains('popup_calc_button')) {
            if (!state.height || !state.width) {
              document.querySelector('.popup_calc_content').append(divMessage);
              kHelp = 0;
              return kHelp;
            } else {
              messageRemove();
            }
          } else if (item.classList.contains('popup_calc_profile_button')) {
            if (!state.profile) {
              document.querySelector('.popup_calc_profile_content').append(divMessage);
              kHelp = 0;
              return kHelp;
            } else {
              messageRemove();
            }
          } else {
            showModal();
          }
  
          if (checkOpen) {
            clearInterval(checkOpen);
          }
        });
      }
      
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === "Escape") {
        windows.forEach(item => {
          item.style.display = 'none';
        });
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
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

  checkOpen = showModalByTime('.popup', 60000);
  
};

export default modals;