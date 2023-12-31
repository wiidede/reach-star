<script lang="ts" setup>
import { theRangeContainerRefKey, theRangeTrackRefKey } from './TheRange'
import type { TheRangeData, TheRangeRenderFn } from '~/types/common'

const props = defineProps<{
  position: number
  data: TheRangeData<unknown>
  active?: boolean
  disabled?: boolean
  renderTop?: TheRangeRenderFn<unknown>
  renderBottom?: TheRangeRenderFn<unknown>
}>()

const emits = defineEmits<{
  (e: 'update', percent: number): void
  (e: 'delete'): void
  (e: 'deleting'): void
  (e: 'cancelDelete'): void
  (e: 'moveDone'): void
}>()

const thumbRef = ref<HTMLElement>()
const trackRef = inject(theRangeTrackRefKey)
const containerRef = inject(theRangeContainerRefKey)

const deleting = ref(false)

function onPointerMove(e: PointerEvent) {
  if (!thumbRef.value || !trackRef?.value || !containerRef?.value)
    return
  const trackRect = trackRef.value.getBoundingClientRect()
  const offset = e.clientX - trackRect.left
  const percent = offset / trackRect.width * 100
  if (percent < 0)
    emits('update', 0)
  else if (percent > 100)
    emits('update', 100)
  else if (!Number.isNaN(percent))
    emits('update', percent)
  const containerRect = containerRef.value.getBoundingClientRect()
  if (e.clientY - containerRect.top < 0 || e.clientY - containerRect.bottom > 0)
    deleting.value = true
  else
    deleting.value = false
}

async function onPointerUp(e: PointerEvent) {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  if (!containerRef?.value)
    return
  const containerRect = containerRef.value.getBoundingClientRect()
  if (e.clientY - containerRect.top < 0 || e.clientY - containerRect.bottom > 0) {
    deleting.value = false
    emits('delete')
  }
  await nextTick()
  emits('moveDone')
}

function onPointerDown(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (props.disabled)
    return
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}
</script>

<template>
  <div
    ref="thumbRef"
    class="the-range-thumb absolute w3 cursor-move rd-full bg-white"
    :class="{ 'z-1 thumb-active': active, 'op-20': deleting && active, 'cursor-not-allowed': disabled }"
    :style="{ left: `${position}%` }"
    @pointerdown="onPointerDown"
    @mousedown.prevent="() => {}"
    @touchstart.prevent="() => {}"
  >
    <div class="the-range-thumb-top absolute">
      <TheRender :render="() => renderTop?.(data)" />
    </div>
    <div class="the-range-thumb-bottom absolute">
      <TheRender :render="() => renderBottom?.(data)" />
    </div>
  </div>
</template>

<style scoped>
.the-range-thumb {
  transform: translateX(-50%);
  transform-origin: center;
  border-color: rgb(var(--primary-5));
  border-width: 0.1rem;
  top: -0.3rem;
  bottom: -0.3rem;
  transition: opacity 150ms ease-in-out, filter 150ms ease-in-out;
}

.thumb-active {
  border-color: rgb(var(--primary-5));
  background: rgb(var(--primary-2));
  filter: drop-shadow(0.1rem 0.15rem 0.25rem rgb(var(--primary-5)));
}

.the-range-thumb-top  {
  left: 50%;
  top: 0;
  transform: translate(-50%, -110%);
}

.the-range-thumb-bottom {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 110%);
}
</style>
