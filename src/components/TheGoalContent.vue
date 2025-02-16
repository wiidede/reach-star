<script lang="ts" setup>
import type { Goal } from '~/types'

defineProps<{
  goal: Goal
  showDelete?: boolean
}>()

const emit = defineEmits<{
  (event: 'delete'): void
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center gap2vw"
  >
    <div class="min-w-20 flex flex-col items-center text-8 font-bold text-uno-5">
      <div :class="[goal.icon]" />
      <div class="point-number">
        {{ displayNumber(goal.goalScore) }}
      </div>
    </div>
    <div class="min-w-0 flex flex-auto flex-col items-start">
      <div class="w-full flex items-center gap-2vw text-8 font-bold text-uno-5">
        <span class="min-w-0 line-warp">{{ goal.goalName }}</span>
      </div>
      <div class="w-full flex items-center gap-2 text-6 text-uno-7">
        <span v-show="typeof goal.oneTimeScore === 'number'" class="point-number flex-shrink-0">+{{ displayNumber(goal.oneTimeScore) }}</span>
        <span v-show="typeof goal.oneTimeScore === 'number' && goal.oneTimeContent"> /</span>
        <span class="min-w-0 line-warp">{{ goal.oneTimeContent }}</span>
      </div>
      <div class="text-3 text-uno-5">
        {{ dayjs(goal.timeRange[0]).format(t('time.date')) }} - {{ dayjs(goal.timeRange[1]).format(t('time.date')) }}
      </div>
    </div>
    <a-popconfirm
      :content="t('goals.clearTip')"
      position="top"
      :content-class="`uno-${goal.color}`"
      @ok="emit('delete')"
    >
      <template #icon>
        <div class="i-solar-info-circle-bold-duotone text-uno-5" />
      </template>
      <a-button v-if="showDelete" type="text" class="ml-auto">
        <template #icon>
          <div class="i-solar-trash-bin-minimalistic-bold-duotone op50" />
        </template>
      </a-button>
    </a-popconfirm>
  </div>
</template>

<style  scoped>

</style>
