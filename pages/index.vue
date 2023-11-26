<script setup lang="ts">
const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div i-solar-star-bold-duotone class="text-20 text-yellow-300" />
    <div class="m0 text-8 font-bold">
      {{ t('title') }}
    </div>
    <DarkToggle class="text-8 text-amber dark:text-sky" />
    <nuxt-link :to="switchLocalePath('en')">
      English
    </nuxt-link>
    <nuxt-link :to="switchLocalePath('zh')">
      中文
    </nuxt-link>
    <NuxtLink :to="localePath('/app')">
      {{ t('about.start') }}
    </NuxtLink>
  </div>
</template>
