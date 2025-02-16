<script lang="ts" setup>
const { t } = useI18n()

const { store } = useStarStore()

const achievementCount = computed(() => {
  if (!store.value)
    return 0
  return store.value.bags.filter(i => i.type !== 'reward').length
})
</script>

<template>
  <header class="flex items-center justify-around gap-2vw p3">
    <div class="flex flex-auto items-center gap-1vw text-5">
      <ClientOnly>
        <span v-if="store" class="flex items-center gap-1 font-500 text-uno-5">{{ t('label.achievement') }}<a-tag size="large">{{ achievementCount }}</a-tag></span>
        <span v-if="store" class="flex items-center gap-1 font-500 text-uno-5">{{ t('label.credits') }}<a-tag size="large">{{ displayNumber(store.totalScore) }}</a-tag></span>
      </ClientOnly>
    </div>
    <!-- <DarkToggle class="text-5 m-0.5 dark:text-sky text-amber lt-sm:hidden"/> -->
    <RouterLink to="/goals" :title="t('nav.goalsManage')" class="flex">
      <div class="i-solar-star-angle-bold-duotone cursor-pointer text-6 text-uno-4 the-icon-primary" />
    </RouterLink>
    <RouterLink to="/settings" :title="t('nav.settings')" class="flex">
      <div class="i-solar-settings-minimalistic-bold-duotone cursor-pointer text-6 text-slate-500 the-icon-primary" />
    </RouterLink>
  </header>
</template>
