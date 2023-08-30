<script setup lang="ts">
const { t } = useI18n()
const online = useOnline()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    {{ t('title') }}
    <nuxt-link :to="switchLocalePath('en')">
      <button m-3 text-sm btn>
        English
      </button>
    </nuxt-link>
    <nuxt-link :to="switchLocalePath('zh')">
      <button m-3 text-sm btn>
        中文
      </button>
    </nuxt-link>
    <NuxtLink :to="localePath('/app')">
      <button m-3 text-sm btn>
        GO APP
      </button>
    </NuxtLink>
  </div>
</template>
