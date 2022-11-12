import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
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
        if (this.single === state.single) return
        this.single = state.single
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

    static styles = css`
        h1 {
            color: purple;
        }

        img {
            width: 100px;
            height: 100px;
        }
    `;

    render() {
        /**
         * @type {import('../types').show}
         */
        const show = this.single
        const backHandler = () => store.loadList()

        return html`
            <button @click="${backHandler}">👈 BACK</button>
            <h1>${show.title || ''}</h1>
            <img src="${show.image}">
        `
    }
}

customElements.define('podcast-view-single', Component)