document.addEventListener("DOMContentLoaded", () => {
    // Seleziona gli elementi per le modali e il backdrop
    const backdrop = document.getElementById("modalBackdrop");
  
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

  });
  