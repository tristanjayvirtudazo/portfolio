// Build-time entry used by scripts/prerender.mjs to render the page to static HTML.
import { renderToString } from 'vue/server-renderer'
import { createPortfolioApp } from './createPortfolioApp'

export { portfolio } from './data/portfolio'
export { site } from './data/site'
export { buildHeadTags, buildRobotsTxt, buildSitemap } from './seo/head'

export function render(): Promise<string> {
  return renderToString(createPortfolioApp({ hydrate: true }))
}
