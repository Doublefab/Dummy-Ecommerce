class Footer extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML=
        `<footer class="footer">
            <ul class="info">
                <li>Address</li>
                <li>Contact Us</li>
                <li>&copy; Copyright</li>
            </ul>
        </footer>`
    }
};

customElements.define('footer-component', Footer);
