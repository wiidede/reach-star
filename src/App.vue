<script setup lang="ts">
const color = useLocalStorage('reach-star-color', 'pink')
const { t } = useI18n()

useHead({
  title: t('title'),
  meta: [
    {
      name: 'description',
      content: t('description'),
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
