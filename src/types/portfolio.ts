import type { SimpleIcon } from 'simple-icons'

export interface SocialLinks {
  linkedin: string
  github: string
  email: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  about: string[]
  interests: string[]
  links: SocialLinks
}

export interface Experience {
  position: string
  company: string
  start: number
  end: number | 'Present'
}

export type TechCategory = 'frontend' | 'backend' | 'databases' | 'deployments' | 'platforms'

export interface Technology {
  name: string
  category: TechCategory
  /** Shown in the collapsed view and emphasized in its group. */
  highlighted?: boolean
  /** Logo from `simple-icons`; technologies without one render as text only. */
  icon?: SimpleIcon
}

/** A public project must have at least one link; a private one has none. */
export type ProjectAvailability =
  | { kind: 'private' }
  | { kind: 'public'; liveUrl: string; repoUrl?: string }
  | { kind: 'public'; liveUrl?: string; repoUrl: string }

export interface Project {
  title: string
  description: string
  technologies: string[]
  availability: ProjectAvailability
}

export interface Portfolio {
  profile: Profile
  experiences: Experience[]
  techStack: Technology[]
  projects: Project[]
}
