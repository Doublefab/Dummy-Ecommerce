class modalRegistration extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div id="modal-registration" class="hidden">
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
                    <input type="email" id="email" name="email" required>
                </div>
                <br>
                <div class="input">
                    <label for="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" required>
                </div>
                <br>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <br>
                <div class="btn">
                    <button type="submit">SignUp</button>
                    <button id="close-registration" type="button">Back</button>
                </div>
            </form>
        </div>`;

    // const form = this.querySelector("#registration-form");
    // const closeButton = this.querySelector("#close-registration");
    // /**
    //  * 
    //  * @param {Event} e 
    //  */
    // const register = async function(e){
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const newUserData = Object.fromEntries(formData);
    //     await UserService.create(newUserData);
    // }

    // const close = function(){
    //     this.classList.add("hidden");
    //     this.getElementById("modalBackdrop").classList.add("hidden");
    // }

    // form.addEventListener("submit", register);
    // closeButton.addEventListener("click", close);
  }
}

customElements.define("modal-registration-component", modalRegistration);
