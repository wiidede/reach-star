<script lang="ts" setup>
import type { Goal, Rcd } from '~/types'

const { store } = useStarStore()
const goals = computed(() => store.value ? [...store.value.goals].reverse() : [])

const recordTimes = ref([] as Rcd['time'][])
const currentGoal = ref<Goal>()

function showCurrentGoal(goal: Goal) {
  currentGoal.value = goal
  recordTimes.value = goal.records.map(record => record.time)
}
</script>

<template>
  <div class="h-full w-full flex gap4vw overflow-x-auto overflow-y-hidden">
    <TheProgress
      v-for="(goal, index) in goals"
      :key="index"
      class="cursor-pointer"
      :value="goal.currentScore"
      :max="goal.goalScore"
      :color="goal.color"
      :label="goal.goalName"
      @click="showCurrentGoal(goal)"
    />
  </div>
  <TheRecordDrawer :record-times="recordTimes">
    <TheGoalDetail :goal="currentGoal" />
  </TheRecordDrawer>
</template>

<style  scoped>

</style>
