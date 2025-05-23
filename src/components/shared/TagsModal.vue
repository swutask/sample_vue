<template>
  <div class="no-drag flex relative" :class="[{'pointer-events-none': disabled}, textColor]">
    <DropdownModule
      ref="dropdownRef"
      preventCloseOnClick
      :width="180"
      background="bg-primary dark:bg-grey-110"
      :isTeleported="!isModalView"
      class="cursor-default w-full"
      :dropdownClasses="dropdownClasses"
      :positionDirection="positionDirection"
      is-auto-menu-position
      z-index="z-[10001]"
      :preventOpenOnClick="preventOpenOnClick"
    >
      <template #button="{isOpen}">
        <slot name="button" :isOpen="isOpen">
          <div
            class="flex items-center cursor-pointer w-full group"
            :class="[isAttributeDropdown ? isOpen ? 'bg-grey-200 opacity-80 md:opacity-50' : '' : 'hover:bg-grey-200',
                     selectedTags?.length > 0 ? '' : (isTaskList ? 'px-0' : 'px-7'),
                     tagsBtnClasses
            ]"
            @click="showDropdown"
          >
            <div v-if="selectedTags?.length > 0 && !isAttributeDropdown" class="flex items-center w-full space-x-5" :class="wrapperClasses">
              <div
                v-for="tag in selectedTags"
                :key="tag.id"
                class="flex items-center rounded-full px-6 font-normal-plus flex-shrink-0 h-24"
                :class="[ tagClass, tag.name ? 'min-w-[30px]' : 'w-24' ]"
                :style="[ tagColor(tag.color), tagWidth ]"
              >
                <span class="truncate">{{ tag.name }}</span>
              </div>
            </div>

            <div v-else-if="!selectedTags?.length && isTaskList" class="flex">
              <ButtonModule
                prefix="icon-add-tag text-20 text-grey-11 hover:text-grey-950 hover:bg-menu-hover rounded-8 anim-opacity p-3"
                tooltipText="Label"
                tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
                class="bg-transparent"
                teleportTooltip
                tooltipBottom
              />
            </div>

            <ButtonModule
              v-else-if="(!selectedTags?.length && showEmptyState) || isAttributeDropdown"
              :prefix="`icon-label ${iconSize} mr-10 ${isNewTaskModal ? 'group-hover:text-app-color' : ''}`"
              :classes="btnClasses"
              :suffix="isModalView ? 'icon-arrow-top rotate-90 ml-auto' : ''"
              class="w-full"
            >
              {{ title }}
            </ButtonModule>
          </div>
        </slot>
      </template>
      <div class="pt-18 pb-8 px-12 overflow-y-auto" @click.stop>
        <div v-for="tag in tags" :key="tag.id" class="mb-10 flex items-center w-full font-medium">
          <Tag :tag="tag" :isSelected="isSelected(tag)" @toggleTag="toggleTag" @updateTag="updateTag" />
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
import { tagColor } from '@/plugins/filters'

const props = withDefaults(defineProps<{
  selectedTags: ITag[]
  tagsBtnClasses?: string
  customBtnClasses?: string
  tags: ITag[]
  positionClasses?: string
  tagClass?: string
  isTaskList?: boolean
  disabled?: boolean
  disableOpenModal?: boolean
  showEmptyState?: boolean
  maxLabelsAmount?: number
  title?: string
  titleFontSize?: string
  iconSize?: string
  borderRadius?: string
  paddings?: string
  textColor?: string
  opacity?: string
  tagMaxWidth?: number
  isNewTaskModal?: boolean
  wrapperClasses?: string
  isModalView?: boolean
  isAttributeDropdown?: boolean
  tagsWrapper?: string
  preventOpenOnClick?: boolean
  dropdownClasses?: string
  positionDirection?: string
}>(), {
  dropdownClasses: '!shadow',
  positionClasses: '-right-10 top-25 z-9999',
  tagClass: 'text-11',
  isTaskList: false,
  disabled: false,
  disableOpenModal: false,
  showEmptyState: true,
  maxLabelsAmount: 2,
  title: 'Label',
  titleFontSize: 'text-12',
  iconSize: 'text-20',
  borderRadius: 'rounded-4',
  paddings: 'px-5 py-3',
  textColor: 'text-dark-800',
  opacity: 'opacity-30',
  tagMaxWidth: 170
})

const emit = defineEmits(['showDropdown', 'toggleTag', 'updateTag'])

const show = ref(false)
const dropdownRef = ref()

const { blockHotKey } = useGeneral()
const { updateTaskTag } = useTask()

const isSelected = computed(() => tag => props.selectedTags.some(item => item.id === tag.id))
const tagWidth = computed(() => `max-width: ${props.selectedTags.length === 1 ? 100 : props.tagMaxWidth / props.selectedTags.length - 8}px;`)

const btnClasses = computed(() => {
  if (props.isAttributeDropdown) {
    return `opacity-100 ${props.paddings} ${props.borderRadius} ${props.opacity} ${props.titleFontSize}`
  }

  const prefix = show.value ? '' : 'hover:'

  return `${prefix}opacity-${props.isNewTaskModal ? '80' : '50'} anim-opacity
   ${props.paddings} ${props.borderRadius} ${props.opacity}
   ${props.titleFontSize} ${props.customBtnClasses}`
})

function showDropdown () {
  if (props.disabled || props.disableOpenModal) return

  show.value = !show.value
  blockHotKey(show.value)
  emit('showDropdown', show.value)
}

function toggleTag ({ tag, isSelected, isUpdate }) {
  if (props.selectedTags?.length >= props.maxLabelsAmount && !isSelected) return
  emit('toggleTag', { tag, isSelected, isUpdate })
}

function updateTag ({ name, id, bookId }) {
  updateTaskTag({ name, id, bookId })
  emit('updateTag', { name, id, bookId })
}

function close () {
  dropdownRef.value.close()
}

defineExpose({
  close
})
</script>
