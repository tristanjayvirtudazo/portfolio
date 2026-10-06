<script setup lang="ts">
import type { Component } from 'vue'
import { Mail } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import type { SocialLinks } from '@/types/portfolio'

const props = defineProps<{ links: SocialLinks }>()

interface SocialItem {
  label: string
  href: string
  icon: Component
  external: boolean
}

const items: SocialItem[] = [
  { label: 'LinkedIn', href: props.links.linkedin, icon: LinkedinIcon, external: true },
  { label: 'GitHub', href: props.links.github, icon: GithubIcon, external: true },
  { label: 'Email', href: `mailto:${props.links.email}`, icon: Mail, external: false },
]
</script>

<template>
  <ul class="flex items-center gap-1">
    <li v-for="item in items" :key="item.label">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="hover:text-brand-foreground" as-child>
            <a
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
            >
              <component :is="item.icon" class="size-4" />
              <span class="sr-only">
                {{ item.label }}{{ item.external ? ' (opens in new tab)' : '' }}
              </span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{{ item.label }}</TooltipContent>
      </Tooltip>
    </li>
  </ul>
</template>
