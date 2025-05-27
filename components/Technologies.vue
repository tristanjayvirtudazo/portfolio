<template>
  <section class="technologies">

    <div class="mb-5">
      <h2 class="mb-2 text-lg font-medium">Frontend</h2>
      <div class="flex flex-wrap gap-3">
        <div 
          v-for="tech in frontend" 
          :key="tech?.name" 
          :class="[tech?.icon ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-200']" 
          class="p-4 w-[75px] aspect-square bg-gray-200 rounded-md m-auto"
        >
          <NuxtImg
            v-if="tech?.icon"
            :src="`/images/${tech.icon}`"
            width="50"
            height="50"
            
            class="mx-auto mb-2 aspect-square object-contain"
            alt="Technology Icon"
          />
        </div>
      </div>
    </div>

    <div class="mb-5">
      <h2 class="mb-2 text-lg font-medium">Backend</h2>
      <div class="flex flex-wrap gap-3">
        <div 
          v-for="tech in backend" 
          :key="tech?.name" 
          :class="[tech?.icon ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-200']" 
          class="p-4 w-[75px] aspect-square bg-gray-200 rounded-md m-auto"
        >
          <NuxtImg
            v-if="tech?.icon"
            :src="`/images/${tech.icon}`"
            width="50"
            height="50"
            
            class="mx-auto mb-2 aspect-square object-cover"
            alt="Technology Icon"
          />
        </div>
      </div>
    </div>

    <div class="mb-5">
      <h2 class="mb-2 text-lg font-medium">Tools</h2>
      <div class="flex flex-wrap gap-3">
        <div 
          v-for="tech in tools" 
          :key="tech?.name" 
          :class="[tech?.icon ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-200']" 
          class="p-4 w-[75px] aspect-square bg-gray-200 rounded-md m-auto"
        >
          <NuxtImg
            v-if="tech?.icon"
            :src="`/images/${tech.icon}`"
            width="50"
            height="50"
            
            class="mx-auto mb-2 aspect-square object-cover"
            alt="Technology Icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const frontend = [
  {
    name: 'Nuxt',
    icon: 'nuxt-icon.svg',
  },
  {
    name: 'tailwind',
    icon: 'tailwind-icon.png',
  },
  {
    name: 'vue',
    icon: 'vue-icon.webp',
  },
  {
    name: 'angular',
    icon: 'angular-icon.png',
  },
  {
    name: 'flutter',
    icon: 'flutter-icon.webp',
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
]

const backend = [
  {
    name: 'PostgreSQL',
    icon: 'posgresql-icon.png',
  },
  {
    name: 'Scala',
    icon: 'scala-icon.png',
  },
  {
    name: 'Play Framework',
    icon: 'play-icon.png',
  },
  {
    name: 'kotlin',
    icon: 'kotlin-icon.png',
  },
  {
    name: 'dart',
    icon: 'dart-icon.png',
  },
  {
    name: 'laravel',
    icon: 'laravel-icon.png',
  },
  {
    name: 'spring',
    icon: 'spring-icon.png',
  },
  {
    name: 'mysql',
    icon: 'mysql-icon.svg',
  },
  {
    name: 'nest',
    icon: 'nest-icon.png',
  },
  {
    name: 'Unknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
];

const tools = [
  {
    name: 'docker',
    icon: 'docker-icon.webp',
  },
  {
    name: 'git',
    icon: 'git-icon.png',
  },
  {
    name: 'jira',
    icon: 'jira-icon.png',
  },
  {
    name: 'digitalocean',
    icon: 'digitalocean-icon.png',
  },
  {
    name: 'openai',
    icon: 'openai-icon.png',
  },
  {
    name: 'copilot',
    icon: 'copilot-icon.png',
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
  {
    name: 'Uknown',
    icon: undefined,
  },
]
</script>
