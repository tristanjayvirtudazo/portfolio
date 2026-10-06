<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Renders its slot only in the browser, for UI that depends on client state (e.g. the theme).
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <slot v-if="isMounted" />
</template>
