<script setup lang="ts">
import type { FieldRule, FormInstance } from '@arco-design/web-vue'
import type { Goal, Rcd, TheAchievementModalContent } from '~/types'

const testDay = 0

const { t } = useI18n()
const { store } = useStarStore()
const { randomColor } = useColors()

const modalContent = ref<TheAchievementModalContent>()

const newGoal = ref<Goal>()
const goals = computed(() => store.value ? [...store.value.goals].reverse() : [])
const newRecord = ref<Rcd>()
const records = computed(() => store.value ? [...store.value.records].reverse() : [])
const recordsLength = ref(100)
const recordsLoaded = computed(() => records.value.length <= recordsLength.value)
const recordsShow = computed(() => records.value.slice(0, recordsLength.value))

const goalFormRef = ref<FormInstance>()
const newGoalValidator: FieldRule['validator'] = function (value, callback) {
  if (!newGoal.value)
    return callback(t('app.ruleGoal'))
  const nowTime = dayjs().subtract(testDay, 'day').valueOf()
  const goalStartTime = newGoal.value.timeRange[0]
  if (dayjs(nowTime).isBefore(goalStartTime, 'day'))
    return callback(`${t('app.ruleStartTime')}${dayjs(goalStartTime).format(t('time.date'))}。`)
  const goalEndTime = newGoal.value.timeRange[1]
  if (dayjs(nowTime).isAfter(goalEndTime, 'day'))
    return callback(`${t('app.ruleEndTime')}${dayjs(goalEndTime).format(t('time.date'))}。`)
  callback()
}
watch(newGoal, () => {
  goalFormRef.value?.validate()
})

const currentDay = computed(() => store.value?.days.find(day => dayjs().subtract(testDay, 'day').isSame(day.time, 'day')))
const currentWeek = computed(() => store.value?.weeks.find(week => theSameWeek(dayjs().subtract(testDay, 'day').valueOf(), week.time)))

const newDate = ref({
  dayGoal: 0,
  weekGoal: 0,
  color: randomColor(),
})
const rules: Partial<Record<keyof typeof newDate['value'], FieldRule | FieldRule[]>> = {
  dayGoal: [{ type: 'number', min: 1, max: 10000, required: true, message: t('app.ruleDayGoal') }],
  weekGoal: [{ type: 'number', min: 1, max: 10000, required: true, message: t('app.ruleWeekGoal') }],
}

const onSetNewDate: FormInstance['$props']['onSubmit'] = function ({ errors }) {
  if (errors)
    return
  if (!store.value)
    return
  if (!currentDay.value) {
    store.value.days.push({
      time: dayjs().subtract(testDay, 'day').valueOf(),
      goalScore: newDate.value.dayGoal,
      color: newDate.value.color,
      currentScore: 0,
      doneTime: 0,
      records: [],
    })
  }
  if (!currentWeek.value) {
    store.value.weeks.push({
      time: dayjs().subtract(testDay, 'day').valueOf(),
      goalScore: newDate.value.weekGoal,
      color: randomColor(),
      currentScore: 0,
      doneTime: 0,
      records: [],
    })
  }
  newDate.value = {
    dayGoal: 0,
    weekGoal: 0,
    color: randomColor(),
  }
}

function handleAdd() {
  newRecord.value = {
    content: '',
    point: 1,
    time: dayjs().subtract(testDay, 'day').valueOf(),
    color: randomColor(),
    icon: '',
    remark: '',
  }
}

function cancelAdd() {
  newRecord.value = undefined
  newGoal.value = undefined
}

