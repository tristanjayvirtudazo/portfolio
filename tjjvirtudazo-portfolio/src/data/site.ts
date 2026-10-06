/**
 * Site-level settings for search engines and link previews. Used at build time to generate the
 * <head> tags, structured data, robots.txt and sitemap.xml (see scripts/prerender.mjs).
 */
export const site = {
  /** Deployed URL, no trailing slash. Must match the Netlify site name (or a custom domain later). */
  url: 'https://tristanjayvirtudazo.netlify.app',
  /** Shown in Google results under the title; keep it under ~155 characters. */
  description:
    'Tristan Jay Virtudazo is a software engineer building web apps with Nuxt, Vue, Kotlin, Spring Boot and PostgreSQL. View experience, tech stack and projects.',
  locale: 'en_US',
  /** 1200×630 image shown when the link is shared (LinkedIn, Slack, X…). */
  ogImage: {
    path: '/og-image.png',
    alt: 'Tristan Jay Virtudazo — Software Engineer',
  },
  /** Portrait used in structured data (Google may show it with name searches). */
  portrait: '/images/tristan-seesnap.png',
} as const

export type Site = typeof site
