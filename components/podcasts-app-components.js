import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { connect } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            phase: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.phase === state.phase) return
            this.phase = state.phase
        })
    }

    disconnectedCallback() { this.disconnectStore() }

    render() {
        switch (this.phase) {
            case 'loading': 
                return html`<div><h2>Loading...</h2></div>`

            case 'error': 
                return html`<div>Something went wrong!</div>`

            case 'list': 
                return html`<view-list-components></view-list-components>`

            case 'single': 
                return html`<single-view-components></single-view-components>`
                
            default: throw new Error('Invalid phase')
        }
    }
}

customElements.define('podcasts-app-components', Component)
