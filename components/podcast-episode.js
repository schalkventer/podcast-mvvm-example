class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-episode</div>'
    }
}

customElements.define('podcast-episode', Component)