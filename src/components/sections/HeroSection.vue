<script setup lang="ts">
import { computed } from 'vue'
import SocialLinks from '@/components/SocialLinks.vue'
import type { Profile } from '@/types/portfolio'

const props = defineProps<{ profile: Profile }>()

/*
 * Intro sequence (CSS only, skipped entirely with reduced motion): the role sharpens from a blur,
 * each word of the name rises from behind its baseline, the orange period pops in, then the
 * tagline and links come into focus.
 */
const NAME_START_MS = 200
const WORD_STAGGER_MS = 110

const nameWords = computed(() => props.profile.name.split(/\s+/).filter(Boolean))
const periodDelay = computed(() => NAME_START_MS + nameWords.value.length * WORD_STAGGER_MS + 200)

const base = 'motion-safe:animate-in motion-safe:fill-mode-both'
const focusIn = `${base} motion-safe:fade-in motion-safe:blur-in-sm motion-safe:duration-700 motion-safe:ease-out`
</script>

<template>
  <section aria-labelledby="hero-heading" class="pt-24 pb-12 sm:pt-36 sm:pb-16">
    <p
      :class="[
        focusIn,
        'mb-3 inline-flex items-center gap-2 text-sm font-medium text-brand-foreground motion-safe:delay-100',
      ]"
    >
      <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
      {{ profile.role }}
    </p>

    <!--
      Words are flex items, so spacing comes from the gap. The real space characters between them
      are not rendered in a flex container but keep the text "Tristan Jay Virtudazo" for search
      engines and screen readers.
    -->
    <h1
      id="hero-heading"
      class="flex flex-wrap gap-x-[0.25em] text-4xl font-semibold tracking-tight sm:text-5xl"
    >
      <template v-for="(word, index) in nameWords" :key="index">
        <!-- Each clipping wrapper is the "baseline" its word rises from; padding keeps descenders. -->
        <span class="-mb-[0.12em] inline-flex overflow-hidden pb-[0.12em]">
          <span
            :class="[
              base,
              'inline-block motion-safe:slide-in-from-bottom motion-safe:duration-700 motion-safe:ease-emphasized',
            ]"
            :style="{ '--tw-animation-delay': `${NAME_START_MS + index * WORD_STAGGER_MS}ms` }"
            >{{ word }}</span
          >
          <span
            v-if="index === nameWords.length - 1"
            :class="[
              base,
              'inline-block text-brand motion-safe:fade-in motion-safe:zoom-in-0 motion-safe:duration-500 motion-safe:ease-spring',
            ]"
            :style="{ '--tw-animation-delay': `${periodDelay}ms` }"
            aria-hidden="true"
            >.</span
          >
        </span>
        {{ index < nameWords.length - 1 ? ' ' : '' }}
      </template>
    </h1>

    <p
      :class="[
        focusIn,
        'mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground motion-safe:delay-650 sm:text-lg',
      ]"
    >
      {{ profile.tagline }}
    </p>
    <SocialLinks :links="profile.links" :class="[focusIn, 'mt-6 -ml-2.5 motion-safe:delay-800']" />
  </section>
</template>
