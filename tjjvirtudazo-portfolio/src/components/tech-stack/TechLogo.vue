<script setup lang="ts">
import { computed } from 'vue'
import type { SimpleIcon } from 'simple-icons'
import { logoColor } from '@/lib/tech'
import { cn } from '@/lib/utils'

const props = defineProps<{ icon: SimpleIcon }>()

const color = computed(() => logoColor(props.icon.hex))
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    :class="cn(color && 'text-(--logo-color)', color?.lightOnly && 'dark:text-current')"
    :style="color ? { '--logo-color': color.value } : undefined"
  >
    <path :d="icon.path" />
  </svg>
</template>
