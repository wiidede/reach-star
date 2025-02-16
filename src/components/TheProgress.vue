<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value: number
  max: number
  color?: string
  label: string
  tip?: string
  width?: string
  truncateLabel?: boolean
}>(), {
  value: 0,
  max: 100,
  color: 'sky',
  label: '',
  tip: '',
  width: '4rem',
  truncateLabel: true,
})

const progress = computed(() => {
  return Math.min(Math.max(props.value / props.max * 100, 0), 100)
})
</script>

<template>
  <div class="h-full flex flex-col items-center gap-1vw" :class="[`uno-${color}`]">
    <div class="the-progress-label top text-3 text-uno-8">
      {{ tip || `${displayNumber(value)} / ${displayNumber(max)}` }}
    </div>
    <div
      class="the-progress-track min-h-0 w-full flex flex-auto flex-col-reverse overflow-hidden rd-full bg-uno-1"
      :style="{ width: `${width}`, boxShadow: `inset 0px 0px 0px 2px rgb(var(--primary-4))` }"
    >
      <div
        class="the-progress-thumb rd-full bg-uno-4"
        :style="{ height: `${progress}%`, boxShadow: `1px 2px 12px 0px rgb(var(--primary-2)), 0 1px 6px 0px #00000020` }"
      />
    </div>
    <div
      v-if="label"
      :style="{ width: `${width}` }"
      :title="label"
      class="the-progress-label bottom text-center text-3.5 text-uno-8"
      :class="{ truncate: truncateLabel }"
    >
      {{ label }}
    </div>
  </div>
</template>

<style  scoped>

</style>
