<script lang="ts" setup>
import type { FieldRule, FormInstance } from '@arco-design/web-vue'
import type { TheFeedbackContent } from '~/types/common'

const router = useRouter()
const { store, defaultStore } = useStarStore()

const feedback = ref<TheFeedbackContent>()

const form = ref({
  data: '',
})

const rules: Partial<Record<keyof typeof form.value, FieldRule | FieldRule[]>> = {
  data: [{ required: true, message: '请输入正确的数据格式' }],
}

const onSubmit: FormInstance['$props']['onSubmit'] = function ({ errors }) {
  if (errors)
    return
  try {
    store.value = JSON.parse(form.value.data)
  }
  catch {
    feedback.value = { content: '数据格式错误～', type: 'error' }
    return
  }
  feedback.value = { content: '导入数据成功～', type: 'success' }
}

async function exportData() {
  const dataStr = JSON.stringify(store.value)
  form.value.data = dataStr
  await navigator.clipboard.writeText(dataStr)
  feedback.value = { content: '已复制到剪贴板～', type: 'success' }
}

function onResetData() {
  store.value = defaultStore
  feedback.value = { content: '已清空所有数据～', type: 'success' }
}
</script>

<template>
  <div class="flex flex-col gap-5vh">
    <a-button type="primary" @click="router.back()">
      <i class="i-solar-alt-arrow-left-bold-duotone the-icon ml--2" />返回
    </a-button>
    <a-form :model="form" :rules="rules" auto-label-width @submit="onSubmit">
      <a-form-item>
        <div class="flex flex-wrap gap2vw">
          <a-button type="primary" @click="exportData">
            <template #icon>
              <div class="i-solar-export-bold-duotone" />
            </template>
            导出数据
          </a-button>
          <a-button type="primary" html-type="submit">
            <template #icon>
              <div class="i-solar-import-bold-duotone" />
            </template>
            导入数据
          </a-button>
          <a-popconfirm
            position="top"
            content-class="uno-red"
            ok-text="清空"
            @ok="onResetData"
          >
            <template #icon>
              <div class="i-solar-info-circle-bold-duotone text-red-5" />
            </template>
            <template #content>
              <span class="text-5">你确定要清空应用<b>所有</b>的数据吗？</span>
            </template>
            <a-button type="primary" class="uno-red">
              <template #icon>
                <div class="i-solar-trash-bin-minimalistic-bold-duotone" />
              </template>
              清空数据
            </a-button>
          </a-popconfirm>
        </div>
      </a-form-item>
      <TheFeedback :data="feedback" />
      <a-form-item field="data" label="" hide-asterisk>
        <a-textarea v-model="form.data" placeholder="请输入数据" :auto-size="{ minRows: 3, maxRows: 10 }" />
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