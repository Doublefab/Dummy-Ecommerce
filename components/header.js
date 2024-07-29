class Header extends HTMLElement {
    constructor() {
        super();
    }


    connectedCallback() {
        const imgPath = window.location.pathname.includes('/pages/') ? '../../img/SaettaMcKing.png' : 'img/SaettaMcKing.png';
        const cartPath = window.location.pathname.includes('/pages/') ? '../cart/index.html' : 'pages/cart/index.html';
        const homePath = window.location.pathname.includes('/pages/') ? '../../index.html' : 'index.html';
        this.innerHTML =
            `
       <modal-login-component></modal-login-component>
       <modal-registration-component></modal-registration-component>
    <header>
            <nav class="navbar">
                <div>
                    <img src= "${imgPath}" alt="logo" width="20px" height="20px">
                    <a href="${homePath}">RAMbought</a>
                </div>

                <div>
                    <ul class="menu">
                        <li><a href="pages/products/index.html">Products</a></li>
                        <li><a href="${cartPath}">Cart</a></li>
                    </ul>
                </div>
                <div>
                    <a onclick="openModal('modal-login')" id="open-login">Login</a>
                    <a id="open-registration">SignUp</a>
                </div>
            </nav>
        </header>`;
    }

};

customElements.define('header-component', Header);
