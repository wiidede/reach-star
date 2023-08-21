<script lang="ts" setup>
import type { TheAchievementModalContent } from '~/types/common'

const props = defineProps<{
  data: TheAchievementModalContent | undefined
}>()

const visible = ref(false)
const currentData = ref<TheAchievementModalContent>()
const pendingData = ref<TheAchievementModalContent[]>([])

watch(() => props.data, (value) => {
  if (!value)
    return
  if (visible.value) {
    pendingData.value.push(value)
  }
  else {
    currentData.value = value
    visible.value = true
  }
})

watch(visible, async (value) => {
  if (value)
    return
  if (pendingData.value.length) {
    await nextTick()
    currentData.value = pendingData.value.shift()
    visible.value = true
  }
})
</script>

<template>
  <a-modal
    v-model:visible="visible"
    :modal-class="`arco-modal-pure ${currentData?.color ? `uno-${currentData.color}` : ''}`"
    width="auto"
    simple
    :footer="false"
    modal-animation-name="the-zoom"
    :mask-animation-name="pendingData.length ? 'none' : undefined"
  >
    <div v-if="currentData" class="text-uno-4 flex flex-col items-center">
      <div class="text-8" :class="currentData.icon" />
      <div>{{ currentData.content }}</div>
    </div>
  </a-modal>
</template>

<style scoped>

</style>
