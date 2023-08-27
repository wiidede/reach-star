<script lang="ts" setup>
import type { StarStore } from '~/composables/star'

const router = useRouter()
const { store } = useStarStore((localStore: StarStore | null) => {
  if (!localStore)
    router.push('/app/about')
})

const achievementCount = computed(() => {
  if (!store.value)
    return 0
  return store.value.bags.filter(i => i.type !== 'reward').length
})
</script>

<template>
  <header class="flex items-center justify-around gap-2vw p3">
    <div v-if="store" class="flex flex-auto items-center gap-1vw text-5">
      <span class="flex items-center gap-1 font-500 text-uno-5">{{ $t('label.achievement') }}<a-tag size="large">{{ achievementCount }}</a-tag></span>
      <span class="flex items-center gap-1 font-500 text-uno-5">{{ $t('label.credits') }}<a-tag size="large">{{ displayNumber(store.totalScore) }}</a-tag></span>
    </div>
    <NuxtLink to="/app/goals" title="目标">
      <div class="i-solar-star-angle-bold-duotone cursor-pointer text-6 text-uno-4 the-icon-primary" />
    </NuxtLink>
    <NuxtLink to="/app/settings" title="设置">
      <div class="i-solar-settings-minimalistic-bold-duotone cursor-pointer text-6 text-slate-500 the-icon-primary" />
    </NuxtLink>
  </header>
</template>
