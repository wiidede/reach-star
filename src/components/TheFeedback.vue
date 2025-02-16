<script lang="ts" setup>
import type { TheFeedbackContent } from '~/types'

const props = defineProps<{
  data: TheFeedbackContent | undefined
}>()

const visible = ref(false)
const currentData = ref<TheFeedbackContent>()

let timer: number | undefined
async function setNewContent(value: TheFeedbackContent) {
  currentData.value = value
  visible.value = true
  timer = window.setTimeout(() => {
    visible.value = false
  }, 3000)
}

watch(() => props.data, async (value) => {
  if (!value)
    return
  if (visible.value) {
    clearTimeout(timer)
    visible.value = false
    await nextTick()
    setNewContent(value)
  }
  else {
    setNewContent(value)
  }
})
</script>

<template>
  <Transition name="the-slide">
    <a-form-item v-if="visible">
      <template v-if="currentData">
        <div v-if="currentData.type === 'success'" class="flex items-center gap-2vw text-4 text-green">
          <i class="i-solar-check-circle-bold-duotone the-icon" />
          {{ currentData.content }}
        </div>
        <div v-else-if="currentData.type === 'error'" class="flex items-center gap-2vw text-4 text-red">
          <i class="i-solar-close-circle-bold-duotone the-icon" />
          {{ currentData.content }}
        </div>
      </template>
    </a-form-item>
  </Transition>
</template>

<style scoped>

</style>
