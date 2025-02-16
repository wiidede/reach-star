<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

useHead({
  htmlAttrs: {
    class: 'default-font-size-large',
  },
  bodyAttrs: {
    class: 'reach-star',
  },
})

const fontSize = useLocalStorage('reach-star-font-size', useCssVar('--the-font-size'))
if (!fontSize.value)
  fontSize.value = '20px'
const color = useLocalStorage('reach-star-color', 'pink')
watch(color, (value) => {
  if (import.meta.env.SSR) {
    return
  }
  const oldClass = Array.from(document.body.classList).find(className => className.startsWith('uno-'))
  if (oldClass)
    document.body.classList.remove(oldClass)
  document.body.classList.add(`uno-${value}`)
}, { immediate: true })

const { locale } = useI18n()
const arcoLocaleMap: Record<string, typeof enUS | undefined> = {
  en: enUS,
  zh: zhCN,
}
const arcoLocale = computed(() => arcoLocaleMap[locale.value])
</script>

<template>
  <a-config-provider :locale="arcoLocale">
    <div
      text="gray-700 dark:gray-200"
      class="h-full w-full flex flex-col-reverse gap-2vw md:flex-row"
    >
      <TheNav class="bg-gray-50/20" />
      <div
        class="min-h-0 flex flex-auto flex-col md:min-w-0"
      >
        <TheHeader />
        <main
          p="x2vw y2vh"
          class="min-h-0 flex-auto md:min-w-0"
          text="0.85rem"
        >
          <ClientOnly>
            <RouterView />
          </ClientOnly>
        </main>
      </div>
    </div>
  </a-config-provider>
</template>
