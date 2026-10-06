<script setup lang="ts">
import ClientOnly from '@/components/ClientOnly.vue'
import SocialLinks from '@/components/SocialLinks.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import TechStackSection from '@/components/sections/TechStackSection.vue'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { portfolio } from '@/data/portfolio'

const { profile, experiences, techStack, projects } = portfolio
const year = new Date().getFullYear()
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <div id="top" class="relative isolate flex min-h-dvh flex-col">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-dot-grid dot-grid-fade"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] origin-top motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-90 motion-safe:duration-1200 motion-safe:ease-emphasized motion-safe:fill-mode-both"
      >
        <div
          class="absolute top-[-12rem] left-1/2 h-[28rem] w-[min(48rem,100%)] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl dark:bg-brand/15"
        />
      </div>
      <a
        href="#main"
        class="sr-only z-50 rounded-md bg-brand px-3 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <!-- Floating, and early in the tab order so keyboard users reach it right after the skip link. -->
      <div class="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        <ClientOnly>
          <ThemeToggle />
        </ClientOnly>
      </div>

      <main id="main" class="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <HeroSection :profile="profile" />
        <Separator />
        <AboutSection :about="profile.about" :interests="profile.interests" />
        <Separator />
        <ExperienceSection :experiences="experiences" />
        <Separator />
        <TechStackSection :technologies="techStack" />
        <Separator />
        <ProjectsSection :projects="projects" />
      </main>

      <footer class="border-t border-border/60">
        <div
          class="mx-auto flex max-w-5xl flex-col-reverse items-center justify-between gap-4 px-4 pt-8 pb-20 sm:flex-row sm:px-6"
        >
          <p class="text-sm text-muted-foreground">© {{ year }} {{ profile.name }}</p>
          <SocialLinks :links="profile.links" />
        </div>
      </footer>
    </div>
  </TooltipProvider>
</template>
