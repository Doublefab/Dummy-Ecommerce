document.addEventListener("DOMContentLoaded", () => {
    // Seleziona gli elementi per le modali e il backdrop
    const backdrop = document.getElementById("modalBackdrop");
    
    const openLoginBtns = document.querySelectorAll("#open-login");
    const closeLoginBtn = document.getElementById("close-login");
    
    const openRegistrationBtns = document.querySelectorAll("#open-registration");
    const closeRegistrationBtn = document.getElementById("close-registration");
  
    // Funzione per aprire una modale
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("hidden");
        backdrop.classList.remove("hidden");
      } else {
        console.error(`Elemento con ID ${modalId} non trovato.`);
      }
    }
  
    // Funzione per chiudere una modale
    function closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("hidden");
        backdrop.classList.add("hidden");
      } else {
        console.error(`Elemento con ID ${modalId} non trovato.`);
      }
      backdrop.classList.add("hidden");
    }
  
    // Aggiungi event listeners ai pulsanti di apertura delle modali
    openLoginBtns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal("modal-login");
        closeModal("modal-registration");
      });
    });
  
    openRegistrationBtns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal("modal-registration");
        closeModal("modal-login");
      });
    });
  
    // Aggiungi event listeners ai pulsanti di chiusura delle modali
    if (closeLoginBtn) {
      closeLoginBtn.addEventListener("click", () => closeModal("modal-login"));
    }
  
    if (closeRegistrationBtn) {
      closeRegistrationBtn.addEventListener("click", () => closeModal("modal-registration"));
    }
  
    // Chiudi modale quando si clicca sul backdrop
    backdrop.addEventListener("click", () => {
      closeModal("modal-login");
      closeModal("modal-registration");
    });
  });
  