import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            phase: { state: true },
        }
    }

    constructor() {
        super()
        const state = store.subscribe(this.storeChange)
        this.storeChange(state)
    }

    /**
     * @param {import('../types').state} state 
     */
    storeChange = (state) => {
        if (this.phase === state.phase) return
        this.phase = state.phase
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

    render() {
        switch (this.phase) {
            case 'loading': 
                return html`<div>Loading...</div>`

            case 'error': 
                return html`<div>Something went wrong!</div>`

            case 'list': 
                return html`<podcast-view-list></podcast-view-list>`

            case 'single': 
                return html`<podcast-view-single></podcast-view-single>`
                
            default: throw new Error('Invalid phase')
        }
    }
}

customElements.define('podcast-app', Component)