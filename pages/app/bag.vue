<script lang="ts" setup>
import type { Bag, Goal, Rcd, Reward, TheDescData, Time } from '~/types/common'

const { store } = useStarStore()

const currentType = ref<'' | Bag['type']>('')
const typeRadios = ref<{
  label: string
  value: '' | Bag['type']
}[]>([
  { label: '全部', value: '' },
  { label: '目标', value: 'goal' },
  { label: '一日', value: 'day' },
  { label: '一周', value: 'week' },
  { label: '奖励', value: 'reward' },
])

const bags = computed(() => store.value ? store.value.bags.filter(item => !currentType.value || item.type === currentType.value).reverse() : [])

const recordTimes = ref<Rcd['time'][]>([])
const times = ref<number[]>([])
const currentData = ref<TheDescData[]>()
const currentTitle = ref('')
const currentColor = ref('')

function showCurrentBag(bag: Bag) {
  if (bag.type === 'goal')
    showCurrentGoal(bag)
  else if (bag.type === 'day')
    showCurrentDay(bag)
  else if (bag.type === 'week')
    showCurrentWeek(bag)
  else if (bag.type === 'reward')
    showCurrentReward(bag)
}

function showCurrentDay(day: Time) {
  currentData.value = [
    { label: '今日目标', value: displayNumber(day.goalScore) },
    { label: '今日得分', value: displayNumber(day.currentScore) },
  ]
  currentTitle.value = dayjs(day.time).format('YYYY-MM-DD')
  currentColor.value = day.color
  recordTimes.value = day.records.map(record => record.time)
  times.value = []
}

function showCurrentWeek(week: Time) {
  currentData.value = [
    { label: '本周目标', value: displayNumber(week.goalScore) },
    { label: '本周得分', value: displayNumber(week.currentScore) },
  ]
  currentTitle.value = `${dayjs(week.time).startOf('week').add(1, 'day').format('YYYY-MM-DD')} ~ ${dayjs(week.time).endOf('week').add(1, 'day').format('YYYY-MM-DD')}`
  currentColor.value = week.color
  recordTimes.value = week.records.map(record => record.time)
  times.value = []
}

function showCurrentGoal(goal: Goal) {
  currentData.value = [
    { label: '目标总分', value: displayNumber(goal.goalScore) },
    { label: '当前积分', value: displayNumber(goal.currentScore) },
    { label: '完成期限', value: `${dayjs(goal.timeRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(goal.timeRange[1]).format('YYYY-MM-DD')}` },
  ]
  goal.doneTime && currentData.value.push({ label: '完成时间', value: dayjs(goal.doneTime).format('YYYY-MM-DD HH:mm') })
  currentTitle.value = goal.goalName
  currentColor.value = goal.color
  recordTimes.value = goal.records.map(record => record.time)
  times.value = []
}

function showCurrentReward(reward: Reward) {
  currentData.value = [
    { label: '获得奖励次数', value: String(reward.doneTimes.length) },
  ]
  currentTitle.value = ''
  recordTimes.value = []
  currentColor.value = ''
  times.value = reward.doneTimes
}
</script>

<template>
  <div class="h-full w-full flex flex-col gap-2vh">
    <a-radio-group v-model="currentType" type="button" class="w-fit">
      <a-radio v-for="radio in typeRadios" :key="radio.value" :value="radio.value">
        {{ radio.label }}
      </a-radio>
    </a-radio-group>
    <div class="min-h-0 flex flex-auto flex-wrap content-start gap-2vw overflow-y-auto">
      <a-button
        v-for="(item, index) in bags"
        :key="item.doneTime || index"
        class="!text-uno-4 !hover:text-uno-5"
        :class="[item.color ? `uno-${item.color}` : '']"
        @click="showCurrentBag(item)"
      >
        <div v-if="item.type === 'goal'" class="flex flex-col items-center">
          <div
            class="transition-size-300 h7 w7"
            :class="[item.icon]"
          />
          <div
            class="transition-size-300 max-w-50 truncate text-4"
            :title="item.oneTimeContent"
          >
            {{ item.oneTimeContent }}
          </div>
        </div>
        <div v-else-if="item.type === 'reward'" class="flex flex-col items-center">
          <div
            class="transition-size-300 h7 w7"
            :class="[item.icon]"
          />
          <div
            class="transition-size-300 text-4"
          >
            {{ item.doneTimes.length }}
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <div
            class="transition-size-300 h7 w7"
            :class="[item.type === 'day' ? 'i-solar-star-bold-duotone' : 'i-solar-stars-bold-duotone']"
          />
          <div
            class="transition-size-300 text-4"
          >
            {{ item.type === 'day' ? '一日星星' : '一周星星' }}
          </div>
        </div>
      </a-button>
    </div>
  </div>

  <TheRecordDrawer :record-times="recordTimes" :times="times">
    <a-descriptions
      :class="currentColor ? `uno-${currentColor}` : ''"
      :data="currentData"
      :title="currentTitle"
      :column="1"
      layout="vertical"
    >
      <a-descriptions-item v-for="(item, index) of currentData" :key="index" :label="item.label">
        <a-tag>{{ item.value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </TheRecordDrawer>
</template>

<style lang="css" scoped>

</style>
