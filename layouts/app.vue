<script setup lang="ts">
import { useStorage } from '@vueuse/core'

useHead({
  bodyAttrs: {
    class: 'reach-star',
  },
})

useStorage('reach-star-font-size', useCssVar('--the-font-size'))
const color = useStorage('reach-star-color', 'pink')
watch(color, (value) => {
  const oldClass = Array.from(document.body.classList).find(className => className.startsWith('uno-'))
  if (oldClass)
    document.body.classList.remove(oldClass)
  document.body.classList.add(`uno-${value}`)
}, { immediate: true })
</script>

<template>
  <div
    text="gray-700 dark:gray-200"
    bg="#F5FEFE dark:sky-900"
    class="h-full w-full flex flex-col-reverse gap-2vw md:flex-row"
  >
    <TheNav class="bg-sky-50" /> <!-- border border-t-sky/20 md:border-r-sky/20 md:border-t-transparent -->
    <div
      class="min-h-0 flex flex-auto flex-col md:min-w-0"
    >
      <TheHeader />
      <main
        p="x2vw y2vh"
        class="min-h-0 flex-auto md:min-w-0"
        text="0.85rem"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
