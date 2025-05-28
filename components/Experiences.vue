import { Badge } from '../.nuxt/components';
<template>
  <section>
    <div v-for="step in steps" :key="step.company" class="flex gap-4 mb-4">
      <Briefcase :size="28" />
      <div>
        <h3 class="font-medium">{{ step.title }} <Badge v-if="step.end === undefined" variant="nuxt">Current</Badge></h3>
        <small class="text-gray-500 italic">{{ step.company }} ({{ step.start }} - {{ step.end ?? "Present" }}) </small>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next';

const steps = [
  {
    step: 1,
    title: 'Software Engineer',
    company: 'Vauldex Technologies Inc.',
    start: '2024-02',
    end: undefined,
    description:
        'A Japanese company that specializes in providing IT solutions and services to various industries, including finance, healthcare, and logistics.',
  },
  {
    step: 2,
    title: 'Junior Software Developer',
    company: 'Elf Station Inc.',
    start: '2022-08',
    end: '2024-02',
    description: 'An IT company that specializes in providing software development and IT enterprise solutions to various businesses and government institution.',
  },
]
</script>
