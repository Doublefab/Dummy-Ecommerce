document.addEventListener("DOMContentLoaded", () => {
  // Event listeners for login modal
  const openLoginBtn = document.getElementById("open-login");
  const closeLoginBtn = document.getElementById("close-login");
  const loginModalId = "modal-login";

  // Event listeners for registration modal
  const openRegistrationBtn = document.getElementById("open-registration");
  const closeRegistrationBtn = document.getElementById("close-registration");
  const registrationModalId = "modal-registration";

  const backdrop = document.getElementById("modalBackdrop");

  // Function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
    }
  }

  // Function to close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
    }
    backdrop.classList.add("hidden");
  }

  if (openLoginBtn && closeLoginBtn) {
    openLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(loginModalId);
      closeModal(registrationModalId);
      backdrop.classList.remove("hidden"); // Close registration modal if open
    });
    closeLoginBtn.addEventListener("click", () => closeModal(loginModalId));
  }

  if (openRegistrationBtn && closeRegistrationBtn) {
    openRegistrationBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(registrationModalId);
      closeModal(loginModalId);
      backdrop.classList.remove("hidden"); 
    });
    closeRegistrationBtn.addEventListener("click", () =>
      closeModal(registrationModalId)
    );
  }

  // Close modal when clicking outside of it
  backdrop.addEventListener("click", () => {
    closeModal(loginModalId);
    closeModal(registrationModalId);
  });
});

// const openLoginBtn = document.getElementById("open-login");
// const openRegistrationBtn = document.getElementById("open-registration");
// const modalLogin = document.getElementById("modal-login");
// const modalRegistration = document.getElementById("modal-registration");
// const closeLoginBtn = document.getElementById("close-login");
// const closeRegistrationBtn = document.getElementById("close-registration");
// const backdrop = document.getElementById('modalBackdrop');

// openLoginBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   openLogin();
//   closeRegistration();
// });

// openRegistrationBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   openRegistration();
//   closeLogin();
// });

// closeLoginBtn.addEventListener("click", confirmCloseLogin);
// closeRegistrationBtn.addEventListener("click", confirmCloseRegistration);

// // function openLogin() {
// //   modalLogin.classList.remove("hidden");
// //   backdrop.style.display = 'block';
// // }

// // function openRegistration() {
// //   modalRegistration.classList.remove("hidden");
// // }

// // function closeLogin() {
// //   modalLogin.classList.add("hidden");
// // }
// // function closeRegistration() {
// //   modalRegistration.classList.add("hidden");
// // }

// // function confirmCloseLogin() {
// //     if (confirm("Sicuro di voler uscire?")) {
// //         closeLogin();
// //     }
// // }
// // function confirmCloseRegistration() {
// //     if (confirm("Sicuro di voler uscire?")) {
// //         closeRegistration();
// //     }
// // }

// function openModal(modalId){
//   const modal = document.getElementById(modalId);
//   modal.classList.add("hidden");
// }
// function closeModal(modalId){
//   const modal = document.getElementById(modalId);
//   modal.classList.remove("hidden");
// }
