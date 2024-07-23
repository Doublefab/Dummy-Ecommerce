class modalRegistration extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 
        `<div id="modal-registration" class="modal-registration hidden">
            <form id="registration-form" method="post" class="form">
                <h2>SignUp</h2>
                <div class="input">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <br>
                <div class="input">
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" name="surname" required>
                </div>
                <br>
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" id="reg-email" name="email" required>
                </div>
                <br>
                <div class="input">
                    <label for="birthDate">Date of Birth:</label>
                    <input type="date" id="birthDate" name="birthDate" required>
                </div>
                <br>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" id="reg-password" name="password" required>
                </div>
                <br>
                <div class="btn">
                    <button type="submit">SignUp</button>
                    <button id="close-registration" type="button">Back</button>
                </div>
            </form>
        </div>`;

        // Aggiungi event listener qui
        const regForm = this.querySelector("#registration-form");
        const regNameInput = this.querySelector("#name");
        const regSurnameInput = this.querySelector("#surname");
        const regEmailInput = this.querySelector("#reg-email");
        const regPasswordInput = this.querySelector("#reg-password");
        const regDateOfBirthInput = this.querySelector("#birthDate");
        const messageBox = document.getElementById("message-box");
        const loginModal = document.getElementById("modal-login");
        const regModal = this;

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

        const closeRegButton = this.querySelector("#close-registration");
        closeRegButton.addEventListener("click", () => {
            this.classList.add("hidden");
            document.getElementById("modalBackdrop").classList.add("hidden");
        });
    }
}

customElements.define('modal-registration-component', modalRegistration);
