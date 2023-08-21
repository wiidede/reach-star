<script lang="ts" setup>
definePageMeta({ layout: 'full' })

const router = useRouter()
</script>

<template>
  <div class="flex flex-col gap-2vh text-5">
    <a-button type="primary" @click="router.back()">
      <i class="i-solar-alt-arrow-left-bold-duotone the-icon ml--2" />返回
    </a-button>
    <div class="w-fit">
      <router-link to="/goals">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-star-angle-bold-duotone the-icon-primary cursor-pointer text-8 text-lime" />
          <div>目标列表</div>
        </div>
      </router-link>
    </div>
    <div class="w-fit">
      <router-link to="/about">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-heart-angle-bold-duotone the-icon-primary cursor-pointer text-8 text-rose-400" />
          <div>关于✨ reach-star</div>
        </div>
      </router-link>
    </div>
    <div class="w-fit">
      <router-link to="/data">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-database-bold-duotone the-icon-primary cursor-pointer text-8 text-blue-500" />
          <div>数据管理</div>
        </div>
      </router-link>
    </div>
    <div class="h-4" />
  </div>
</template>

<style lang="css" scoped>

</style>
