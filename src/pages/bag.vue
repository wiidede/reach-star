<script lang="ts" setup>
import type { Bag, Goal, Rcd, Reward, TheDescData, Time } from '~/types'

const { t } = useI18n()

const { store } = useStarStore()

const currentType = ref<'' | Bag['type']>('')
const typeRadios = ref<{
  label: string
  value: '' | Bag['type']
}[]>([
  { label: t('bag.total'), value: '' },
  { label: t('bag.goal'), value: 'goal' },
  { label: t('bag.day'), value: 'day' },
  { label: t('bag.week'), value: 'week' },
  { label: t('bag.reward'), value: 'reward' },
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
    { label: t('app.dayGoal'), value: displayNumber(day.goalScore) },
    { label: t('app.dayScore'), value: displayNumber(day.currentScore) },
  ]
  currentTitle.value = dayjs(day.time).format(t('time.date'))
  currentColor.value = day.color
  recordTimes.value = day.records.map(record => record.time)
  times.value = []
}

function showCurrentWeek(week: Time) {
  currentData.value = [
    { label: t('app.weekGoal'), value: displayNumber(week.goalScore) },
    { label: t('app.weekScore'), value: displayNumber(week.currentScore) },
  ]
  currentTitle.value = `${dayjs(week.time).startOf('week').add(1, 'day').format(t('time.date'))} ~ ${dayjs(week.time).endOf('week').add(1, 'day').format(t('time.date'))}`
  currentColor.value = week.color
  recordTimes.value = week.records.map(record => record.time)
  times.value = []
}

function showCurrentGoal(goal: Goal) {
  currentData.value = [
    { label: t('goals.goalScore'), value: displayNumber(goal.goalScore) },
    { label: t('goals.currentScore'), value: displayNumber(goal.currentScore) },
    { label: t('goals.timeRange'), value: `${dayjs(goal.timeRange[0]).format(t('time.date'))} ~ ${dayjs(goal.timeRange[1]).format(t('time.date'))}` },
  ]
  goal.doneTime && currentData.value.push({ label: t('goals.completeTime'), value: dayjs(goal.doneTime).format(t('time.datetime')) })
  currentTitle.value = goal.goalName
  currentColor.value = goal.color
  recordTimes.value = goal.records.map(record => record.time)
  times.value = []
}

function showCurrentReward(reward: Reward) {
  currentData.value = [
    { label: t('bag.rewardTimes'), value: String(reward.doneTimes.length) },
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
            class="h7 w7 transition-size-300"
            :class="[item.icon]"
          />
          <div
            class="max-w-50 truncate text-4 transition-size-300"
            :title="item.oneTimeContent"
          >
            {{ item.oneTimeContent }}
          </div>
        </div>
        <div v-else-if="item.type === 'reward'" class="flex flex-col items-center">
          <div
            class="h7 w7 transition-size-300"
            :class="[item.icon]"
          />
          <div
            class="text-4 transition-size-300"
          >
            {{ item.doneTimes.length }}
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <div
            class="h7 w7 transition-size-300"
            :class="[item.type === 'day' ? 'i-solar-star-bold-duotone' : 'i-solar-stars-bold-duotone']"
          />
          <div
            class="text-4 transition-size-300"
          >
            {{ item.type === 'day' ? t('bag.dayStar') : t('bag.weekStar') }}
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

<style  scoped>

</style>
