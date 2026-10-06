import type { Experience } from '@/types/portfolio'

export interface ExperienceEntry {
  experience: Experience
  isCurrent: boolean
  duration: string
}

export function formatDuration(years: number): string {
  if (years < 1) return '< 1 yr'
  return years === 1 ? '1 yr' : `${years} yrs`
}

/** Adds the display details derived from each role's years. */
export function describeExperiences(
  experiences: readonly Experience[],
  currentYear: number,
): ExperienceEntry[] {
  return experiences.map((experience) => {
    const endYear = experience.end === 'Present' ? currentYear : experience.end
    return {
      experience,
      isCurrent: experience.end === 'Present',
      duration: formatDuration(endYear - experience.start),
    }
  })
}
