<template>
  <section class="px-3">
    <div class="my-6">
      <h2 class="font-bold uppercase mb-5">Projects</h2>
      <div class="px-1">
        <ProjectCard v-for="project in projects" :project :key="project.title"/>
      </div>
    </div>

    <Separator />

    <div class="my-6">
      <h2 class="font-bold uppercase mb-5">Experiences</h2>
      <div class="px-1">
        <Experiences />
      </div>
    </div>

    <Separator />

    <div class="my-6">
      <h2 class="font-bold uppercase mb-5">Technologies</h2>
      <div class="px-1">
        <Technologies />
      </div>
    </div>

    <Separator />

    <div class="my-6">
      <h2 class="font-bold uppercase mb-5">Education</h2>
      <div class="px-1">
        <Education />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import type Project from '~/types/project';

const projects: Project[] = [
  {
    title: 'ClockMe',
    description: 'ClockMe is a time tracking application.',
    image: '/images/clockme.webp',
    tech: ['Nuxt', 'PostgreSQL', 'Scala', 'Play framework'],
    badges: ['nuxt', 'postgresql', 'scala', 'playframework']
  },
]
</script>