import type { TechCategory, Technology } from '@/types/portfolio'

/** Labels of the tech stack groups, in display order. */
export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  deployments: 'Deployments',
  platforms: 'Platforms',
}

export interface TechGroup {
  category: TechCategory
  label: string
  items: Technology[]
}

/** Groups technologies in display order, highlighted ones first; empty groups are dropped. */
export function groupTechnologies(technologies: Technology[]): TechGroup[] {
  return (Object.keys(TECH_CATEGORY_LABELS) as TechCategory[])
    .map((category) => ({
      category,
      label: TECH_CATEGORY_LABELS[category],
      items: technologies
        .filter((tech) => tech.category === category)
        .sort((a, b) => Number(Boolean(b.highlighted)) - Number(Boolean(a.highlighted))),
    }))
    .filter((group) => group.items.length > 0)
}

export interface LogoColor {
  value: string
  /** Too dark to read on the dark theme, so dark mode falls back to the text colour. */
  lightOnly: boolean
}

/**
 * Brand colour of a logo, or `undefined` for near-black or near-white marks (e.g. GitHub)
 * that would vanish against one of the themes; those use the text colour instead.
 */
export function logoColor(hex: string): LogoColor | undefined {
  const [red = 0, green = 0, blue = 0] = [0, 2, 4].map((offset) => {
    const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue
  if (luminance < 0.03 || luminance > 0.9) return undefined
  return { value: `#${hex}`, lightOnly: luminance < 0.1 }
}
