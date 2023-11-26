<script setup lang="ts">
const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <div>
    <h1>{{ t('title') }}</h1>
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
