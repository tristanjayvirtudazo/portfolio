<template>
  <div>
    <section class="flex content-center items-center gap-10 border p-5">
      <NuxtImg class="rounded-full" width="150" src="/images/profile-webp.webp"/>

      <section class="flex flex-col gap-4">
        <div>
          <h1 class="font-bold text-sm uppercase">Tristan Jay Virtudazo</h1>
          <h2 class="italic text-sm">Software Engineer</h2>
        </div>

        <div>
          <h2 class="font-bold text-sm">Links</h2>
          <div class="flex items-center gap-2"> 
            <NuxtLink to="https://www.linkedin.com/in/tristan-jay-virtudazo-73a5b2218/" target="_blank">
              <NuxtImg width="30" src="/images/linkedin.svg" />
            </NuxtLink>

            <NuxtLink to="https://mail.google.com/mail/?view=cm&fs=1&to=tj.virtudazo@gmail.com" target="_blank">
              <NuxtImg width="40" src="/images/gmail.svg" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </section>
    <slot />
  </div>
</template>
<script setup lang="ts"></script>