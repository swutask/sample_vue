<template>
  <div class="flex" :class="[{ 'pointer-events-none': disabled }, textColor]">
    <DropdownModule
      ref="dropdownRef"
      :width="180"
      background="bg-primary dark:bg-grey-110"
      class="cursor-default rounded-8 w-full"
      :isTeleported="isTeleported"
      :dropdownClasses="dropdownClasses"
      :positionDirection="positionDirection"
      z-index="z-[11000]"
      :preventOpenOnClick="preventOpenOnClick"
    >
      <template #button="{ isOpen }">
        <slot name="button">
          <ButtonModule
            :tooltipText="showTooltip ? tooltipText : ''"
            teleportTooltip
            tooltipBottom
            class="w-full"
          >
            <template #wrapper>
              <div
                v-if="!disabled"
                class="group flex items-center "
                :class="[
                  isAttributeDropdown ? '' : 'attribute',
                  paddings,
                  borderRadius,
                  customWrapperClasses
                ]"
              >
                <i
                  class="icon-story-points"
                  :class="[!modelValue || isAttributeDropdown ? `mr-8 ${opacity}` : '', prefixMargin, `text-${iconSize}`]"
                />

                <div
                  class="flex items-center rounded-8 anim-opacity mr-5 mt-1"
                  :class="[
                    fontSize,
                    isAttributeDropdown ? '' : 'text-dark-100 text-[12.5px]'
                  ]"
                >
                  {{ isAttributeDropdown ? title : storyPointText || title }}
                </div>

                <i
                  v-if="modelValue && !isAttributeDropdown"
                  class="icon-close-smooth text-app-color text-16 cursor-pointer"
                  :class="[{ 'group-hover:block': modelValue }, { 'hidden': !isOpen }]"
                  @click.stop="toggleStoryPoints(null)"
                />

                <i v-else-if="isAttributeDropdown" class="icon-arrow-top rotate-90 ml-auto" />
              </div>

              <div
                v-else
                class="group flex items-center hover:bg-menu-hover p-6 rounded-10"
                :class="[
                  { 'bg-grey-200 shadow-grey-700-05 border-transparent' : isOpen },
                  customClasses]"
              >
                <ButtonModule
                  prefix="icon-story-points text-16"
                  :text="storyPointText || title"
                  class="hover:bg-menu-hover rounded-8 text-13"
                  :class="modelValue ? '' : opacity"
                />

                <i
                  v-if="!hideDeleteButton"
                  class="icon-close-smooth text-app-color text-16 cursor-pointer hidden ml-5"
                  :class="{ 'group-hover:block': !disabled && modelValue }"
                  @click.stop="toggleStoryPoints(null)"
                />
              </div>
            </template>
          </ButtonModule>
        </slot>
      </template>

      <div class="default-dropdown text-14">
        <div
          v-for="point in storyPointsData"
          :key="point.id"
          class="flex items-center px-10 py-5 cursor-pointer"
          @click="toggleStoryPoints(point.id)"
        >
          <i class="icon-story-points mr-7" :class="iconsClasses" />
          <p :class="textClasses">{{ point.text }}</p>
        </div>

        <div v-if="hideDeleteButton" class="flex items-center cursor-pointer px-20 pt-2 text-grey-950" @click.stop="toggleStoryPoints(null)">
          <i class="icon-delete" />
          <p class="ml-15">Remove estimate</p>
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
import { storyPointsData } from '@/pages/task-board/tasks-utils'

const props = withDefaults(defineProps<{
  task: ITask
  modelValue?: number
  disabled?: boolean
  hideDeleteButton?: boolean
  showTooltip?: boolean
  borderRadius?: string
  paddings?: string
  iconSize?: number
  textColor?: string
  opacity?: string
  fontSize?: string
  positionMenu?: string
  title?: string
  prefixMargin?: string
  customClasses?: string
  customWrapperClasses?: string
  preventOpenOnClick?: boolean
  isModalView?: boolean
  isAttributeDropdown?: boolean
  iconsClasses?: string
  textClasses?: string
  dropdownClasses?: string
  positionDirection?: string
  isCreate?: boolean
  isTeleported?: boolean
}>(), {
  isTeleported: true,
  showTooltip: true,
  borderRadius: 'rounded-4',
  paddings: 'px-5 py-3',
  iconSize: 14,
  textColor: 'text-dark-800',
  opacity: 'opacity-30',
  fontSize: 'text-15',
  title: 'No estimate',
  prefixMargin: 'mr-8'
})

const emit = defineEmits(['update:modelValue'])

const { handleUpdateTask, updateTask, getTasksForTaskBoardPageWithFilters } = useTask()
const route = useRoute()

const storyPointText = computed(() => storyPointsData.find(e => e.id === props.modelValue)?.text)
const dropdownRef = ref()

const tooltipText = computed(() => {
  return props.modelValue ? storyPointText.value : 'Estimate'
})

function toggleStoryPoints (type: number | null) {
  emit('update:modelValue', type)

  if (!props.isCreate) {
    updateTask({
      id: props.task.id,
      bookId: props.task.bookId,
      storyPoints: type
    })

    handleUpdateTask({
      ...props.task,
      storyPoints: type
    })

    if (route.name === 'TaskBoardTeam') {
      getTasksForTaskBoardPageWithFilters(+route.params.id)
    }
  }
}

function close () {
  dropdownRef.value.close()
}

defineExpose({
  close
})
</script>
