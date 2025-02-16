<script lang="ts" setup>
import type { Rcd } from '~/types'

const props = defineProps<{
  recordTimes?: Rcd['time'][]
  times?: number[]
  title?: string
}>()

const { t } = useI18n()

const { store } = useStarStore()

const records = computed(() => {
  if (!store.value)
    return []
  return store.value.records.filter(record => props.recordTimes?.includes(record.time)).reverse()
})

const visible = ref(false)

watch(() => props.recordTimes, () => {
  visible.value = true
})
watch(() => props.times, () => {
  visible.value = true
})
</script>

<template>
  <a-drawer
    v-model:visible="visible"
    height="78vh"
    placement="bottom"
    :header="false"
    :footer="false"

    unmount-on-close hide-cancel
  >
    <template v-if="title" #title>
      {{ title }}
    </template>
    <div class="flex flex-col gap3vh md:h-full md:flex-row md:gap3vw">
      <div class="md:min-w-0 md:flex-3">
        <slot />
      </div>
      <div
        class="min-h-0 flex flex-auto flex-col gap2vh md:min-w-0 md:gap-2vw md:overflow-y-auto md:flex-7"
        :class="{ 'py2vh px2vw': records.length }"
      >
        <TheRecordCard
          v-for="(record, index) in records"
          :key="index"
          :record="record"
        />
        <div v-if="times?.length">
          <div class="arco-descriptions-item-label-block">
            {{ t('app.rewardDoneTime') }}
          </div>
          <div class="flex flex-col gap-1vh">
            <a-tag v-for="(time, index) in times" :key="index" class="w-fit">
              {{ dayjs(time).format(t('time.datetime')) }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<style scoped>

</style>
