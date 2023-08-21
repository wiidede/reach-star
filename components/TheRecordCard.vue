<script lang="ts" setup>
import type { Rcd } from '~/types/common'

defineProps<{
  record: Rcd
}>()
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
    <div class="text-uno-5 text-8 font-bold">
      <div :class="record.icon" />
    </div>
    <div class="point-number text-uno-5 text-8 font-bold">
      +{{ displayNumber(record.point) }}
    </div>
    <div class="min-w-0 flex-auto">
      <div class="text-uno-7 line-warp text-6">
        {{ record.content }}
      </div>
      <div v-if="record.remark" class="text-uno-6 text-4">
        {{ record.remark }}
      </div>
      <div class="text-uno-5 text-3">
        {{ dayjs(record.time).format('YYYY-MM-DD HH:mm') }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
