import type { Site } from '@/data/site'
import type { Portfolio } from '@/types/portfolio'

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

/** Keeps `</script>` sequences out of inline JSON. */
const toInlineJson = (value: unknown): string => JSON.stringify(value).replaceAll('<', '\\u003c')

function splitName(fullName: string): { givenName: string; familyName: string } {
  const parts = fullName.trim().split(/\s+/)
  const familyName = parts.pop() ?? fullName
  return { givenName: parts.join(' ') || familyName, familyName }
}

export function pageTitle(portfolio: Portfolio): string {
  return `${portfolio.profile.name} — ${portfolio.profile.role}`
}

/** schema.org graph: the page is a ProfilePage whose main entity is the Person. */
export function buildStructuredData(portfolio: Portfolio, site: Site, modified: Date): object {
  const { profile, experiences, techStack } = portfolio
  const pageUrl = `${site.url}/`
  const current = experiences.find((experience) => experience.end === 'Present')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${pageUrl}#website`,
        url: pageUrl,
        name: profile.name,
        inLanguage: 'en',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profilepage`,
        url: pageUrl,
        name: pageTitle(portfolio),
        description: site.description,
        isPartOf: { '@id': `${pageUrl}#website` },
        mainEntity: { '@id': `${pageUrl}#person` },
        dateModified: modified.toISOString(),
      },
      {
        '@type': 'Person',
        '@id': `${pageUrl}#person`,
        name: profile.name,
        ...splitName(profile.name),
        jobTitle: profile.role,
        description: profile.tagline,
        url: pageUrl,
        image: `${site.url}${site.portrait}`,
        email: `mailto:${profile.links.email}`,
        sameAs: [profile.links.linkedin, profile.links.github],
        ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
        knowsAbout: techStack.filter((tech) => tech.highlighted).map((tech) => tech.name),
      },
    ],
  }
}

/** Every SEO-relevant <head> tag, rendered from the portfolio data. */
export function buildHeadTags(portfolio: Portfolio, site: Site, modified: Date): string {
  const { profile } = portfolio
  const title = pageTitle(portfolio)
  const pageUrl = `${site.url}/`
  const imageUrl = `${site.url}${site.ogImage.path}`
  const { givenName, familyName } = splitName(profile.name)

  const meta = (attr: 'name' | 'property', key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`

  return [
    `<title>${escapeHtml(title)}</title>`,
    meta('name', 'description', site.description),
    meta('name', 'author', profile.name),
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    meta('property', 'og:type', 'profile'),
    meta('property', 'og:site_name', profile.name),
    meta('property', 'og:locale', site.locale),
    meta('property', 'og:url', pageUrl),
    meta('property', 'og:title', title),
    meta('property', 'og:description', site.description),
    meta('property', 'og:image', imageUrl),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', site.ogImage.alt),
    meta('property', 'profile:first_name', givenName),
    meta('property', 'profile:last_name', familyName),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', site.description),
    meta('name', 'twitter:image', imageUrl),
    meta('name', 'twitter:image:alt', site.ogImage.alt),
    `<script type="application/ld+json">${toInlineJson(buildStructuredData(portfolio, site, modified))}</script>`,
  ].join('\n    ')
}

export function buildRobotsTxt(site: Site): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
}

export function buildSitemap(site: Site, modified: Date): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(`${site.url}/`)}</loc>
    <lastmod>${modified.toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`
}
