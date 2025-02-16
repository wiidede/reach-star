<script setup lang="ts">
import { appName } from '~/constants'

const color = useLocalStorage('reach-star-color', 'pink')

useHead({
  title: appName,
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? color.value : color.value,
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  height: 100dvh;
  width: 100dvw;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
