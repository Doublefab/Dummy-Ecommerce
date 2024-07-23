class Sidebar extends HTMLElement{

    constructor(){
        super();
    }


    connectedCallback() {
        this.innerHTML = `
        <div class="sidebar">
            <h2>Filters</h2>
            <div class="filter-group">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Smartphones</option>
                    <!-- Aggiungi altre categorie se necessario -->
                </select>
            </div>
            <div class="filter-group">
                <label for="price">Price range:</label>
                <input type="range" id="price" name="price" min="0" max="2000">
                <div class="price-legend">
                    <span>0€</span>
                    <span>2000€</span>
                </div>
            </div>
            <div class="filter-group">
                <button type="button">Apply Filters</button>
            </div>
        </div>`;
    }
};

customElements.define('sidebar-component', Sidebar);