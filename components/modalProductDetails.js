const basePath =
    "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/";
class ModalProductDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.image = null;
        // console.log(JSON.stringify(populateTable));
    }

    connectedCallback() {
        this.render();
    }

    set product(product) {
        this._product = product;
        console.log('this',this)
        this.render();
    }

    render() {
        if (!this._product) return;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <style>
                .modal {
                    display: block;
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.5); 
                    padding: 20px;
                }

                .modal-content {
                    position: relative;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    max-width: 400px;
                    margin: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .modal-buttons {
                    display: flex;
                    justify-content: flex-end;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }

                .edit-button,
                .save-button {
                    border: none;
                    outline: 0;
                    padding: 10px;
                    color: white;
                    background-color: #1e537c;
                    text-align: center;
                    cursor: pointer;
                    font-size: 16px;
                    border-radius: 5px;
                }

                .edit-button {
                    display: block;
                }

                .save-button {
                    display: none;
                }

                .edit-button:hover,
                .save-button:hover {
                    opacity: 0.7;
                }

                .modal-buttons i {
                    font-size: 20px;
                }

                .cancel-button {
                    border: none;
                    outline: 0;
                    background: none;
                    color: #1e537c;
                    cursor: pointer;
                    font-size: 20px;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                }

                .cancel-button:hover {
                    opacity: 0.7;
                }

                .product-details {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5em;
                    width: 100%;
                }

                .product-details img {
                    max-width: 50%;
                    height: auto;
                    border-radius: 8px;
                    object-fit: cover;
                }

                .product-details h2 {
                    font-size: 24px;
                    margin: 0;
                }

                .product-details label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 3px;
                }

                .product-details input,
                .product-details textarea {
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px;
                    font-size: 16px;
                    margin-bottom: 10px;
                }

                .status-indicator {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .status-active {
                    background-color: green;
                }

                .status-inactive {
                    background-color: red;
                }

                .editable {
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px;
                    font-size: 16px;
                }
            </style>

            <div class="modal">
                <div class="modal-content">
                    <button class="cancel-button"><i class="fas fa-trash-alt"></i></button>
                    <div class="modal-buttons">
                        <button class="edit-button"><i class="fas fa-pen"></i></button>
                        <button class="save-button"><i class="fas fa-save"></i></button>
                    </div>
                    <div class="product-details">
                        <h2 id="product-name">${this._product.name}</h2>
                        <img src="${this._product.image.data}" alt="${this._product.name}">
                        <label for="product-category">Category:</label>
                        <span id="product-category">${this._product.category.category}</span>
                        <label for="product-price">Price(€):</label>
                        <input type="text" id="product-price" value="${this._product.price}" class="editable" readonly>
                        <label for="product-qty-stock">Stock Quantity:</label>
                        <input type="text" id="product-qty-stock" value="${this._product.qty_stock}" class="editable" readonly>
                        <label for="product-description">Description:</label>
                        <textarea id="product-description" class="editable" readonly>${this._product.description}</textarea>
                        <label for="product-status">Status:</label>
                        <span id="product-status" class="status-indicator ${this._product.status === 'active' ? 'status-active' : 'status-inactive'}"></span>
                        <input type="file" id="product-image-input" accept="image/*" style="display: none;">
                        <button id="change-image-button" style="display: none;">Change Image</button>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector(".cancel-button").addEventListener("click", () => {
            this.deleteProduct();
        });

        this.shadowRoot.querySelector(".edit-button").addEventListener("click", () => {
            this.toggleEditMode(true);
        });

        this.shadowRoot.querySelector(".save-button").addEventListener("click", () => {
            this.saveChanges();
        });

        this.shadowRoot.querySelector("#product-status").addEventListener("click", () => {
            this.toggleStatus();
        });

        this.shadowRoot.querySelector("#change-image-button").addEventListener("click", () => {
            this.shadowRoot.querySelector("#product-image-input").click();
        });

        this.shadowRoot.querySelector("#product-image-input").addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.image = {
                        name: file.name,
                        type: file.type,
                        data: reader.result,
                    };
                };
                reader.readAsDataURL(file);
            }
        });

        this.style.display = "block";

         // Click sul backdrop per chiudere la modale
         this.shadowRoot.querySelector(".modal").addEventListener("click", (e) => {
            if (e.target === this.shadowRoot.querySelector(".modal")) {
                this.remove();
            }
        });
    }
     

    async deleteProduct() {
        try {
            const headers = {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authData")).token}`,
            };
            const response = await axios.delete(`${basePath}products/${this._product._id}`, { headers });
            console.log("Prodotto cancellato:", response.data);
    
            // Emetti un evento personalizzato per notificare la cancellazione
            this.dispatchEvent(new CustomEvent('product-deleted', { detail: { productId: this._product._id }, bubbles: true }));
            this.remove();
            // window.location.reload();
            alert("Prodotto cancellato con successo!");
        } catch (error) {
            console.error("Errore nella cancellazione del prodotto:", error);
            alert("Si è verificato un errore durante la cancellazione del prodotto.");
        }
    }

    

    toggleEditMode(editMode) {
        const inputs = this.shadowRoot.querySelectorAll(".editable");
        inputs.forEach(input => input.readOnly = !editMode);
        this.shadowRoot.querySelector(".save-button").style.display = editMode ? "block" : "none";
        this.shadowRoot.querySelector(".edit-button").style.display = editMode ? "none" : "block";
        this.shadowRoot.querySelector("#change-image-button").style.display = editMode ? "block" : "none";
    }

    async saveChanges() {
        const updatedProduct = {
            name: this.shadowRoot.querySelector("#product-name").textContent,
            price: parseFloat(this.shadowRoot.querySelector("#product-price").value),
            qty_stock: parseInt(this.shadowRoot.querySelector("#product-qty-stock").value),
            description: this.shadowRoot.querySelector("#product-description").value,
            status: this.shadowRoot.querySelector("#product-status").classList.contains('status-active') ? 'active' : 'inactive'
        };

        if (this.image) {
            updatedProduct.image = this.image;
        }

        try {
            const headers = {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authData")).token}`,
            };
            const response = await axios.put(`${basePath}products/${this._product._id}`, updatedProduct, { headers });
            console.log("Prodotto aggiornato:", response.data);

            this.dispatchEvent(new CustomEvent('product-updated', { detail: { productId: this._product._id }, bubbles: true }));
            this.remove();
            alert("Prodotto aggiornato con successo!");
        } catch (error) {
            console.error("Errore nell'aggiornamento del prodotto:", error);
            alert("Si è verificato un errore durante l'aggiornamento del prodotto.");
        }
    }

    toggleStatus() {
        const statusIndicator = this.shadowRoot.querySelector("#product-status");
        const isActive = statusIndicator.classList.contains('status-active');
        statusIndicator.classList.toggle('status-active', !isActive);
        statusIndicator.classList.toggle('status-inactive', isActive);
    }
}

customElements.define("modal-product-details", ModalProductDetails);
