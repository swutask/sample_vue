<template>
  <div>
    <ButtonModule
      text="Today"
      :class="{ '!hidden': isToday }"
      class="mx-10 text-link-color items-center anim-opacity hidden lg:flex
            bg-brand-new rounded-full text-white text-10 px-6 py-2 font-medium ml-5 "
      @click="$emit('toToday')"
    />

    <div class="flex items-center gap-x-10 lg:gap-x-0">
      <ButtonModule
        prefix="icon-left-single-arrow text-16"
        class="p-12 lg:p-5 hover:text-app-color anim-color text-app-color lg:text-grey-300 bg-menu-hover lg:bg-transparent
            lg:hover:bg-menu-hover rounded-6"
        tooltipText="Previous week"
        teleportTooltip
        tooltipBottom
        tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
        @click="$emit('weekChange', {week: true, direction: -1})"
      />
    </div>

    <p class="md:text-14 text-16 mx-8">
      <span class="font-semibold mr-5 text-app-color">{{ weekDate.month }}</span>
      <span class="text-dark-1100">week {{ weekDate.week }}</span>
    </p>

    <div class="flex items-center gap-x-10 lg:gap-x-0">
      <ButtonModule
        prefix="icon-right-single-arrow text-16"
        class="p-12 lg:p-5 hover:text-app-color anim-color text-app-color lg:text-grey-300 bg-menu-hover lg:bg-transparent
           lg:hover:bg-menu-hover rounded-6"
        tooltipText="Next week"
        teleportTooltip
        tooltipBottom
        tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
        @click="$emit('weekChange')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

const props = defineProps<{
  isToday: boolean
  currentDate: string
}>()

defineEmits(['toToday', 'weekChange'])

const weekDate = computed(() => ({
  month: dayjs(props.currentDate).format('MMMM'),
  week: dayjs(props.currentDate).week()
}))
</script>
