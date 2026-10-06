<script setup lang="ts">
import TechLogo from '@/components/tech-stack/TechLogo.vue'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Technology } from '@/types/portfolio'

defineProps<{ tech: Technology }>()
</script>

<template>
  <Badge
    variant="outline"
    :class="
      cn(
        'h-7 px-3 text-sm [&>svg]:size-3.5!',
        tech.highlighted && 'border-brand/30 bg-brand-soft text-brand-foreground',
      )
    "
  >
    <TechLogo v-if="tech.icon" :icon="tech.icon" data-icon="inline-start" />
    {{ tech.name }}
  </Badge>
</template>
