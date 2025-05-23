<template>
  <div class="h-full w-full overflow-y-auto text-app-color">
    <div class="max-w-[320px] mx-auto md:mx-0 md:max-w-full md:pl-[100px] py-31 text-app-color">
      <div class="flex items-center md:hidden" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <p class="text-30 md:text-21 font-bold">Keyboard shortcuts</p>

      <div class="mt-30">
        <p class="font-bold">General</p>
        <div class="md:flex text-14 w-full">
          <div class="max-w-[440px] w-full md:pr-50 md:pb-20">
            <div v-for="item in keyboardShortcutsGeneral" :key="item.name" class="flex justify-between my-10">
              <p class="text-dark-500 whitespace-nowrap mr-10">{{ item.name }}</p>

              <div v-if="!item?.key" class="flex items-center">
                <span class="keyboard-shortcut mr-4">{{ item.key1 }}</span>
                <span class="keyboard-shortcut">{{ item.key2 }}</span>
              </div>

              <div v-else class="flex items-center">
                <span class="keyboard-shortcut">{{ item.key }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-30">
        <p class="font-bold">Editor</p>
        <div class="md:flex text-14 w-full">
          <div class="max-w-[440px] w-full md:pr-50 md:pb-20">
            <div v-for="item in keyboardShortcutsPages" :key="item.name" class="flex justify-between my-10">
              <p class="text-dark-500 whitespace-nowrap mr-10">{{ item.name }}</p>
              <div class="flex items-center">
                <span class="keyboard-shortcut">{{ item.key }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['back'])

const keyboardShortcutsGeneral = [
  { name: 'Mentions & linking', key: '@' },
  { name: 'Close modal', key: 'Esc' },
  { name: 'Create a task', key1: 'Alt', key2: 'C' },
  // { name: 'Open recently viewed note', key1: 'Alt', key2: 'X' },
  { name: 'Keyboard Shortcuts Cheat Sheet', key1: 'Alt', key2: '0' },
  { name: 'Search / Jump-to', key1: 'Ctrl', key2: 'K' }
]

const keyboardShortcutsPages = [
  { name: 'Create checkbox', key: '[]' },
  { name: 'Emoticon', key: ':' },
  { name: 'Blockquote', key: '>' },
  { name: 'Divider', key: '---' },
  { name: 'H1', key: '#' },
  { name: 'H2', key: '##' },
  { name: 'H3', key: '###' }
]

const back = () => {
  emits('back')
}
</script>
<style lang="scss" scoped>
.keyboard-shortcut {
  @apply text-12 font-normal text-dark-500 border border-grey-675
    md:shadow-keyboard-shortcut rounded-4 p-1 px-5 min-w-[22px] text-center
}
</style>
