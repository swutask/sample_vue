<template>
  <div class="text-app-color flex items-center justify-between w-full cursor-pointer select-none">
    <div
      class="flex items-center rounded-7 w-[90px] h-23 text-11 px-5 mr-10 border-3 border-transparent"
      :style="tagColor(tag.color)"
      :class="{ 'tag-border': isSelected }"
      @click="toggleTag"
    >
      <p v-if="!isEdit" class="flex items-center justify-center h-full w-full text-12 truncate tracking-small">
        {{ tag.name }}
      </p>
      <div v-else class="flex items-center" @click.stop>
        <input
          ref="inputRef"
          v-model="name"
          class="w-full rounded text-12 bg-transparent outline-none text-center"
          maxlength="10"
          type="text"
          @blur="onBlur"
          @keypress.enter="onBlur"
        >
      </div>
    </div>
    <ButtonModule
      :has-hover="true"
      prefix="icon-edit text-15"
      class="top-0 bottom-0 right-0 p-0"
      @click="toggleEditMode"
    />
  </div>
</template>

<script setup lang="ts">
import { tagColor } from '@/plugins/filters'

const props = defineProps<{
  tag: ITag
  isSelected: boolean
}>()

const emit = defineEmits(['toggleTag', 'updateTag'])

const inputRef = ref(null)

const name = ref(props.tag.name || '')
const tempName = ref(props.tag.name || '')
const isEdit = ref(false)

function toggleEditMode () {
  isEdit.value = !isEdit.value
  nextTick(() => {
    inputRef.value.focus()
  })
}

function edit () {
  if (tempName.value.trim() !== name.value.trim()) {
    tempName.value = name.value
    emit('updateTag', { name: name.value, id: props.tag.id, bookId: props.tag.bookId })

    if (props.isSelected) {
      const tag = { ...props.tag, name: name.value }
      emit('toggleTag', {
        tag,
        isUpdate: true,
        isSelected: true
      })
    }
  }
}

function onBlur () {
  isEdit.value = false
  edit()
}

function toggleTag () {
  emit('toggleTag', {
    tag: props.tag,
    isSelected: props.isSelected
  })
}
</script>

<style>
.tag-border {
  border: 2px solid rgba(0,0,0,0.3) !important;
}
</style>
