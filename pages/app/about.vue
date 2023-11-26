<script setup>
const { store, defaultStore } = useStarStore()
const router = useRouter()

const { t } = useI18n()

function initStore() {
  store.value = defaultStore
  router.back()
}
</script>

<template>
  <div class="text-center">
    <a-button v-if="!store" type="primary" @click="initStore">
      {{ t('about.start') }}
    </a-button>
    <a-button v-else type="primary" @click="router.back()">
      {{ t('about.continue') }}
    </a-button>
  </div>
</template>
