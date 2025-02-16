<script lang="ts" setup>
import { loadLanguageAsync } from '~/modules/i18n'

const { t } = useI18n()
const router = useRouter()

const back = useLocalStorage('reach-star-back', '')
const historyBack: string = (import.meta.env.SSR ? undefined : history.state.back) || '/'
if (!historyBack.endsWith('/settings'))
  back.value = historyBack

function goBack() {
  if (back.value)
    router.push(back.value)
  else
    router.back()
}

const fontSize = useLocalStorage('reach-star-font-size', useCssVar('--the-font-size'))
const fontSizeValue = computed({
  get: () => Number.parseInt(fontSize.value || '') || 20,
  set: (v: number) => (fontSize.value = `${v.toString()}px`),
})
function addFontSize() {
  fontSizeValue.value = fontSizeValue.value + 2
}
function reduceFontSize() {
  fontSizeValue.value = Math.max(fontSizeValue.value - 2, 12)
}
</script>

<template>
  <div class="flex flex-col gap-2vh text-5">
    <div class="flex items-center">
      <a-button type="primary" @click="goBack()">
        <i class="i-solar-alt-arrow-left-bold-duotone ml--2 the-icon" />{{ t('button.back') }}
      </a-button>
      <div class="i-solar-settings-minimalistic-bold-duotone ml4 mr1 the-icon text-6 text-slate-500" />
      <span class="text-xl">{{ t('nav.settings') }}</span>
    </div>
    <div class="text-4 op67">
      {{ t('nav.appManage') }}
    </div>
    <div class="w-fit">
      <RouterLink to="/goals">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-star-angle-bold-duotone cursor-pointer text-8 text-lime the-icon-primary" />
          <div>{{ t('nav.goalsManage') }}</div>
        </div>
      </RouterLink>
    </div>
    <div class="w-fit">
      <RouterLink to="/data">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-database-bold-duotone cursor-pointer text-8 text-blue-500 the-icon-primary" />
          <div>{{ t('nav.dataManage') }}</div>
        </div>
      </RouterLink>
    </div>
    <div class="text-4 op67">
      {{ t('nav.preference') }}
    </div>
    <div class="w-fit">
      <DarkToggle class="text-8 text-amber dark:text-sky" />
    </div>
    <div class="w-fit">
      <div class="flex items-center gap-1vw">
        <div class="i-solar-text-circle-bold-duotone cursor-pointer text-8 text-pink-500 the-icon-primary" />
        <div class="select-none">
          <span class="mr2 cursor-pointer text-3 hover:op80" @click="reduceFontSize">Aa</span>
          <span class="cursor-pointer text-5 hover:op80" @click="addFontSize">Aa</span>
        </div>
      </div>
    </div>
    <div class="w-fit">
      <div class="flex items-center gap-1vw">
        <div class="i-duo-icons-g-translate cursor-pointer text-8 text-sky-500 the-icon-primary" />
        <div class="flex gap2">
          <button @click="loadLanguageAsync('en')">
            English
          </button>
          <button @click="loadLanguageAsync('zh')">
            中文
          </button>
        </div>
      </div>
    </div>
    <div class="text-4 op67">
      {{ t('nav.appInfo') }}
    </div>
    <div class="w-fit">
      <RouterLink to="/about">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-heart-angle-bold-duotone cursor-pointer text-8 text-rose-400 the-icon-primary" />
          <div>{{ t('nav.about') }}</div>
        </div>
      </RouterLink>
    </div>
    <div class="w-fit">
      <a href="https://github.com/wiidede/reach-star" target="_blank">
        <div class="flex items-center gap-1vw">
          <div class="i-uim-github cursor-pointer text-8 text-gray-600 the-icon-primary" />
          <div>Github</div>
        </div>
      </a>
    </div>
  </div>
</template>

<style  scoped>

</style>

<route lang="yaml">
meta:
  layout: full
</route>
