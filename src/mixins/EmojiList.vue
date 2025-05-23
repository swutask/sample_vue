<template>
  <div class="tippy-box bg-primary">
    <template v-if="items.length">
      <div
        v-for="(item, index) in items"
        :key="item.name"
        :ref="el => emojiRefs[index] = el"
        class="px-20 py-10 cursor-pointer last:mb-0 no-scroll-bar first:rounded-t-4 last:rounded-b-4 hover:bg-selection text-grey-main"
        :class="[{'bg-selection': selectedIndex === index}]"
        @click.stop="selectItem(index)"
      >
        {{ item.char }} <span class="ml-5">:{{ item.name }}:</span>
      </div>
    </template>

    <div v-else class="p-5">
      No result
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: IEmoji[]
  command: (args) => void
  editor: any
}>()

const selectedIndex = ref(0)
const emojiRefs = ref([])

onBeforeUpdate(() => {
  emojiRefs.value = []
})

watch(() => props.items, () => {
  selectedIndex.value = 0
})

function onKeyDown ({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

function upHandler () {
  selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
  emojiRefs.value[selectedIndex.value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function downHandler () {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
  emojiRefs.value[selectedIndex.value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function enterHandler () {
  selectItem(selectedIndex.value)
}

function selectItem (index: number) {
  const item = props.items[index]

  if (item) {
    props.command({ data: item.char })

    if (props.editor) props.editor.chain().focus().run()
  }
}

defineExpose({
  onKeyDown
})
</script>
