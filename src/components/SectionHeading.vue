<script setup lang="ts">
import { vReveal } from '@/directives/reveal'

defineProps<{ id: string }>()
</script>

<template>
  <h2
    :id="id"
    v-reveal
    class="mb-6 flex items-center gap-3 text-sm font-medium tracking-widest text-muted-foreground uppercase"
  >
    <span class="h-0.5 w-5 rounded-full bg-brand" aria-hidden="true" />
    <slot />
  </h2>
</template>
