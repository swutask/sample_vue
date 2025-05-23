<template>
  <div class="flex justify-end text-13 text-app-color relative">
    <DropdownModule
      ref="dropdownRef"
      v-clickOutside="clickOutside"
      :width="isClient && !books.length ? 0 : 250"
      :button-classes="`py-7 px-10 ${isEdit ? '' : 'cursor-grab'}`"
      isTeleported
      positionMenu="left"
      positionDirection="left"
      background="bg-primary dark:bg-grey-110"
      :disabled="!isEdit"
      :class="isEdit ? '' : 'opacity-50'"
      :iconHasHover="isEdit"
      :custom-classes="!isEdit && !weekPlanner ? 'p-5' : null"
      zIndex="z-[9999]"
    >
      <template #button="{isOpen}">
        <slot :isOpen="isOpen">
          <div
            class="group flex cursor-pointer"
            :class="[customButtonClasses]"
            @click="isBookSelectOpened = !isBookSelectOpened"
          >
            <!-- TODO: check bg-grey-light-hover -->
            <BookLabel
              v-if="selectedBook"
              background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
              class="truncate cursor-pointer"
              :class="labelFontSize"
              :bookId="selectedBook.id"
              :customStyle="customStyleForBookLabel"
              :showTooltip="weekPlanner"
              :showTitle="!weekPlanner"
              :hasBorder="false"
              :size="weekPlanner ? 'w-18 h-18' : `w-21 h-21 ${marginIcon}`"
            />
          </div>
        </slot>
      </template>

      <div class="max-h-[300px] overflow-y-auto">
        <p
          v-if="moveTask"
          class="group-scope last:rounded-b-10 flex text-app-color py-11 px-15 text-13 w-full
            font-semibold leading-[1.6]"
        >
          Move task to...
        </p>

        <div
          v-for="(book, idx) in computedOptions.filter(b => !b.archivedAt)"
          :key="book?.id || idx"
          class="hover:bg-selection group-scope last:rounded-b-10 border-grey-500
                 first:rounded-t-10 text-app-color py-2 px-10 cursor-pointer border-b last:border-0"
          @click.stop="toggleBook(book)"
        >
          <BookLabel
            background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
            class="truncate cursor-pointer"
            :class="[labelFontSize, {'font-bold': book.id === selectedBook?.id || selectedBook === null}]"
            :bookId="book.id"
            :customStyle="{
              fontSize: 'text-13',
              defaultIcon: 'w-2/3 h-2/3',
              iconHover: 'bg-transparent'
            }"
            :hasBorder="false"
            :size="`w-30 h-30 ${marginIcon}`"
          />
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  selectedBook: IBook
  books: IBook[]
  isEdit?: boolean
  customButtonClasses?: string
  labelFontSize?: string
  customStyleForBookLabel?: {
    fontSize?: string
    icon?: string
    defaultIcon?: string
    iconHover?: string
  }
  moveTask?: boolean
  weekPlanner?: boolean
  marginIcon?: string
}>(), {
  isEdit: true,
  labelFontSize: 'text-13 py-5',
  customButtonClasses: 'rounded-10 px-13 max-w-[140px] hover:bg-menu-hover border border-grey-580 h-31',
  customStyleForBookLabel: () => ({
    fontSize: 'text-14 font-medium',
    icon: 'max-h-2/3 max-w-2/3',
    defaultIcon: 'w-2/3 h-2/3',
    iconHover: 'bg-primary'
  }),
  marginIcon: 'mr-8'
})

const emits = defineEmits(['showDropdown', 'toggleBook', 'updateTag'])

const { isClient } = useProfile()

const dropdownRef = ref(null)

const isBookSelectOpened = ref(false)

const computedOptions = computed(() => {
  const options = props.books
  return options.sort((a, b) => a.title.localeCompare(b.title))
})

function toggleBook (book) {
  dropdownRef.value.close()
  emits('toggleBook', book)
}

function clickOutside () {
  isBookSelectOpened.value = false
  dropdownRef.value.close()
}
</script>
