<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TechChipList from '@/components/tech-stack/TechChipList.vue'
import TechLogo from '@/components/tech-stack/TechLogo.vue'
import { Card } from '@/components/ui/card'
import { staggerDelay, vReveal } from '@/directives/reveal'
import { groupTechnologies } from '@/lib/tech'
import { cn } from '@/lib/utils'
import type { Technology } from '@/types/portfolio'

const props = defineProps<{ technologies: Technology[] }>()

const highlighted = computed(() => props.technologies.filter((tech) => tech.highlighted))
const groups = computed(() => groupTechnologies(props.technologies))
/** The largest group spans two columns, giving the bento grid its rhythm. */
const widestCategory = computed(
  () => [...groups.value].sort((a, b) => b.items.length - a.items.length)[0]?.category,
)
</script>

<template>
  <section id="stack" aria-labelledby="stack-heading" class="py-12 sm:py-16">
    <SectionHeading id="stack-heading">Tech stack</SectionHeading>

    <div v-if="highlighted.length">
      <!-- Doubles as the legend: the swatch matches the highlighted chips in the grid below. -->
      <h3 id="main-stack-heading" class="mb-3 flex items-center gap-2 text-sm font-medium">
        <span class="size-3 rounded-sm border border-brand/40 bg-brand-soft" aria-hidden="true" />
        Main stack
      </h3>
      <ul
        class="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3"
        aria-labelledby="main-stack-heading"
      >
        <li v-for="(tech, index) in highlighted" :key="tech.name" v-reveal="staggerDelay(index)">
          <div
            class="group flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-brand/25 bg-card px-2 py-5 text-center shadow-xs transition-colors duration-200 hover:border-brand/60"
          >
            <TechLogo
              v-if="tech.icon"
              :icon="tech.icon"
              class="size-8 transition-transform duration-200 motion-safe:group-hover:scale-110"
            />
            <span
              v-else
              class="flex size-8 items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {{ tech.name.charAt(0) }}
            </span>
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <h3 class="mt-10 mb-3 text-sm font-medium">All technologies</h3>
    <div class="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(group, index) in groups"
        :key="group.category"
        v-reveal="staggerDelay(index)"
        :class="
          cn('gap-4 rounded-lg px-5 py-5', group.category === widestCategory && 'sm:col-span-2')
        "
      >
        <div class="flex items-baseline justify-between gap-3">
          <h4 class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {{ group.label }}
          </h4>
          <span class="text-xs text-muted-foreground tabular-nums">
            {{ group.items.length }}
          </span>
        </div>
        <TechChipList :technologies="group.items" />
      </Card>
    </div>
  </section>
</template>
