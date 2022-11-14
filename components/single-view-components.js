import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.single === state.single) return
            this.single = state.single
        })
    }

    disconnectedCallback() { this.disconnectStore() }

    static styles = css`
        h1 {
            color: black;
            font: 200px;
        }

        img {
            width: 250px;
            height: 250px;
        }
        .button {
            border-radius: 4px;
        }
    `;

    render() {
        /**
         * @type {import('../imports/type').show}
         */
        const show = this.single
        if (!show) {
            return html`<div> ${image} </div>`
        }

        const backHandler = () => store.loadList()

        const seasons = show.seasons.map(({ episodes, title }) => {
            return html`
                <div>
                    <h1>${title}</h1>
                     ${episodes.map(({ file, title: innerTitle }) => { 
                        return html`
                            <div>
                                <div><h4> ${innerTitle} </h4></div>
                                <audio controls>
                                    <source src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3" type="audio/mp3">
                                </audio>
                            </div>
                            <button><span>&#11088;</span> Add to favorites </button>
                            <button><span>&#128078;</span> Remove from favorites </button>
                        `
                    })}
                </div>
            `
        })

        return html`
            <button @click="${backHandler}"> 👈 Previous </button> 
            <h1>${show.title || ''}</h1>
            <img src="${show.image}">
            ${seasons} 
        `
    }
}


customElements.define('single-view-components', Component)