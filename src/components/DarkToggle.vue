<script setup lang="ts">
useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => isDark.value ? '#222222' : '#ffffff',
  }],
})
</script>

<template>
  <button class="!outline-none" @click="toggleDark()">
    <div class="i-solar-sun-bold-duotone dark:i-solar-moon-stars-bold-duotone" />
  </button>
</template>
