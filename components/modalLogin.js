class modalLogin extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 
        `<div id="modal-login" class="modal-login hidden">
            <form id="login-form" class="form" action="" method="post">
                <h2>Login</h2>
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <br>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <br>
                <div class="btn">
                    <button type="submit">Login</button>
                    <button id="close-login" onClick=closeModal('modal-login')" type="button">Back</button>
                </div>
            </form>
        </div>`;

        // Aggiungi event listener
        const loginForm = this.querySelector("#login-form");
        const loginEmail = this.querySelector("#login-email");
        const loginPassword = this.querySelector("#login-password");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const payload = {
                email: loginEmail.value,
                password: loginPassword.value,
            };
            console.log(payload);
            UserService.me()
            axios
                .post(
                    "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/user/login",
                    payload
                )
                .then((response) => {
                    const authData = response.data;
                    sessionStorage.setItem('authData', JSON.stringify(authData));

                    window.location.href = "pages/profile/index.html";
                })
                .catch((error) => {
                    console.log("Errore:", error);
                });
        });

        const closeLoginButton = this.querySelector("#close-login");
        closeLoginButton.addEventListener("click", () => {
            this.classList.add("hidden");
            document.getElementById("modalBackdrop").classList.add("hidden");
        });
    }
}

customElements.define('modal-login-component', modalLogin);
