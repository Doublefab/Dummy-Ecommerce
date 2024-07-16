const openLoginBtn = document.getElementById("open-login");
const openRegistrationBtn = document.getElementById("open-registration");
const modalLogin = document.getElementById("modal-login");
const modalRegistration = document.getElementById("modal-registration");
const closeLoginBtn = document.getElementById("close-login");
const closeRegistrationBtn = document.getElementById("close-registration");

openLoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  openLogin();
  closeRegistration();
});

openRegistrationBtn.addEventListener("click", function (e) {
  e.preventDefault();
  openRegistration();
  closeLogin();
});

closeLoginBtn.addEventListener("click", confirmCloseLogin);
closeRegistrationBtn.addEventListener("click", confirmCloseRegistration);

function openLogin() {
  modalLogin.classList.remove("hidden");
}

function openRegistration() {
  modalRegistration.classList.remove("hidden");
}

function closeLogin() {
  modalLogin.classList.add("hidden");
}
function closeRegistration() {
  modalRegistration.classList.add("hidden");
}

function confirmCloseLogin() {
    if (confirm("Sicuro di voler uscire?")) {
        closeLogin();
    }
}
function confirmCloseRegistration() {
    if (confirm("Sicuro di voler uscire?")) {
        closeRegistration();
    }
}