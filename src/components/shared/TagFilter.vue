<template>
  <div v-clickOutside="close" class="relative">
    <div
      class="flex items-center text-13 cursor-pointer select-none"
      @click="showDropdown"
    >
      <slot :isOpen="show">
        <ButtonModule
          class="opacity-100 ease-in-out transition-transform p-8 rounded-4 flex justify-between group h-[34.25px]"
          :class="[classes, btnWidth]"
          :tooltipText="hideTooltip ? '' : 'Labels'"
          :teleport-tooltip="isTooltipBottom"
          :tooltip-bottom="isTooltipBottom"
          :tooltip-position="!isTooltipBottom ? 'bottom-37 left-1/2 -translate-x-1/2 z-20' : ''"
          borderWidth="border"
        >
          <div v-if="modelValue?.filters?.tagsFilter?.length && (route.name === 'TaskBoardTeam' || route.name === 'Today')" class="flex">
            <div
              v-for="tag in modelValue?.filters?.tagsFilter"
              :key="tag.id"
              :style="tagColor(tag.color)"
              class="rounded-full w-14 h-14 mr-2"
            />
            <div v-if="modelValue?.filters?.tagsFilter.length > 4" class="text-11">+{{ modelValue?.filters?.tagsFilter.length - 4 }}</div>
          </div>

          <div v-else class="flex items-center text-grey-250">
            Add filter
          </div>

          <div class="flex items-center">
            <i
              v-if="modelValue?.filters?.tagsFilter?.length"
              class="icon-close-smooth hidden cursor-pointer group-hover:block cross-class"
              @click.stop="toggleTag(null)"
            />
            <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': show }" />
          </div>
        </ButtonModule>
      </slot>
    </div>

    <InfoDropdown
      v-if="show"
      :title="showDropDownTitle ? 'Filter labels' : ''"
      classes="right-0 top-30 w-[242px] rounded-10 !pt-10 max-h-[395px] overflow-auto"
      title-classes="text-15 font-semibold text-app-color px-16 mb-6"
    >
      <div v-if="!hasTags" class="px-16 pb-10 text-13">No labels used</div>
      <div>
        <div v-for="(key, value) in tags" :key="value">
          <p
            v-if="key.length > 0 && (value === 'calendar' || +value === -1) && !hideBookTitle"
            class="px-12 truncate font-medium text-12 mb-3"
          >
            {{ +value === -1 ? 'Workspace' : 'Just me' }}
          </p>
          <p v-if="key.length > 0 && !hideBookTitle" class="px-12 truncate font-medium text-12 mb-3">{{ bookTitle(value) }}</p>

          <div v-if="key.length > 0" class="px-16 flex flex-wrap justify-between overflow-y-auto">
            <div v-for="tag in key" :key="tag.id" class="mb-10 flex items-center w-[67px] px-1 cursor-pointer tracking-small">
              <div
                class="flex items-center rounded-full w-full h-23 px-5 border-3 border-transparent "
                :style="tagColor(tag.color)"
                :class="{ 'tag-border': isSelected(tag) }"
                @click="toggleTag(tag)"
              >
                <div v-if="!!tag.name" class="w-full h-full text-11 font-medium flex items-center justify-center">
                  <p class="truncate">{{ tag.name }}</p>
                </div>
              </div>
            </div>
            <div class="w-[70px]" />
          </div>
        </div>
      </div>
    </InfoDropdown>
  </div>
</template>

<script setup lang="ts">
import { tagColor } from '@/plugins/filters'
import cloneDeep from 'lodash/cloneDeep'

const props = withDefaults(defineProps<{
  tags: TIndexedObject<ITag[]>
  hideBookTitle?: boolean
  isTooltipBottom?: boolean
  showDropDownTitle?: boolean
  hideTooltip?: boolean
  btnWidth?: string
  modelValue?: {
    filters: IFilters
    doRequest: boolean
  }
}>(), {
  hideTooltip: false,
  isTooltipBottom: false,
  showDropDownTitle: true
})

const emit = defineEmits(['showDropdown', 'update:modelValue'])

const route = useRoute()

const { books } = useBook()

const show = ref(false)

const hasTags = computed(() => {
  return Object.values(props.tags).length > 0 && Object.values(props.tags).some((t) => t.length > 0)
})

const classes = computed(() => {
  const prefix = show.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color border-grey-850 rounded-6 anim-color-200 md:border`
})

const bookTitle = computed(() => (value) => {
  const book = books.value.find(b => +b.id === +value)
  return book?.title
})

function isSelected (tag: ITag) {
  return props.modelValue?.filters?.tagsFilter.some(item => item.id === tag.id)
}

function showDropdown () {
  show.value = !show.value
}

function close () {
  show.value = false
}

function toggleTag (tag: ITag | null) {
  let selectedTags = cloneDeep(props.modelValue?.filters?.tagsFilter)

  if (tag) {
    const selected = isSelected(tag)

    if (selected) {
      selectedTags = selectedTags.filter(item => item.id !== tag.id)
    } else {
      selectedTags.push(tag)
    }
  } else {
    selectedTags = []
  }

  emit('update:modelValue', {
    filters: {
      ...props.modelValue?.filters,
      tagsFilter: selectedTags
    },
    doRequest: true
  })
}
</script>
