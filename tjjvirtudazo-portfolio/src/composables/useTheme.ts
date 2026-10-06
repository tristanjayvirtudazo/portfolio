import { computed, nextTick } from 'vue'
import { useColorMode, usePreferredReducedMotion } from '@vueuse/core'

export function useTheme() {
  // Follows the system preference until the visitor picks a mode, which is then persisted.
  const { store, system } = useColorMode({ disableTransition: true })
  const reducedMotion = usePreferredReducedMotion()

  const isDark = computed(() => (store.value === 'auto' ? system.value : store.value) === 'dark')

  function applyToggle() {
    store.value = isDark.value ? 'light' : 'dark'
  }

  /** Switches theme; with View Transitions support the new theme grows as a circle from `origin`. */
  function toggle(origin?: HTMLElement) {
    if (!document.startViewTransition || reducedMotion.value === 'reduce') {
      applyToggle()
      return
    }

    const rect = origin?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = document.startViewTransition(async () => {
      applyToggle()
      await nextTick()
    })
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return { isDark, toggle }
}
