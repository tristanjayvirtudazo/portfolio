<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { staggerDelay, vReveal } from '@/directives/reveal'
import type { Profile } from '@/types/portfolio'

defineProps<{ about: Profile['about']; interests: Profile['interests'] }>()
</script>

<template>
  <section id="about" aria-labelledby="about-heading" class="py-12 sm:py-16">
    <SectionHeading id="about-heading">About</SectionHeading>
    <div class="grid gap-5 md:grid-cols-3">
      <Card v-reveal class="rounded-lg md:col-span-2">
        <CardHeader>
          <CardTitle>
            <h3>Background</h3>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-base leading-relaxed text-pretty text-foreground/90">
          <p v-for="(paragraph, index) in about" :key="index">{{ paragraph }}</p>
        </CardContent>
      </Card>
      <Card v-reveal="staggerDelay(1)" class="rounded-lg">
        <CardHeader>
          <CardTitle>
            <h3>Interests</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="flex flex-wrap gap-2">
            <li v-for="interest in interests" :key="interest">
              <Badge variant="secondary">{{ interest }}</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
