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
    const basePath='https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/';
    populateTable();
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
    modifyButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (modifyButton.innerHTML.includes("fa-pen")) {
            inputs.forEach(input => input.removeAttribute("readonly"));
            modifyButton.innerHTML = '<i class="fas fa-save"></i>';
        } else {
            inputs.forEach(input => input.setAttribute("readonly", true));
            modifyButton.innerHTML = '<i class="fas fa-pen"></i>';
            console.log("Modifiche salvate:", {
                name: inputs[0].value,
                surname: inputs[1].value,
                email: inputs[2].value,
                birthDate: inputs[3].value
            });
        }
    });

    // Evento per aggiungere un prodotto tramite chiamata POST
    addProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fData = Object.fromEntries(new FormData(addProductForm)) ;
        const newProduct = {
            ...fData,
            qty_stock: parseInt(fData.qty_stock),
            price: +fData.price
        };

        try {
            const headers = {Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}`}
            const response = await axios.post(`${basePath}products`, newProduct, { headers });
            // newProduct.id = response.data.id;

            // // Aggiungi il prodotto alla tabella
            // const newRow = document.createElement("tr");
            // newRow.innerHTML = getProductRow(newProduct)
            // productTableBody.appendChild(newRow);

            // // Mostra la sezione della tabella se nascosta
            // productTableSection.style.display = 'block';
             populateTable();
            // Chiudi la modale e resetta il form
            closeModal();
            addProductForm.reset();
        } catch (error) {
            console.error("Errore nell'aggiunta del prodotto:", error);
        }
    });
    const populateTable = async ()=>{
        //chiami la getAll e popoli la tabella
        // questo metodo da richiamare in onload e quando viene fatta una create
    }
    const getProductRow = (product)=>{
            return `
              <td>${product.name}</td>
                <td>${addProductForm.productCategory.options[addProductForm.productCategory.selectedIndex].text}</td>
                <td>${product.price.toFixed(2)}€</td>
                <td>${product.qty_stock}</td>
                <td>${product.description}</td>
                <td><span class="status-indicator ${product.status === "active" ? "green" : "red"}"></span></td>
            `
    }
});
