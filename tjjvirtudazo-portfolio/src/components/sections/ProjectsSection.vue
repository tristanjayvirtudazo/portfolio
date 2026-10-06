<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { staggerDelay, vReveal } from '@/directives/reveal'
import type { Project } from '@/types/portfolio'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <section id="projects" aria-labelledby="projects-heading" class="py-12 sm:py-16">
    <SectionHeading id="projects-heading">Projects</SectionHeading>
    <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(project, index) in projects" :key="project.title" v-reveal="staggerDelay(index)">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </section>
</template>
