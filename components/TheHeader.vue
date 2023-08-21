<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { StarStore } from '~/composables/star'

const router = useRouter()
const { store } = useStarStore((localStore: StarStore | null) => {
  if (!localStore)
    router.push('/app/about')
})

const fontSize = useStorage('reach-star-font-size', useCssVar('--the-font-size'))
const fontSizeValue = computed({
  get: () => Number.parseInt(fontSize.value) || 16,
  set: (v: number) => (fontSize.value = `${v.toString()}px`),
})
function addFontSize() {
  fontSizeValue.value = fontSizeValue.value + 2
}
function reduceFontSize() {
  fontSizeValue.value = Math.max(fontSizeValue.value - 2, 12)
}

const achievementCount = computed(() => {
  if (!store.value)
    return 0
  return store.value.bags.filter(i => i.type !== 'reward').length
})
</script>

<template>
  <header class="flex items-center justify-around gap-2vw p3">
    <div v-if="store" class="flex flex-auto items-center gap-1vw text-5">
      <span class="text-uno-5 flex items-center gap-1 font-500">成就<a-tag size="large">{{ achievementCount }}</a-tag></span>
      <span class="text-uno-5 flex items-center gap-1 font-500">积分<a-tag size="large">{{ displayNumber(store.totalScore) }}</a-tag></span>
    </div>
    <div v-if="store" class="select-none">
      <span class="mr2 cursor-pointer text-3 hover:op80" @click="reduceFontSize">Aa</span>
      <span class="cursor-pointer text-5 hover:op80" @click="addFontSize">Aa</span>
    </div>
    <NuxtLink to="/app/goals" title="目标">
      <div class="i-solar-star-angle-bold-duotone the-icon-primary text-uno-4 cursor-pointer text-6" />
    </NuxtLink>
    <NuxtLink to="/app/settings" title="设置">
      <div class="i-solar-settings-minimalistic-bold-duotone the-icon-primary cursor-pointer text-6 text-slate-500" />
    </NuxtLink>
  </header>
</template>
