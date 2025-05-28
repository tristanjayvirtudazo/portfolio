<template>
  <section>
    <div class="flex gap-4 mb-4">
      <GraduationCap :size="28" />
      <div>
        <h3 class="font-medium">Bachelor of Science in Computer Engineering</h3>
        <small class="text-gray-500 italic">Jose Memorial State University (2019-2022)</small>
      </div>
    </div>

    <div class="flex gap-4">
      <GraduationCap :size="28" />
      <div>
        <h3 class="font-medium">Science, Technology, Engineering, and Mathematics</h3>
        <small class="text-gray-500 italic">Andres Bonifacio College (2017-2019)</small>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next';
</script>