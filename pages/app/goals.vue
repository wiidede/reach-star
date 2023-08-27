<script lang="ts" setup>
import type { FieldRule, FormInstance } from '@arco-design/web-vue'
import TheIconSelectorVue from '~/components/TheIconSelector.vue'
import type { Goal, TheRangeData, TheRangeRenderFn } from '~/types/common'

const { t } = useI18n()
const router = useRouter()
const { store } = useStarStore()
const { colorList, randomColor } = useColors()
const { iconList, randomIcon, randomRewardIcon } = useIcons()

const newGoal = ref<Goal & { newRange: TheRangeData<string>[] }>()
const goals = computed(() => store.value ? [...store.value.goals].reverse() : [])
const formRef = ref<FormInstance>()
const rules: Partial<Record<keyof Goal | 'newRange', FieldRule | FieldRule[]>> = {
  goalName: [{ required: true, message: '请输入目标名称' }],
  goalScore: [{ type: 'number', min: 1, max: 10000, required: true, message: '请输入目标总分 (1-10000)' }],
  oneTimeContent: [{ required: true, message: '请输入单次记录名称' }],
  oneTimeScore: [{ type: 'number', min: 1, max: 10000, required: true, message: '请输入单次记录积分 (1-10000)' }],
  newRange: [{
    validator: (value: TheRangeData<string>[], callback) => {
      const values = value.map(item => getPercentage2Value(item.value, 0, newGoal.value?.goalScore))
      if (values.includes(0)) {
        callback('阶段奖励的值不能为：0')
        return
      }
      const duplicates = getDuplicates(values)
      if (duplicates.length) {
        callback(`阶段奖励的值不能重复：${duplicates.join(', ')}`)
        return
      }
      callback()
    },
  }],
}

watch(() => [newGoal.value?.newRange, newGoal.value?.goalScore], () => {
  formRef.value?.validateField('newRange')
}, {
  deep: true,
})

function handleAdd() {
  newGoal.value = {
    goalName: '',
    goalScore: 100,
    oneTimeContent: '',
    oneTimeScore: 1,
    color: randomColor(),
    icon: randomIcon(),
    timeRange: [dayjs().valueOf(), dayjs().add(6, 'day').valueOf()],
    points: [],
    currentScore: 0,
    doneTime: 0,
    records: [],
    newRange: [{
      value: 100,
      data: '',
      key: Symbol('key'),
      disabled: true,
      renderTop: () => h('div', {
        class: 'text-center text-uno-5 whitespace-nowrap',
      }, [
        h('div', { class: 'line-height-[2]' }, '完成'),
      ]),
    }],
  }
}

function cancelAdd() {
  newGoal.value = undefined
}

const onAdd: FormInstance['$props']['onSubmit'] = function ({ errors }) {
  if (errors)
    return
  if (!store.value)
    return
  if (newGoal.value) {
    newGoal.value.points = newGoal.value.newRange.filter(item => item.data).map(item => ({
      icon: item.data!,
      value: item.value,
    }))
    store.value.goals.push(_omit(newGoal.value, 'newRange'))
    newGoal.value = undefined
  }
}

function handleDelete(item: Goal) {
  if (!store.value)
    return
  const index = store.value.goals.findIndex(i => i === item)
  if (index >= 0)
    store.value.goals.splice(index, 1)
}

const rangeRenderTop: TheRangeRenderFn<string> = (data) => {
  return h('div', {
    class: 'text-uno-5 flex flex-col items-center line-height-initial',
  }, [
    h(TheIconSelectorVue, {
      'modelValue': data.data,
      'onUpdate:modelValue': (val: string | undefined) => data.data = val,
      'class': newGoal.value ? `uno-${newGoal.value.color}` : '',
    }, () => h('div', {
      class: `${data.data} the-icon text-5 cursor-pointer`,
      onpointerdown: (e: PointerEvent) => e.stopPropagation(),
    })),
    h('div', { }, getPercentage2Value(data.value, 0, newGoal.value?.goalScore)),
  ])
}
const rangeRenderBottom: TheRangeRenderFn<string> = (data) => {
  return h('div', { class: 'text-center text-uno-5' }, [
    h('div', { class: 'text-3' }, `${data.value}%`),
  ])
}

function addPoint(value: number) {
  if (!newGoal.value)
    return
  const index = newGoal.value.newRange.findIndex(item => item.value > value)
  newGoal.value.newRange.splice(index, 0, { value, data: randomRewardIcon(), key: Symbol('key') })
}
</script>

