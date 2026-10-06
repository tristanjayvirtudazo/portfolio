<script setup lang="ts">
import { ArrowUpRight, Lock } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import type { Project } from '@/types/portfolio'

defineProps<{ project: Project }>()
</script>

<template>
  <Card
    class="h-full rounded-lg transition-[box-shadow,translate] duration-200 ease-out focus-within:shadow-offset focus-within:ring-brand hover:shadow-offset hover:ring-brand motion-safe:focus-within:-translate-1 motion-safe:hover:-translate-1"
  >
    <CardHeader>
      <CardTitle>
        <h3>{{ project.title }}</h3>
      </CardTitle>
      <CardDescription>{{ project.description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex-1">
      <ul class="flex flex-wrap gap-1.5" aria-label="Technologies used">
        <li v-for="tech in project.technologies" :key="tech">
          <Badge variant="outline">{{ tech }}</Badge>
        </li>
      </ul>
    </CardContent>
    <CardFooter class="gap-2">
      <span
        v-if="project.availability.kind === 'private'"
        class="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Lock class="size-3.5" aria-hidden="true" />
        Private project
      </span>
      <template v-else>
        <Button
          v-if="project.availability.liveUrl"
          variant="outline"
          size="sm"
          class="hover:border-brand/40 hover:text-brand-foreground"
          as-child
        >
          <a :href="project.availability.liveUrl" target="_blank" rel="noopener noreferrer">
            <ArrowUpRight aria-hidden="true" />
            Live
            <span class="sr-only">demo of {{ project.title }} (opens in new tab)</span>
          </a>
        </Button>
        <Button
          v-if="project.availability.repoUrl"
          variant="ghost"
          size="sm"
          class="hover:text-brand-foreground"
          as-child
        >
          <a :href="project.availability.repoUrl" target="_blank" rel="noopener noreferrer">
            <GithubIcon class="size-3.5" />
            Source
            <span class="sr-only">code of {{ project.title }} (opens in new tab)</span>
          </a>
        </Button>
      </template>
    </CardFooter>
  </Card>
</template>
