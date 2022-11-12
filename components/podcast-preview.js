
class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-preview</div>'
    }
}

customElements.define('podcast-preview', Component)