document.addEventListener("DOMContentLoaded", () => {
    const modifyButton = document.getElementById("modify-button");
    const accountForm = document.getElementById("account-form");
    const inputs = accountForm.querySelectorAll("input");

    const addButton = document.getElementById("add-button");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const addProductModal = document.getElementById("addProductModal");
    const closeButton = addProductModal.querySelector(".close-button");
    const addProductForm = document.getElementById("add-product-form");
    const productTableSection = document.querySelector(".product-section");
    const productTable = document.getElementById("product-table");
    const productTableBody = productTable.querySelector("tbody");
    const productCategory = document.getElementById("productCategory");
    const basePath = 'https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/';

    // Funzione per aprire la modale
    const openModal = () => {
        modalBackdrop.classList.remove("hidden");
        addProductModal.classList.remove("hidden");
    };

    // Funzione per chiudere la modale
    const closeModal = () => {
        modalBackdrop.classList.add("hidden");
        addProductModal.classList.add("hidden");
    };

    // Aggiungi eventi di click per aprire e chiudere la modale
    addButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);

    // Funzione per caricare le categorie tramite chiamata GET
    const loadCategories = async () => {
        try {
            const response = await axios.get(`${basePath}category`);
            productCategory.innerHTML = Object.values(response.data).map(category =>
                `<option value="${category._id}">${category.category}</option>`
            ).join('');
        } catch (error) {
            console.error("Errore nel caricamento delle categorie:", error);
        }
    };

    // Carica le categorie quando la pagina viene caricata
    loadCategories();

    // Evento per la modifica dei dati dell'account
    modifyButton.addEventListener("click", async (e) => {
        e.preventDefault();
        if (modifyButton.innerHTML.includes("fa-pen")) {
            inputs.forEach(input => input.removeAttribute("readonly"));
            modifyButton.innerHTML = '<i class="fas fa-save"></i>';
        } else {
            // Salva le modifiche
            inputs.forEach(input => input.setAttribute("readonly", true));
            modifyButton.innerHTML = '<i class="fas fa-pen"></i>';

            const updatedUserData = {
                name: inputs[0].value,
                surname: inputs[1].value,
                email: inputs[2].value,
                dateOfBirth: inputs[3].value
            };

            try {
                const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}` };
                const response = await axios.put(`${basePath}user/${JSON.parse(localStorage.getItem('userData')).id}`, updatedUserData, { headers });
                console.log("Modifiche salvate:", response.data);
                
                alert("Dati aggiornati con successo!");
            } catch (error) {
                console.error("Errore nell'aggiornamento dei dati dell'utente:", error);
                alert("Si è verificato un errore durante l'aggiornamento dei dati.");
            }
        }
    });

    // Funzione per popolare il form con i dati dell'utente
    const loadUserData = async () => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}` };
            const response = await axios.get(`${basePath}user/me`, { headers });
            const userData = response.data;
            console.log(userData);

            // Salva i dati dell'utente nel localStorage
            localStorage.setItem('userData', JSON.stringify({
                id: userData._id,
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                dateOfBirth: userData.dateOfBirth
            }));

            // Popola il form con i dati dell'utente
            document.getElementById("name").value = userData.name;
            document.getElementById("surname").value = userData.surname;
            document.getElementById("email").value = userData.email;
            document.getElementById("birthDate").value = userData.dateOfBirth;
        } catch (error) {
            console.error("Errore nel caricamento dei dati dell'utente:", error);
        }
    };

    loadUserData();

    // Evento per aggiungere un prodotto tramite chiamata POST
    addProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fData = Object.fromEntries(new FormData(addProductForm));
        const newProduct = {
            ...fData,
            qty_stock: parseInt(fData.qty_stock),
            price: +fData.price
        };

        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}` };
            const response = await axios.post(`${basePath}products`, newProduct, { headers });

            populateTable();

            // Chiudi la modale e resetta il form
            closeModal();
            addProductForm.reset();
            console.log(response.data);
        } catch (error) {
            console.error("Errore nell'aggiunta del prodotto:", error);
        }
    });

    const populateTable = async () => {
        // Chiama la getAll e popola la tabella
        // Questo metodo da richiamare in onload e quando viene fatta una create
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}` };
            const response = await axios.get(`${basePath}products`, { headers });
            const products = response.data;
            console.log(response.data);
            productTableBody.innerHTML = products.map(product => {
                return `
                    <tr>
                        ${getProductRow(product)}
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error("Errore nel caricamento dei prodotti:", error);
        }
    };

    populateTable();

    const getProductRow = (product) => {
        return `
            <td>${product.name}</td>
            <td>${product.category.category}</td>
            <td>${product.price.toFixed(2)}€</td>
            <td>${product.qty_stock}</td>
            <td>${product.description}</td>
            <td><span class="status-indicator ${product.status === "active" ? "green" : "red"}"></span></td>
        `;
    };
});
