<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center text-normal font-normal">
        <span class="w-10"><BookText /></span>
        {{ project.title }}
      </CardTitle>
      <CardDescription class="text-sm">{{ project.description }}</CardDescription>
    </CardHeader>
    <CardFooter class="flex flex-wrap gap-2">
      <Badge v-for="(value, index) in project.badges" :variant="value">{{ project.tech[index] }}</Badge>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type Project from '~/types/project';
import { BookText } from 'lucide-vue-next'

defineProps<{
  project: Project
}>()
</script>