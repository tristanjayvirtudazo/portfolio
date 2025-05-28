<template>
  <form action="" class="flex flex-col gap-4 max-w-2xl mx-auto">
    <input class="w-full border rounded-md p-3 " type="name" name="name" placeholder="Name" />
    <input class="w-full border rounded-md p-3" type="email" name="email" placeholder="Email" />

    <textarea name="message" id="message" placeholder="Message" class="input h-32 w-full border rounded-md p-3 resize-none">
    </textarea>

    <button>
      <div class="flex gap-4 items-center justify-center bg-blue-500 text-white font-medium rounded-md py-2">
        <Send :size="25" />
        <span class="text-xl">Send</span>
      </div>
    </button>
  </form>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next'
</script>