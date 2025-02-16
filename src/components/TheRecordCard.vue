<script lang="ts" setup>
import type { Rcd } from '~/types'

defineProps<{
  record: Rcd
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center gap4 rd-2vw px3vw py1vw shadow"
    :class="`uno-${record.color}`"
    :style="{
      background: 'rgb(var(--primary-1))',
      boxShadow: `inset 0px 0px 1px 1px rgb(var(--primary-2)), 1px 2px 12px 0px rgb(var(--primary-2)), 0 1px 6px 0px #00000020`,
    }"
  >
    <div class="text-8 font-bold text-uno-5">
      <div :class="record.icon" />
    </div>
    <div class="point-number text-8 font-bold text-uno-5">
      +{{ displayNumber(record.point) }}
    </div>
    <div class="min-w-0 flex-auto">
      <div class="line-warp text-6 text-uno-7">
        {{ record.content }}
      </div>
      <div v-if="record.remark" class="text-4 text-uno-6">
        {{ record.remark }}
      </div>
      <div class="text-3 text-uno-5">
        {{ dayjs(record.time).format(t('time.datetime')) }}
      </div>
    </div>
  </div>
</template>

<style  scoped>

</style>
