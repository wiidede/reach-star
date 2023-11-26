<script setup lang="ts">
const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <div>
    <div i-solar-star-bold-duotone class="text-20 text-yellow-300" />
    <h1 class="text-8">
      {{ t('title') }}
    </h1>
    <div class="flex flex-col gap-4">
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
  </div>
</template>
