import './assets/main.css'

import { createPortfolioApp } from './createPortfolioApp'

const container = document.querySelector('#app')
// Production builds ship pre-rendered markup to hydrate; the dev server starts from an empty node.
createPortfolioApp({ hydrate: Boolean(container?.hasChildNodes()) }).mount('#app')
