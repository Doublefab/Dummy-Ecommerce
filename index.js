const form = document.getElementById("registration-form");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("reg-email");
const passwordInput = document.getElementById("reg-password");
const dateOfBirthInput = document.getElementById("birthDate");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const payload = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dateOfBirth: dateOfBirthInput.value,
    }
    
    console.log(payload);

    axios.post('https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/user', payload)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log('Errore:', error)
        });
}); 
