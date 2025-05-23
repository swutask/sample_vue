<template>
  <div class="flex items-center">
    <i :class="note?.icon" class="text-16 mr-10" />

    <p v-if="!note.title.firstPartTitle" class="text-13 truncate font-normal">{{ note?.title }}</p>
    <div v-else class="text-13 truncate font-normal flex">
      <p>{{ note.title.firstPartTitle }}</p>

      <p class="mx-3">→</p>

      <p class="font-semibold truncate">{{ note.title.secondPartTitle }}</p>
    </div>

    <div class="flex items-center ml-auto">
      <ButtonModule
        :prefix="`${note.isFavorite ?
          'text-dark-100 icon-star text-19 p-1' :
          'icon-star-empty text-grey-d5d5d5 text-16 flex items-center justify-center p-3'}`"
        class="flex items-center justify-center cursor-pointer select-none
                   hover:bg-menu-hover rounded-8"
        :class="note.isFavorite ? '' : '!opacity-0 group-hover:!opacity-100'"
        tooltipText="Favorite"
        teleportTooltip
        tooltipTop
        @click.stop="$emit('toggleFavorite', note)"
      />

      <i
        :class="showArrow ? 'flex' : 'hidden'"
        class="icon-arrow-up ml-4 transform rotate-180 text-12 group-hover:flex"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  note: IRecentNote & { title: {firstPartTitle: string; secondPartTitle: string} }
  showArrow?: boolean
}>()

defineEmits(['toggleFavorite'])
</script>
