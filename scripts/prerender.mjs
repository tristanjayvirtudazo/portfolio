// Turns the client build into a fully pre-rendered page: crawlers and link previews get the real
// content and SEO tags in the HTML, and Vue hydrates it in the browser.
// Runs after `vite build` and `vite build --ssr src/entry-server.ts --outDir dist-ssr`.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const ssrEntry = `${root}dist-ssr/entry-server.js`

const { render, portfolio, site, buildHeadTags, buildRobotsTxt, buildSitemap } = await import(
  pathToFileURL(ssrEntry).href
)

if (site.url.includes('example.com')) {
  console.warn(
    '\n⚠  SEO: site.url in src/data/site.ts is still a placeholder. Set it to the deployed URL;' +
      '\n   canonical links, social previews, robots.txt and sitemap.xml all depend on it.\n',
  )
}

const modified = new Date()
const appHtml = await render()
const template = await readFile(`${dist}/index.html`, 'utf8')

const seoBlock = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
const appRoot = '<div id="app"></div>'
if (!seoBlock.test(template) || !template.includes(appRoot)) {
  throw new Error('prerender: index.html is missing the seo markers or the #app root.')
}

// Preload the Latin font file so text can render as soon as possible (helps LCP on mobile).
const latinFont = (await readdir(`${dist}/assets`)).find((file) => /^geist-latin-wght.*\.woff2$/.test(file))
const fontPreload = latinFont
  ? `\n    <link rel="preload" href="/assets/${latinFont}" as="font" type="font/woff2" crossorigin />`
  : ''

const html = template
  .replace(seoBlock, () => buildHeadTags(portfolio, site, modified) + fontPreload)
  .replace(appRoot, () => `<div id="app">${appHtml}</div>`)

await writeFile(`${dist}/index.html`, html)
await writeFile(`${dist}/robots.txt`, buildRobotsTxt(site))
await writeFile(`${dist}/sitemap.xml`, buildSitemap(site, modified))
await rm(`${root}dist-ssr`, { recursive: true, force: true })

console.log(`prerender: index.html (${(html.length / 1024).toFixed(1)} kB), robots.txt, sitemap.xml`)
