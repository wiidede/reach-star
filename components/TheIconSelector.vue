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
      <div class="flex flex-wrap gap-2px items-center bg-uno-1 m2vw p2vw rd-2 border-uno-5 border-2">
        <div
          v-for="icon in rewardIconList"
          :key="icon"
          class="w6 h6 text-uno-4 transition-size-300 cursor-pointer"
          :class="icon"
          @click="selectIcon(icon)"
        />
      </div>
    </template>
  </a-trigger>
</template>

<style scoped>

</style>
