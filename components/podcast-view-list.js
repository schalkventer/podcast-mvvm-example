import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
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

    static styles = css`
        li {
            border: 1px solid var(--primary-blue);
        }
    `;

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const preview = this.previews

        const list = preview.map(({ title, id }) => {
            const clickHandler = () => store.loadSingle(id)

            return html`
                <li>
                    <button @click="${clickHandler}">
                        ${title}
                    </button>
                </li>
            `
        })

        return html`
            <h1>Podcast List</h1>
            <ul>${list}</ul>
        `
    }
}

customElements.define('podcast-view-list', Component)