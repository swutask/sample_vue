<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between">
    <div
      class="flex p-6 rounded-8"
      :class="currentPage === 1 ? 'opacity-80' : 'cursor-pointer hover:bg-selection anim-color'"
      @click="updatePage(currentPage - 1)"
    >
      <i class="icon-keyboard-arrow-down rotate-90 text-brand font-bold" />
    </div>

    <div class="flex items-center  text-2xs">
      <!-- first page -->
      <p v-if="firstMore">
        <span
          class="py-4 mx-2 px-10 rounded-8 hover:bg-selection anim-color cursor-pointer"
          @click="updatePage(1)"
        >1</span>
      </p>
      <!-- first more -->
      <p v-if="firstMore" class="mx-5">...</p>
      <!-- numbers -->
      <p v-for="page in pages" :key="page">
        <span
          class="py-4 mx-2 px-10 rounded-8 hover:bg-selection anim-color cursor-pointer"
          :class="{'font-bold text-brand': +currentPage === +page}"
          @click="updatePage(page)"
        >{{ page }}</span>
      </p>
      <!-- last more -->
      <p v-if="lastMore" class="mx-5">...</p>
      <!-- last page -->
      <p v-if="lastMore">
        <span
          class="py-4 mx-2 px-10 rounded-8 hover:bg-selection anim-color cursor-pointer"
          @click="updatePage(totalPages)"
        >{{ totalPages }}</span>
      </p>
    </div>

    <div
      class="flex p-6 rounded-8"
      :class="currentPage === totalPages ? 'opacity-80' : 'cursor-pointer hover:bg-selection anim-color'"
      @click="updatePage(currentPage + 1)"
    >
      <i class="icon-keyboard-arrow-down -rotate-90 text-brand font-bold" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  itemsPerPage: number
  totalItems: number
}>()

const emit = defineEmits(['updatePage'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const pages = computed(() => {
  if (totalPages.value <= 4) {
    return totalPages.value
  } else if (props.currentPage <= 2) {
    return 3
  } else if (props.currentPage === 3 && totalPages.value === 5) {
    return 5
  } else if (props.currentPage === 3) {
    return 4
  } else if (props.currentPage > totalPages.value - 2) {
    return [totalPages.value - 2, totalPages.value - 1, totalPages.value]
  } else if (props.currentPage > totalPages.value - 3) {
    return [totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value]
  }
  return [props.currentPage - 1, props.currentPage, props.currentPage + 1]
})

const firstMore = computed(() => {
  return !(totalPages.value <= 4 || props.currentPage <= 3)
})

const lastMore = computed(() => {
  return !(totalPages.value <= 4 || props.currentPage > totalPages.value - 3)
})

function updatePage (value) {
  if (value <= 0 || value > totalPages.value) return

  emit('updatePage', value)
}
</script>
