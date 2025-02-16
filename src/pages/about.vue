<script setup>
const { store, defaultStore } = useStarStore()
const router = useRouter()

const { t } = useI18n()

function initStore() {
  store.value = defaultStore
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col items-center gap4">
    <div i-solar-star-bold-duotone class="text-20 text-yellow-300" />
    <div class="m0 text-8">
      {{ t('title') }}
    </div>
    <a-button v-if="!store" type="primary" @click="initStore">
      {{ t('about.start') }}
    </a-button>
    <a-button v-else type="primary" @click="router.back()">
      {{ t('about.continue') }}
    </a-button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: full
</route>