const onAdd: FormInstance['$props']['onSubmit'] = async function ({ errors }) {
  if (errors)
    return
  if (!store.value || !newRecord.value || !newGoal.value || !currentDay.value || !currentWeek.value)
    return
  const goalValue = newGoal.value
  const dayValue = currentDay.value
  const weekValue = currentWeek.value
  const nowTime = dayjs().subtract(testDay, 'day').valueOf()
  newRecord.value = {
    content: goalValue.oneTimeContent,
    point: goalValue.oneTimeScore,
    time: nowTime,
    color: goalValue.color,
    icon: goalValue.icon,
    remark: newRecord.value.remark,
  }
  store.value.totalScore += goalValue.oneTimeScore
  // goal
  goalValue.currentScore += goalValue.oneTimeScore
  goalValue.records.push({ time: nowTime })
  for (const point of goalValue.points) {
    const value = getPercentage2Value(point.value, 0, goalValue.goalScore)
    if (goalValue.currentScore >= value && goalValue.currentScore - goalValue.oneTimeScore < value) {
      const rewardIndex = store.value.bags.findIndex(item => item.type === 'reward' && item.icon === point.icon)
      const doneTime = dayjs().subtract(testDay, 'day').valueOf()
      if (rewardIndex === -1) {
        store.value.bags.push({
          type: 'reward',
          icon: point.icon,
          doneTime,
          doneTimes: [doneTime],
        })
      }
      else {
        const reward = store.value.bags[rewardIndex]
        if (reward.type !== 'reward')
          continue
        reward.doneTimes.push(doneTime)
        reward.doneTime = doneTime
        store.value.bags.splice(rewardIndex, 1, reward)
      }
      modalContent.value = {
        icon: point.icon,
        content: t('app.tipReward', { value }),
        color: goalValue.color,
      }
      await nextTick()
    }
  }
  if (goalValue.currentScore >= goalValue.goalScore && goalValue.currentScore - goalValue.oneTimeScore < goalValue.goalScore) {
    goalValue.doneTime = dayjs().subtract(testDay, 'day').valueOf()
    store.value.goals.splice(store.value.goals.findIndex(goal => goal === goalValue), 1)
    store.value.bags.push({ type: 'goal', ...structuredClone(toRaw(goalValue)) })
    modalContent.value = {
      icon: goalValue.icon,
      content: t('app.tipGaol', { name: goalValue.goalName }),
      color: goalValue.color,
    }
    await nextTick()
  }
  // day
  dayValue.currentScore += goalValue.oneTimeScore
  dayValue.records.push({ time: nowTime })
  if (dayValue.currentScore >= dayValue.goalScore && dayValue.currentScore - goalValue.oneTimeScore < dayValue.goalScore) {
    dayValue.doneTime = dayjs().subtract(testDay, 'day').valueOf()
    store.value.bags.push({ type: 'day', ...structuredClone(toRaw(dayValue)) })
    modalContent.value = {
      icon: 'i-solar-star-bold-duotone',
      content: `${t('app.tipDay')}——${dayjs(dayValue.time).format(t('time.date'))}`,
      color: dayValue.color,
    }
    await nextTick()
  }
  // week
  weekValue.currentScore += goalValue.oneTimeScore
  weekValue.records.push({ time: nowTime })
  if (weekValue.currentScore >= weekValue.goalScore && weekValue.currentScore - goalValue.oneTimeScore < weekValue.goalScore) {
    weekValue.doneTime = dayjs().subtract(testDay, 'day').valueOf()
    store.value.bags.push({ type: 'week', ...structuredClone(toRaw(weekValue)) })
    modalContent.value = {
      icon: 'i-solar-stars-bold-duotone',
      content: `${t('app.tipWeek')}——${dayjs(weekValue.time).startOf('week').add(1, 'day').format(t('time.dateShort'))} ~ ${dayjs(weekValue.time).endOf('week').add(1, 'day').format(t('time.dateShort'))}`,
      color: weekValue.color,
    }
    await nextTick()
  }
  // record
  store.value.records.push(newRecord.value)

  newRecord.value = undefined
  newGoal.value = undefined
}

const color = useLocalStorage('reach-star-color', 'pink')
watchEffect(() => {
  color.value = currentDay.value?.color || newDate.value.color
})
</script>

