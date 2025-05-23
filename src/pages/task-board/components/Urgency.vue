<template>
  <div class="flex" :class="[{ 'pointer-events-none': disabled }, textColor]">
    <DropdownModule
      ref="dropdownRef"
      :width="175"
      :zIndex="zIndex"
      :isTeleported="isTeleported"
      :isAutoMenuPosition="isAutoMenuPosition"
      background="bg-primary dark:bg-grey-110"
      class="cursor-default rounded-6 w-full"
      :positionDirection="positionMenu || 'left'"
      top-position="100%"
      @input="$emit('update:visibility', $event)"
    >
      <template #button="{ isOpen }">
        <slot name="button" :isOpen="isOpen">
          <ButtonModule
            :tooltipText="showTooltip ? tooltipText : ''"
            teleportTooltip
            tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
            tooltipBottom
          >
            <template #wrapper>
              <UrgencyIcon
                v-if="!modelValue && !isTaskList && !disabled && !isModal"
                :icon-size="iconSize"
                :type="0"
                class="p-5 hover:bg-menu-hover text-grey-11 rounded-8"
              />

              <ButtonModule
                v-if="!isTaskList && !disabled && isModal"
                class="group"
                :classes="`
               ${paddings} ${borderRadius} ${modelValue && !isNewTaskModal ? 'attribute bg-primary' : 'attribute attribute-empty'}`"
              >
                <UrgencyIcon
                  :type="modelValue || 0"
                  :class="[
                    !modelValue ? 'mr-8' : '', prefixMargin,
                    isNewTaskModal ? 'group-hover:brightness-100' : ''
                  ]"
                  :icon-size="iconSize"
                />
                <div
                  class="flex items-center rounded-8 text-[12.5px]"
                  :class="[
                    fontSize
                  ]"
                >
                  <span>{{ urgencyText }}</span>

                  <i
                    v-if="modelValue && !hideDeleteButton"
                    class="icon-close-smooth text-app-color text-16 cursor-pointer md:hidden block"
                    :class="{ 'md:group-hover:block': modelValue }"
                    @click.stop="toggleUrgency(null)"
                  />
                </div>
              </ButtonModule>

              <div
                v-else-if="modelValue || isTaskList"
                class="group flex items-center  rounded-8 justify-center"
                :class="[
                  { 'urgency anim-color' : isModal },
                  { 'bg-grey-200 shadow-grey-700-05 border-transparent' : isOpen && isModal && !weekPlanner },
                  { 'p-6 anim-all border border-grey-850 hover:bg-grey-200 rounded-7' : !isModal && !isTaskList && !weekPlanner},
                  { 'hover:brightness-75': isTaskList && !modelValue },
                  customClasses]"
              >
                <UrgencyIcon :type="modelValue || 0" :icon-size="iconSize" />

                <i
                  v-if="!hideDeleteButton"
                  class="icon-close-smooth text-app-color text-16 cursor-pointer hidden ml-5"
                  :class="{ 'md:group-hover:block': !disabled && modelValue }"
                  @click.stop="toggleUrgency(null)"
                />
              </div>
            </template>
          </ButtonModule>
        </slot>
      </template>

      <div class="p-7">
        <UrgencyIcon
          v-for="urgency in urgencyData"
          :key="urgency.type"
          :text="urgency.text"
          :type="urgency.type"
          class="px-10 py-5 hover:bg-menu-hover rounded-6 no-click-outside"
          :class="modelValue === urgency.type ? 'bg-menu-hover' : ''"
          @click="toggleUrgency(urgency.type)"
        />
        <div
          v-if="hideDeleteButton"
          class="flex text-13 items-center cursor-pointer px-10 pt-2 text-grey-950"
          @click.stop="toggleUrgency(null)"
        >
          <i class="icon-delete" />
          <p class="ml-16">Remove priority</p>
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  task: ITask
  modelValue?: number
  disabled?: boolean
  hideDeleteButton?: boolean
  isModal?: boolean
  isTaskList?: boolean
  isSubtask?: boolean
  isCreate?: boolean
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
  isNewTaskModal?: boolean
  isAutoMenuPosition?: boolean
  weekPlanner?: boolean
  isTeleported?: boolean
  zIndex?: string
}>(), {
  isTeleported: true,
  showTooltip: true,
  borderRadius: 'rounded-4',
  paddings: 'px-5 py-3',
  iconSize: 14,
  textColor: 'text-dark-800',
  opacity: 'opacity-30',
  fontSize: 'text-15',
  title: 'Priority',
  prefixMargin: 'mr-8',
  zIndex: 'z-[9999]'
})

const { isMobile } = useGeneral()

const emit = defineEmits(['update:modelValue', 'update:visibility'])
const route = useRoute()
const { handleUpdateTask, updateTask, handleUpdateSubTask, getTasksForTaskBoardPageWithFilters } = useTask()

const dropdownRef = ref()

const urgencyData = [
  { type: 4, text: 'Urgent', textMobile: 'Urgent' },
  { type: 3, text: 'High priority', textMobile: 'High' },
  { type: 2, text: 'Medium Priority', textMobile: 'Medium' },
  { type: 1, text: 'Low priority', textMobile: 'Low' }
]

const tooltipText = computed(() => {
  return props.modelValue
    ? urgencyData.find(e => e.type === props.modelValue)?.text
    : props.isModal ? '' : 'Priority'
})

const urgencyText = computed(() => {
  const text = urgencyData.find(e => e.type === props.modelValue)?.[isMobile.value ? 'textMobile' : 'text']

  if (!text) {
    return props.title
  }

  return props.isNewTaskModal ? '' : text
})

function toggleUrgency (type: number | null) {
  emit('update:modelValue', type)

  if (!props.isCreate) {
    updateTask({
      id: props.task.id,
      bookId: props.task.bookId,
      urgentStatus: type
    })

    if (props.isSubtask) {
      handleUpdateSubTask({
        value: {
          ...props.task,
          urgentStatus: type
        }
      })
    } else {
      handleUpdateTask({
        ...props.task,
        urgentStatus: type
      })

      if (route.name === 'TaskBoardTeam') {
        getTasksForTaskBoardPageWithFilters(+route.params.id)
      }
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
