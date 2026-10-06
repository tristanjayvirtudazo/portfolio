import type { Directive } from 'vue'

const REVEALED_CLASS = 'is-revealed'
const STAGGER_MS = 80
const MAX_STAGGERED = 4

let observer: IntersectionObserver | undefined

/** One observer shared by every revealed element; each is unobserved after its first reveal. */
function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(REVEALED_CLASS)
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  )
  return observer
}

/** Delay for the nth item of a list, capped so long lists don't keep the viewer waiting. */
export function staggerDelay(index: number): number {
  return Math.min(index, MAX_STAGGERED) * STAGGER_MS
}

/**
 * Fades an element up the first time it scrolls into view; `v-reveal="delayMs"` staggers siblings.
 * The hiding class is only added here, so content stays visible without JS or with reduced motion.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    const canAnimate =
      'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Content already on screen at load was painted from the pre-rendered HTML; hiding it now
    // would make it flash, so only content below the fold is revealed.
    const isOnScreen = el.getBoundingClientRect().top < window.innerHeight
    if (!canAnimate || isOnScreen) return

    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
