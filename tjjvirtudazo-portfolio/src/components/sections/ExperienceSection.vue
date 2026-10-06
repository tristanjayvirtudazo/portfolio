<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { staggerDelay, vReveal } from '@/directives/reveal'
import { describeExperiences } from '@/lib/experience'
import { formatYearRange } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/portfolio'

const props = defineProps<{ experiences: Experience[] }>()

const entries = computed(() => describeExperiences(props.experiences, new Date().getFullYear()))
</script>

<template>
  <section id="experience" aria-labelledby="experience-heading" class="py-12 sm:py-16">
    <SectionHeading id="experience-heading">Experience</SectionHeading>
    <ol class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(entry, index) in entries"
        :key="`${entry.experience.company}-${entry.experience.start}`"
        v-reveal="staggerDelay(index)"
      >
        <Card
          :class="
            cn('h-full gap-3 rounded-lg px-6', entry.isCurrent && 'shadow-offset! ring-brand')
          "
        >
          <div class="flex h-5 items-center justify-between gap-3">
            <p class="text-xs text-muted-foreground tabular-nums">
              {{ formatYearRange(entry.experience) }}
              <span aria-hidden="true"> · </span>
              {{ entry.duration }}
            </p>
            <Badge
              v-if="entry.isCurrent"
              variant="outline"
              class="shrink-0 border-brand/30 bg-brand-soft text-brand-foreground"
            >
              <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              Current
            </Badge>
          </div>
          <h3 class="text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl">
            {{ entry.experience.position }}
          </h3>
          <p class="mt-auto pt-1 text-sm font-medium text-foreground/75">
            {{ entry.experience.company }}
          </p>
        </Card>
      </li>
    </ol>
  </section>
</template>
