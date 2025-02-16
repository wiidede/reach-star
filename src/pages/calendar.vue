<script lang="ts" setup>
import type { Rcd, TheDescData, Time } from '~/types'

const { t } = useI18n()

const { store } = useStarStore()

const pickerValue = ref(dayjs().valueOf())
const week = computed(() => store.value?.weeks.find(week => theSameWeek(week.time, pickerValue.value)))
const days = computed(() => store.value?.days.filter(day => theSameWeek(day.time, pickerValue.value)))
const dayBgMap = computed(() => {
  const map = new Map<string, string | undefined>()
  store.value?.days.forEach((day) => {
    const date = dayjs(day.time)
    map.set(dayjs(day.time).format(t('time.date')), day.currentScore > 0 ? date.diff('2023-04-03', 'week') % 2 === 0 ? 'cell-sky' : 'cell-pink' : undefined)
  })
  return map
})
const dayScoreMap = computed(() => {
  const map = new Map<string, string>()
  store.value?.days.forEach((day) => {
    map.set(dayjs(day.time).format(t('time.date')), day.currentScore >= 0 ? `+${displayNumber(day.currentScore)}` : '')
  })
  return map
})
const dayIndex = computed(() => {
  return days.value ? days.value.findIndex(day => dayjs(day.time).isSame(pickerValue.value, 'day')) : -1
})
const dayIndexes = computed(() => {
  if (!days.value)
    return []
  const index = dayIndex.value
  if (index === -1)
    return days.value.map(() => 0)
  return days.value.map((_, i) => i === index ? -index : i < index ? 1 : 0)
})

const recordTimes = ref([] as Rcd['time'][])
const currentData = ref<TheDescData[]>()
const currentTitle = ref('')
const currentColor = ref('')

function showCurrentDay(day: Time) {
  currentData.value = [
    { label: t('app.dayGoal'), value: displayNumber(day.goalScore) },
    { label: t('app.dayScore'), value: displayNumber(day.currentScore) },
  ]
  currentTitle.value = dayjs(day.time).format(t('time.date'))
  currentColor.value = day.color
  recordTimes.value = day.records.map(record => record.time)
}

function showCurrentWeek(week: Time) {
  currentData.value = [
    { label: t('app.weekGoal'), value: displayNumber(week.goalScore) },
    { label: t('app.weekScore'), value: displayNumber(week.currentScore) },
  ]
  currentTitle.value = `${dayjs(week.time).startOf('week').add(1, 'day').format(t('time.date'))} ~ ${dayjs(week.time).endOf('week').add(1, 'day').format(t('time.date'))}`
  currentColor.value = week.color
  recordTimes.value = week.records.map(record => record.time)
}
</script>

<template>
  <div class="h-full w-full flex shrink-0 flex-col items-center overflow-x-hidden overflow-y-auto md:flex-row md:items-initial">
    <a-date-picker
      v-model="pickerValue"
      hide-trigger
      value-format="Date"
      class="the-date-display-picker h-fit flex-shrink-0"
    >
      <template #cell="{ date }: {date: Date}">
        <div class="arco-picker-date" :class="dayBgMap.get(dayjs(date).format(t('time.date')))">
          <div class="arco-picker-date-date text-uno-3">
            {{ date.getDate() }}
          </div>
          <div class="arco-picker-date-score h-3 text-2.5 text-uno-3">
            {{ dayScoreMap.get(dayjs(date).format(t('time.date'))) }}
          </div>
        </div>
      </template>
    </a-date-picker>
    <div class="min-h-30vh w-full flex flex-auto gap2vw overflow-x-auto overflow-y-hidden px-2vw py-2vh md:h-auto">
      <TheProgress
        v-if="week"
        class="current-filter cursor-pointer"
        :value="week.currentScore"
        :max="week.goalScore"
        width="4rem"
        :color="week.color"
        :label="t('app.week')"
        @click="showCurrentWeek(week)"
      />
      <div />
      <div />
      <div />
      <TheProgress
        v-for="(day, index) in days"
        :key="index"
        :style="{ transform: `translateX(calc(${dayIndexes[index] * 4}rem + ${dayIndexes[index] * 2 - (dayIndex === index ? 6 : 0)}vw))` }"
        class="cursor-pointer transition-transform duration-300"
        :class="{ 'current-filter': dayIndex === index }"
        :value="day.currentScore"
        :max="day.goalScore"
        width="4rem"
        :color="day.color"
        :label="dayjs(day.time).format(t('time.dateShort'))"
        @click="showCurrentDay(day)"
      />
    </div>
  </div>
  <TheRecordDrawer :record-times="recordTimes">
    <a-descriptions
      :class="`uno-${currentColor}`"
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
.current-filter :deep(.the-progress-label) {
  filter: drop-shadow(0.1rem 0.15rem 0.25rem rgb(var(--primary-5)));
}

.cell-sky {
  --at-apply: bg-sky-100/33;
}

.cell-pink {
  --at-apply: bg-pink-100/33;
}

:deep(.arco-picker-cell-in-view) .cell-sky {
  --at-apply: bg-sky-300/33;
}

:deep(.arco-picker-cell-in-view) .cell-pink {
  --at-apply: bg-pink-300/33;
}

:deep(.arco-picker-cell-in-view) .arco-picker-date-date {
  color: rgb(var(--primary-9));
}
:deep(.arco-picker-cell-in-view) .arco-picker-date-score {
  color: rgb(var(--primary-6));
}

:deep(.arco-picker-body) {
  padding: 0;
}
:deep(.arco-picker-week-list) {
  padding: 0.2rem 0;
}
:deep(.arco-picker-week-list-item) {
  width: 1.7rem;
  text-align: end;
}
:deep(.arco-picker-cell-selected) {
  background: rgb(var(--primary-6));
}
:deep(.arco-picker-cell-today) {
  font-weight: bold;
}
:deep(.arco-picker-cell-today::after) {
  display: none;
}
:deep(.arco-picker-cell-selected) .arco-picker-date-date {
  color: white;
}
:deep(.arco-picker-cell-selected) .arco-picker-date-score {
  color: white;
}

.the-date-display-picker .arco-picker-date {
  width: 1.7rem;
  height: fit-content;
  flex-direction: column;
  align-items: flex-end;
  transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
}

:deep(.arco-picker-row) {
  border-top: 1px solid var(--color-neutral-2);
}
</style>
