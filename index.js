document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById("registration-form");
    const regNameInput = document.getElementById("name");
    const regSurnameInput = document.getElementById("surname");
    const regEmailInput = document.getElementById("reg-email");
    const regPasswordInput = document.getElementById("reg-password");
    const regDateOfBirthInput = document.getElementById("birthDate");
    const messageBox = document.getElementById("message-box");
    const loginModal = document.getElementById("modal-login");
    const regModal = document.getElementById("modal-registration");

    if (regForm) {
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
    }

    const loginButtons = document.querySelectorAll("#open-login");
    const regButtons = document.querySelectorAll("#open-registration");
    const backdrop = document.getElementById("modalBackdrop");

    loginButtons.forEach(button => {
        button.addEventListener("click", () => {
            loginModal.classList.remove("hidden");
            backdrop.classList.remove("hidden");
        });
    });

    regButtons.forEach(button => {
        button.addEventListener("click", () => {
            regModal.classList.remove("hidden");
            backdrop.classList.remove("hidden");
        });
    });
});
