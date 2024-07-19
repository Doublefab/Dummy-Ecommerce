const regForm = document.getElementById("registration-form");
const regNameInput = document.getElementById("name");
const regSurnameInput = document.getElementById("surname");
const regEmailInput = document.getElementById("reg-email");
const regPasswordInput = document.getElementById("reg-password");
const regDateOfBirthInput = document.getElementById("birthDate");
const messageBox = document.getElementById("message-box");
const loginModal = document.getElementById("modal-login");
const regModal = document.getElementById("modal-registration");
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

//Chiamata axios per gestire il form di registrazione
regForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const payload = {
    name: regNameInput.value,
    surname: regSurnameInput.value,
    email: regEmailInput.value,
    password: regPasswordInput.value,
    dateOfBirth: regDateOfBirthInput.value,
  };

  console.log(payload);

  axios
    .post(
      "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/user",
      payload
    )
    .then((response) => {
      console.log(response);
      messageBox.classList.remove("hidden");

      setTimeout(() => {
        messageBox.style.display = "none";
      }, 5000);

      regModal.classList.add("hidden");
      loginModal.classList.remove("hidden");
    })
    .catch((error) => {
      console.log("Errore:", error);
    });
});

//Chiamata axios per gestire il form di login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(loginForm);
  const payload = {
    email: loginEmail.value,
    password: loginPassword.value,
  }
  console.log(payload);
  axios
    .post(
      "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/user/login",
      payload
    )
    .then((response) => {
      console.log(response);
      const authData = response.data;
      console.log("Dati utente memorizzati:", authData);
      localStorage.setItem('authData', JSON.stringify(authData));

      window.location.href = "pages/profile/index.html";
    })
    .catch((error) => {
      console.log("Errore:", error);
    });
});