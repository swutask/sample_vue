<template>
  <div ref="thisRef" v-clickOutside="save" class="relative">
    <div
      class="mb-20"
      :class="{'border-b-3 border-app-color pb-10 ': isCardView}"
    >
      <div class="flex justify-between items-center">
        <input
          ref="inputRef"
          v-model="title"
          class=" text-19 font-bold leading-small bg-transparent outline-none pr-15 h-26 flex-grow"
          type="text"
          @keypress.enter="save"
        >
        <!-- <NewTaskRowColor position="right-10" :color="color" @updateColor="updateColor" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  bookId: number
  isCardView: boolean
}>()

const emit = defineEmits(['close'])

const { createRow } = useTask()

const inputRef = ref(null)
const thisRef = ref(null)

const title = ref('New column')
const color = ref(8947848)

onMounted(() => {
  nextTick(() => {
    if (inputRef.value) {
      thisRef.value.scrollIntoView({ behavior: 'smooth' })
      inputRef.value.focus()
      inputRef.value.setSelectionRange(0, 9999)
    }
  })
})

async function save () {
  if (title.value.trim() !== '') {
    await createRow({
      title: title.value.trim().slice(0, 28),
      color: color.value,
      bookId: props.bookId
    })
  }
  emit('close')
}

// function updateColor (value: number) {
//   color.value = value
// }
</script>
