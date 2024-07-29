document.addEventListener("DOMContentLoaded", () => {
  UserService.getTest();
  const modifyButton = document.getElementById("modify-button");
  const accountForm = document.getElementById("account-form");
  const inputs = accountForm.querySelectorAll("input");

  const addButton = document.getElementById("add-button");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const addProductModal = document.getElementById("addProductModal");
  const closeButton = addProductModal.querySelector(".close-button");
  const addProductForm = document.getElementById("add-product-form");
  const productTable = document.getElementById("product-table");
  const productCategory = document.getElementById("productCategory");
  const productImageInput = document.getElementById("productImage");
  const basePath =
    "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/";

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
      productCategory.innerHTML = Object.values(response.data)
        .map(
          (category) =>
            `<option value="${category._id}">${category.category}</option>`
        )
        .join("");
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
      inputs.forEach((input) => input.removeAttribute("readonly"));
      modifyButton.innerHTML = '<i class="fas fa-save"></i>';
    } else {
      // Salva le modifiche
      inputs.forEach((input) => input.setAttribute("readonly", true));
      modifyButton.innerHTML = '<i class="fas fa-pen"></i>';

      const updatedUserData = {
        name: inputs[0].value,
        surname: inputs[1].value,
        email: inputs[2].value,
        dateOfBirth: inputs[3].value,
      };

      try {
        const headers = {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("authData")).token
          }`,
        };
        const response = await axios.put(
          `${basePath}user/${
            JSON.parse(sessionStorage.getItem("userData")).id
          }`,
          updatedUserData,
          { headers }
        );
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
      const headers = {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem("authData")).token
        }`,
      };
      const response = await axios.get(`${basePath}user/me`, { headers });
      const userData = response.data;
      console.log(userData);

      // Salva i dati dell'utente nel sessionStorage
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          id: userData._id,
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth,
        })
      );

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

  //Gestisci upload immagine in base64
  let image;

  const fileDataURL = (file) =>
    new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });

  productImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      fileDataURL(file)
        .then((result) => {
          image = {
            name: file.name,
            type: file.type,
            data: result,
          };
          console.log(image);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  // Evento per aggiungere un prodotto tramite chiamata POST
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fData = Object.fromEntries(new FormData(addProductForm));
    const newProduct = {
      ...fData,
      qty_stock: parseInt(fData.qty_stock),
      price: +fData.price,
      image: image ? image : undefined,
    };

    console.log(newProduct);
    try {
      const headers = {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem("authData")).token
        }`,
      };
      const response = await axios.post(`${basePath}products`, newProduct, {
        headers,
      });

      populateTable();

      // Chiudi la modale e resetta il form
      closeModal();
      addProductForm.reset();
      console.log(response.data);
    } catch (error) {
      console.error("Errore nell'aggiunta del prodotto:", error);
    }
  });

  // Funzione per aprire i dettagli del prodotto in una modale
  const openProductDetails = (product) => {
    const modal = document.createElement("modal-product-details");
    modal.product = product;
    document.body.appendChild(modal);
  };

  // Funzione per popolare la tabella dei prodotti

  // Gestisci l'aggiornamento e la cancellazione dei prodotti tramite eventi
  document.addEventListener("product-updated", () => {
    populateTable();
    console.log("Product updated event detected, table updated.");
  });

  document.addEventListener("product-deleted", () => {
    populateTable();
    console.log("Product deleted event detected, table updated.");
  });

  populateTable();

 
});
