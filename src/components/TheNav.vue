<script lang="ts" setup>
const { t } = useI18n()

const navs = ref([
  {
    name: t('nav.home'),
    to: '/',
    icon: 'i-solar-star-bold-duotone',
    color: 'yellow',
  },
  {
    name: t('nav.calendar'),
    to: '/calendar',
    icon: 'i-solar-calendar-minimalistic-bold-duotone',
    color: 'lime',
  },
  {
    name: t('nav.goals'),
    to: '/chart',
    icon: 'i-solar-chart-bold-duotone',
    color: 'teal',
  },
  {
    name: t('nav.achievement'),
    to: '/bag',
    icon: 'i-solar-medal-ribbon-bold-duotone',
    color: 'purple',
  },
])
</script>

<template>
  <nav class="flex items-center justify-around gap-2vw p1vw md:flex-col">
    <div v-for="(nav, index) in navs" :key="index" class="w-max">
      <RouterLink :to="nav.to">
        <div class="flex flex-col items-center gap-1" :class="`uno-${nav.color}`">
          <div class="cursor-pointer text-8 text-uno-4 transition-size-300 the-icon-primary" :class="[nav.icon]" />
          <div class="text-3 text-uno-8 transition-size-300">
            {{ nav.name }}
          </div>
        </div>
      </RouterLink>
    </div>
  </nav>
</template>
