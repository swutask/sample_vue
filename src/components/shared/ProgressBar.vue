<template>
  <div class="w-full">
    <div class="rounded-b-8 bg-dark-500 w-full h-7" />
    <transition appear @beforeAppear="beforeEnter" @afterAppear="enter">
      <div class="transition-width bg-basic rounded-bl-8 h-5 w-0 mt-[-7px]" />
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  timeout?: number
}>()

const { notificationDefaultTimeout } = useGeneral()

function beforeEnter (el: HTMLElement) {
  el.style.width = '0'
}

const preparedTimeout = computed(() => (props.timeout || notificationDefaultTimeout.value) / 1000)

function enter (el: HTMLElement) {
  el.style.width = '100%'
  el.style.transition = `width ${preparedTimeout.value - 0.5}s linear`

  setTimeout(() => el.classList.add('rounded-br-8'), (preparedTimeout.value - 0.6) * 1000)
}
</script>
