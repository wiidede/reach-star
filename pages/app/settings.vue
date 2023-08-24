<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div class="flex flex-col gap-2vh text-5">
    <a-button type="primary" @click="router.back()">
      <i class="i-solar-alt-arrow-left-bold-duotone ml--2 the-icon" />返回
    </a-button>
    <div class="w-fit">
      <NuxtLink to="/app/goals">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-star-angle-bold-duotone cursor-pointer text-8 text-lime the-icon-primary" />
          <div>目标列表</div>
        </div>
      </NuxtLink>
    </div>
    <div class="w-fit">
      <NuxtLink to="/app/about">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-heart-angle-bold-duotone cursor-pointer text-8 text-rose-400 the-icon-primary" />
          <div>关于✨ reach-star</div>
        </div>
      </NuxtLink>
    </div>
    <div class="w-fit">
      <NuxtLink to="/app/data">
        <div class="flex items-center gap-1vw">
          <div class="i-solar-database-bold-duotone cursor-pointer text-8 text-blue-500 the-icon-primary" />
          <div>数据管理</div>
        </div>
      </NuxtLink>
    </div>
    <div class="h-4" />
  </div>
</template>

<style lang="css" scoped>

</style>
