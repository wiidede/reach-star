<script lang="ts" setup>
import type { FieldRule, FormInstance } from '@arco-design/web-vue'
import type { TheFeedbackContent } from '~/types'

const { t } = useI18n()
const router = useRouter()
const { store, defaultStore } = useStarStore()

const feedback = ref<TheFeedbackContent>()

const form = ref({
  data: '',
})

const rules: Partial<Record<keyof typeof form.value, FieldRule | FieldRule[]>> = {
  data: [{ required: true, message: t('data.ruleData') }],
}

const onSubmit: FormInstance['$props']['onSubmit'] = function ({ errors }) {
  if (errors)
    return
  try {
    store.value = JSON.parse(form.value.data)
  }
  catch {
    feedback.value = { content: t('data.tipFormatError'), type: 'error' }
    return
  }
  feedback.value = { content: t('data.importSuccess'), type: 'success' }
}

async function exportData() {
  const dataStr = JSON.stringify(store.value)
  form.value.data = dataStr
  await navigator.clipboard.writeText(dataStr)
  feedback.value = { content: t('data.copySuccess'), type: 'success' }
}

function onResetData() {
  store.value = defaultStore
  feedback.value = { content: t('data.clearSuccess'), type: 'success' }
}
</script>

<template>
  <div class="flex flex-col gap-5vh">
    <div class="flex items-center">
      <a-button type="primary" @click="router.back()">
        <i class="i-solar-alt-arrow-left-bold-duotone ml--2 the-icon" />{{ t('button.back') }}
      </a-button>
      <div class="i-solar-database-bold-duotone ml4 mr1 the-icon text-8 text-blue-500" />
      <span class="text-xl">{{ t('nav.dataManage') }}</span>
    </div>
    <a-form :model="form" :rules="rules" auto-label-width @submit="onSubmit">
      <a-form-item>
        <div class="flex flex-wrap gap2vw">
          <a-button type="primary" @click="exportData">
            <template #icon>
              <div class="i-solar-export-bold-duotone" />
            </template>
            {{ t('data.export') }}
          </a-button>
          <a-button type="primary" html-type="submit">
            <template #icon>
              <div class="i-solar-import-bold-duotone" />
            </template>
            {{ t('data.import') }}
          </a-button>
          <a-popconfirm
            position="top"
            content-class="uno-red"
            :ok-text="t('data.clearConfirm')"
            @ok="onResetData"
          >
            <template #icon>
              <div class="i-solar-info-circle-bold-duotone text-red-5" />
            </template>
            <template #content>
              <span class="text-5">{{ t('data.clearTip') }}</span>
            </template>
            <a-button type="primary" class="uno-red">
              <template #icon>
                <div class="i-solar-trash-bin-minimalistic-bold-duotone" />
              </template>
              {{ t('data.clear') }}
            </a-button>
          </a-popconfirm>
        </div>
      </a-form-item>
      <TheFeedback :data="feedback" />
      <a-form-item field="data" label="" hide-asterisk>
        <a-textarea v-model="form.data" :placeholder="`${t('input')}${t('data.label')}`" :auto-size="{ minRows: 3, maxRows: 10 }" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style  scoped>

</style>

<route lang="yaml">
meta:
  layout: full
</route>
