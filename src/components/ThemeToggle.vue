<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { Moon, Sun } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/composables/useTheme'
import { cn } from '@/lib/utils'

/** The hint appears once the hero intro has played, then tucks itself away. */
const HINT_DELAY_MS = 1500
const HINT_VISIBLE_MS = 6000

const { isDark, toggle } = useTheme()

const showHint = ref(false)
const label = computed(() => (isDark.value ? 'Try light mode' : 'Try dark mode'))

const { start: hideHintLater } = useTimeoutFn(
  () => {
    showHint.value = false
  },
  HINT_VISIBLE_MS,
  { immediate: false },
)
// Shown on every page load as a reminder that the theme can be switched.
useTimeoutFn(() => {
  showHint.value = true
  hideHintLater()
}, HINT_DELAY_MS)

function onToggle(event: MouseEvent) {
  showHint.value = false
  toggle(event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined)
}
</script>

<template>
  <Tooltip :disabled="showHint">
    <TooltipTrigger as-child>
      <!-- The label is real content (only visually collapsed), so the accessible name always matches it. -->
      <Button
        variant="outline"
        size="lg"
        :class="
          cn(
            'gap-0 rounded-full bg-card/80 px-3 shadow-md backdrop-blur hover:text-brand-foreground dark:bg-card/80',
            showHint && 'border-brand/50 text-brand-foreground dark:border-brand/50',
          )
        "
        @click="onToggle"
      >
        <Sun v-if="isDark" aria-hidden="true" />
        <Moon v-else aria-hidden="true" />
        <span
          :class="
            cn(
              'overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-500 ease-emphasized motion-reduce:transition-none',
              showHint ? 'ml-2 max-w-32 opacity-100' : 'max-w-0 opacity-0',
            )
          "
        >
          {{ label }}
        </span>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="left">{{ label }}</TooltipContent>
  </Tooltip>
</template>