<template>
  <div v-if="(!currentDay || !currentWeek)">
    <a-form :model="newDate" :rules="rules" auto-label-width @submit="onSetNewDate">
      <a-form-item v-if="!currentDay" field="dayGoal" :label="t('app.dayGoal')" hide-asterisk>
        <a-input-number v-model="newDate.dayGoal" :placeholder="`${t('enter')}${t('app.dayGoal')}`" />
      </a-form-item>
      <a-form-item v-if="!currentWeek" field="weekGoal" :label="t('app.weekGoal')" hide-asterisk>
        <a-input-number v-model="newDate.weekGoal" :placeholder="`${t('enter')}${t('app.weekGoal')}`" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="mr2vw">
          {{ t('button.confirm') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <div v-if="(store && currentDay && currentWeek)" class="h-full flex flex-col gap-2vh">
    <div class="min-h-0 flex flex-auto gap4vw">
      <TheProgress
        :value="currentDay?.currentScore"
        :max="currentDay?.goalScore"
        :color="currentDay?.color"
        :label="t('app.progress')"
        :truncate-label="false"
      />
      <div class="max-h-full min-w-0 flex flex-auto flex-col gap2vw overflow-y-auto px2vw py-1vw">
        <TheRecordCard
          v-for="(record, index) in recordsShow"
          :key="index"
          :record="record"
        />
        <div v-if="!recordsLoaded" class="flex justify-center gap-4vw">
          <a-button @click="recordsLength += 100">
            {{ t('button.loadMore') }}
          </a-button>
          <a-button @click="recordsLength = records.length">
            {{ t('button.loadAll') }}
          </a-button>
        </div>
      </div>
    </div>
    <a-button type="outline" long @click="handleAdd">
      {{ t('app.add') }}
    </a-button>
  </div>
  <a-drawer
    :visible="!!newRecord"
    height="fit-content"
    class="full-drawer"
    :drawer-style="{ maxHeight: '100vh', background: 'transparent' }"
    placement="bottom"
    :header="false"
    :footer="false"
    unmount-on-close hide-cancel
  >
    <div
      v-if="newRecord"
      class="max-h-96vh rd-2vw"
      :style="{
        background: 'rgb(var(--primary-1))',
        boxShadow: `inset 0px 0px 1px 1px rgb(var(--primary-3)), 1px 2px 12px 0px rgb(var(--primary-2)), 0 1px 6px 0px #00000020`,
      }"
    >
      <a-form ref="goalFormRef" :model="newRecord" class="h-full" auto-label-width @submit="onAdd">
        <div class="max-h-96vh flex flex-col pt-3vh">
          <div class="min-h-0 flex-auto overflow-x-hidden overflow-y-auto px5vw">
            <a-form-item field="newGoal" label="" :rules="{ validator: newGoalValidator }">
              <div class="flex flex-wrap items-center justify-between gap-1vw">
                <a-button
                  v-for="(goal, index) in goals"
                  :key="index"
                  class="goal-button"
                  :class="[`uno-${goal.color}`, { active: newGoal === goal }]"
                  @click="newGoal = goal"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="flex items-center gap2 text-5 transition-size-300"
                      :class="{ 'text-7': newGoal === goal }"
                    >
                      <div class="text-6" :class="[goal.icon, { 'text-8': newGoal === goal }]" />
                      <span>{{ displayNumber(goal.oneTimeScore) }}</span>
                    </div>
                    <div
                      class="max-w-50 truncate text-4 transition-size-300"
                      :class="[{ 'text-5': newGoal === goal }]"
                      :title="goal.oneTimeContent"
                    >
                      {{ goal.oneTimeContent }}
                    </div>
                  </div>
                </a-button>
                <RouterLink to="/goals">
                  <a-button>
                    {{ t('nav.goalsManage') }}
                  </a-button>
                </RouterLink>
              </div>
            </a-form-item>
            <a-form-item field="remark" label="">
              <a-input v-model="newRecord.remark" :placeholder="t('app.placeholderRemark')" />
            </a-form-item>
          </div>
          <div class="my-1vh px5vw">
            <a-form-item>
              <a-button type="primary" html-type="submit" class="mr2vw">
                {{ t('button.confirm') }}
              </a-button>
              <a-button @click="cancelAdd">
                {{ t('button.cancel') }}
              </a-button>
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>
  </a-drawer>
  <TheAchievementModal :data="modalContent" />
</template>

<style scoped>
.goal-button {
  color: rgb(var(--primary-4));
}

.goal-button:hover,
.goal-button.active {
  color: rgb(var(--primary-5));
}
</style>
