import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
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
        if (this.previews === state.previews) return
        this.previews = state.previews
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const preview = this.previews

        const list = preview.map(({ title }) => {
            return html`<li>${title}</li>`
        })

        return html`
            <ul>
                ${list}
            </ul>
        `
    }
}

customElements.define('podcast-view-list', Component)