<template>
  <div class="h-full flex flex-col gap2vh">
    <a-button type="primary" @click="router.back()">
      <i class="i-solar-alt-arrow-left-bold-duotone ml--2 the-icon" />{{ t('button.back') }}
    </a-button>
    <div class="min-h-0 flex flex-auto flex-col gap2vh overflow-auto px2vw py2vw">
      <div
        v-for="(goal, index) in goals"
        :key="index"
        class="rd-2vw px3vw py1vw shadow"
        :class="`uno-${goal.color}`"
        :style="{
          background: 'rgb(var(--primary-1))',
          boxShadow: `inset 0px 0px 1px 1px rgb(var(--primary-3)), 1px 2px 12px 0px rgb(var(--primary-3)), 0 1px 6px 0px #00000020`,
        }"
      >
        <TheGoalContent :goal="goal" show-delete @delete="handleDelete(goal)" />
      </div>
    </div>
    <a-button type="outline" long @click="handleAdd">
      新增一个目标
    </a-button>
    <a-drawer
      :visible="!!newGoal"
      height="fit-content"
      class="full-drawer"
      :drawer-style="{ maxHeight: '100vh', background: 'transparent' }"
      placement="bottom"
      :header="false"
      :footer="false"
      hide-cancel
      unmount-on-close
    >
      <div
        v-if="newGoal"
        class="max-h-96vh rd-2vw"
        :class="[`uno-${newGoal.color}`]"
        :style="{
          background: 'rgb(var(--primary-1))',
          boxShadow: `inset 0px 0px 1px 1px rgb(var(--primary-3)), 1px 2px 12px 0px rgb(var(--primary-3)), 0 1px 6px 0px #00000020`,
        }"
      >
        <a-form
          ref="formRef"
          :model="newGoal"
          :rules="rules"
          auto-label-width
          :layout="isLargeScreen ? 'horizontal' : 'vertical'"
          @submit="onAdd"
        >
          <div class="max-h-96vh flex flex-col pt-3vh">
            <div class="min-h-0 flex-auto overflow-x-hidden overflow-y-auto px5vw">
              <TheGoalContent :goal="newGoal" class="pb2vh" />
              <a-form-item field="goalName" label="目标名称" hide-asterisk>
                <a-input v-model="newGoal.goalName" placeholder="请输入目标名称" />
              </a-form-item>
              <a-form-item field="goalScore" label="目标总分" hide-asterisk>
                <a-input-number v-model="newGoal.goalScore" placeholder="请输入目标总分" />
              </a-form-item>
              <a-form-item field="oneTimeContent" label="单次记录名称" hide-asterisk>
                <a-input v-model="newGoal.oneTimeContent" placeholder="请输入单次记录名称" />
              </a-form-item>
              <a-form-item field="oneTimeScore" label="单次记录积分" hide-asterisk>
                <a-input-number v-model="newGoal.oneTimeScore" placeholder="请输入单次记录积分" />
              </a-form-item>
              <a-form-item field="timeRange" label="完成期限">
                <a-range-picker
                  v-model="newGoal.timeRange"
                  :disabled-date="(current) => dayjs(current).isBefore(dayjs().startOf('date'))"
                  :allow-clear="false"
                  :trigger-props="{ contentClass: `uno-${newGoal.color}` }"
                  value-format="timestamp"
                >
                  <template #suffix-icon>
                    <div class="i-solar-calendar-bold-duotone op50" />
                  </template>
                </a-range-picker>
              </a-form-item>
              <a-form-item field="newRange" label="阶段奖励">
                <TheRange
                  v-model="newGoal.newRange"
                  class="w-full pb8 pt16"
                  :render-top="rangeRenderTop"
                  :render-bottom="rangeRenderBottom"
                  :max-thumb="6"
                  @add-thumb="addPoint"
                />
              </a-form-item>
              <a-form-item field="color" label="颜色">
                <div class="flex flex-wrap items-center gap-4px">
                  <div
                    v-for="color in colorList"
                    :key="color"
                    class="h6 w6 cursor-pointer rounded-full bg-uno-5 transition-size-300"
                    :class="[`uno-${color}`, { 'w8 h8': color === newGoal.color }]"
                    @click="newGoal!.color = color"
                  />
                </div>
              </a-form-item>
              <a-form-item field="icon" label="图标">
                <div class="flex flex-wrap items-center gap-2px">
                  <div
                    v-for="icon in iconList"
                    :key="icon"
                    class="h6 w6 cursor-pointer text-uno-4 transition-size-300"
                    :class="[icon, { 'w8 h8 text-uno-5': icon === newGoal.icon }]"
                    @click="newGoal!.icon = icon"
                  />
                </div>
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
  </div>
</template>

<style lang="css" scoped>
</style>
