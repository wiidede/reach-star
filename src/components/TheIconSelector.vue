<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | undefined
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

const { rewardIconList } = useIcons()
const visible = ref(false)

function selectIcon(icon: string) {
  model.value = icon
  visible.value = false
}
</script>

<template>
  <a-trigger
    v-model:popup-visible="visible"
    trigger="click"
    :unmount-on-close="false"
  >
    <div>
      <slot />
    </div>
    <template #content>
      <div class="m2vw flex flex-wrap items-center gap-2px border-2 rd-2 p2vw bg-uno-1 border-uno-5">
        <div
          v-for="icon in rewardIconList"
          :key="icon"
          class="h6 w6 cursor-pointer text-uno-4 transition-size-300"
          :class="icon"
          @click="selectIcon(icon)"
        />
      </div>
    </template>
  </a-trigger>
</template>

<style scoped>

</style>
