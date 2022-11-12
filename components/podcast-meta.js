class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-meta</div>'
    }
}

customElements.define('podcast-meta', Component)