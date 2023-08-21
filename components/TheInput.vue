<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    id="input"
    v-model="value"
    type="text"
    v-bind="$attrs"
    p="x-4 y-2"
    w="full"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
</template>
