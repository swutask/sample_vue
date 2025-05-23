<template>
  <div class="px-25">
    <p class="text-left my-10 text-dark-1000 font-semibold" :class="textColor">or invite with a link</p>

    <div class="flex items-center justify-between w-full bg-grey-150 rounded-10 overflow-hidden">
      <p
        class="w-full text-13 rounded-l-10 h-35 px-10 outline-none dark:text-grey-light
         text-grey-1200 max-w-[70%] truncate flex items-center"
      >
        {{ inviteLink }}
      </p>

      <div
        class="justify-center flex items-center w-[130px]
            flex-shrink-0 px-10 h-35 cursor-pointer text-white bg-black
            hover:opacity-80 transition-all duration-50 text-12 font-medium"
        @click="copyLink"
      >
        {{ btnText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { copy } from '@/core/helper-functions'

const props = withDefaults(defineProps<{
  link: string
  fontSize?: string
  textColor?: string
  withCircle?: boolean
}>(), {
  fontSize: 'text-15',
  textColor: 'text-app-color',
  withCircle: true
})

const btnText = ref('Copy invite link')

const inviteLink = computed(() => `complex.so/team/${props.link}`)

function copyLink () {
  copy(inviteLink.value, () => {
    btnText.value = 'Copied'

    setTimeout(() => {
      btnText.value = 'Copy invite link'
    }, 5000)
  })
}
</script>
