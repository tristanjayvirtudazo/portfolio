import type { Experience } from '@/types/portfolio'

export function formatYearRange({ start, end }: Pick<Experience, 'start' | 'end'>): string {
  return start === end ? String(start) : `${start} – ${end}`
}
