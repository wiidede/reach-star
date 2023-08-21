<script setup>
definePageMeta({ layout: 'app' })

const { store, defaultStore } = useStarStore()
const router = useRouter()

function initStore() {
  store.value = defaultStore
  router.back()
}
</script>

<template>
  <div class="text-center">
    <TheAbout />
    <a-button v-if="!store" type="primary" @click="initStore">
      start ✨ reach-star~
    </a-button>
    <a-button v-else type="primary" @click="router.back()">
      攒 credits！
    </a-button>
  </div>
</template>
