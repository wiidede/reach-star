<script lang="ts" setup>
const navs = [
  {
    name: 'reach-star',
    to: '/app',
    icon: 'i-solar-star-bold-duotone',
    color: 'yellow',
  },
  {
    name: '日历',
    to: '/app/calendar',
    icon: 'i-solar-calendar-minimalistic-bold-duotone',
    color: 'lime',
  },
  {
    name: '图表',
    to: '/app/chart',
    icon: 'i-solar-chart-bold-duotone',
    color: 'teal',
  },
  {
    name: '包裹',
    to: '/app/bag',
    icon: 'i-solar-bag-smile-bold-duotone',
    color: 'purple',
  },
]
</script>

<template>
  <nav class="flex items-center justify-around gap-2vw p1vw md:flex-col">
    <div v-for="(nav, index) in navs" :key="index" class="w-max">
      <router-link :to="nav.to">
        <div class="flex flex-col items-center gap-1" :class="`uno-${nav.color}`">
          <div class="the-icon-primary text-uno-4 transition-size-300 cursor-pointer text-8" :class="[nav.icon]" />
          <div class="text-uno-8 transition-size-300 text-3">
            {{ nav.name }}
          </div>
        </div>
      </router-link>
    </div>
  </nav>
</template>
