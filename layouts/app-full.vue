<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

useHead({
  bodyAttrs: {
    class: 'reach-star',
  },
})

const fontSize = useLocalStorage('reach-star-font-size', useCssVar('--the-font-size'))
if (!fontSize.value)
  fontSize.value = '20px'
const color = useLocalStorage('reach-star-color', 'pink')
watch(color, (value) => {
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
    <main
      p="x2vw y2vh"
      text="0.85rem"
    >
      <slot />
    </main>
  </a-config-provider>
</template>
