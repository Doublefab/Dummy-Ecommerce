const productTableBody = document.getElementById("product-table-body");

const populateTable = async () => {
    // console.log('populateTable')
    try {
      const headers = {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem("authData")).token
        }`,
      };
      const response = await axios.get(
        `${basePath}products?page=1&limit=10&order=ASC`,
        { headers }
      );
      const products = response.data.products;
      if (Array.isArray(products) && products.length > 0) {
        productTableBody.innerHTML = products
          .map((product) => {
            return `
                      <tr>
                          ${getProductRow(product)}
                      </tr>
                  `;
          })
          .join("");

        // Aggiungi eventi di click per le righe della tabella
        productTableBody.querySelectorAll("tr").forEach((row, index) => {
          row.addEventListener("click", () => {
            openProductDetails(products[index]);
            console.log(products.index);
          });
        });
      } else {
        productTableBody.innerHTML =
          '<tr><td colspan="6">No products found.</td></tr>';
      }
    } catch (error) {
      console.error("Errore nel caricamento dei prodotti:", error);
    }
  };

   // Funzione per ottenere la riga del prodotto
   const getProductRow = (product) => {
    return `
              <td>${product.name}</td>
              <td>${product.category.category}</td>
              <td>${product.price.toFixed(2)}€</td>
              <td>${product.qty_stock}</td>
              <td>${product.description}</td>
              <td><span class="status-indicator ${
                product.status === "active" ? "green" : "red"
              }"></span></td>
          `;
  };