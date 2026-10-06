<script setup lang="ts">
import TechBadge from '@/components/tech-stack/TechBadge.vue'
import type { Technology } from '@/types/portfolio'

defineProps<{ technologies: Technology[] }>()
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="tech in technologies" :key="tech.name">
      <TechBadge :tech="tech" />
    </li>
  </ul>
</template>
