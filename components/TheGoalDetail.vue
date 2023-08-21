<script lang="ts" setup>
import type { Goal, TheDescData, TheRangeData, TheRangeRenderFn } from '~/types/common'

const props = defineProps<{
  goal: Goal | undefined
}>()

const descData = computed(() => {
  if (!props.goal)
    return []
  const goal = props.goal
  const data: TheDescData[] = [
    { label: '目标总分', value: displayNumber(goal.goalScore) },
    { label: '当前积分', value: displayNumber(goal.currentScore) },
    { label: '完成期限', value: `${dayjs(goal.timeRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(goal.timeRange[1]).format('YYYY-MM-DD')}` },
  ]
  goal.doneTime && data.push({ label: '完成时间', value: dayjs(goal.doneTime).format('YYYY-MM-DD HH:mm') })
  return data
})

const rangeData = computed(() => props.goal?.points.map(point => ({
  data: point.icon,
  value: getPercentage2Value(point.value, 0, props.goal?.goalScore || 100),
  key: Symbol('key'),
} as TheRangeData<string>)))

const rangeRenderTop: TheRangeRenderFn<string> = (data) => {
  return h('div', {
    class: 'text-uno-5 flex flex-col items-center line-height-initial',
  }, [
    h('div', {
      class: `${data.data} the-icon text-5 cursor-pointer`,
      onpointerdown: (e: PointerEvent) => e.stopPropagation(),
    }),
    h('div', { }, data.value),
  ])
}
</script>

<template>
  <a-descriptions
    v-if="goal"
    :class="`uno-${goal.color}`"
    :data="descData"
    :title="goal.goalName"
    :column="1"
    layout="vertical"
  >
    <a-descriptions-item v-for="(item, index) of descData" :key="index" :label="item.label">
      <a-tag>{{ item.value }}</a-tag>
    </a-descriptions-item>
    <a-descriptions-item label="阶段奖励">
      <TheRange
        :model-value="rangeData"
        :max="goal.goalScore"
        :progress="goal.currentScore / goal.goalScore * 100"
        class="pointer-events-none w-full"
        :class="{ 'pt16 pb8': rangeData?.length }"
        :render-top="rangeRenderTop"
      />
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>
