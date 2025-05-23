<template>
  <div
    class="relative"
    :class="[classes, {'minimized': !showMore}]"
    :style="isPerspective ? `z-index: ${50 - rowIndex}` : `z-index: ${1000 - rowIndex}`"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
    @click="clickOnRow"
  >
    <div
      class="max-h-min py-10 rounded-12"
      :class="{'min-w-[276px]': isCardView && !showMore}"
      :style="{ 'background-color': isCardView && (isGroupedByStatus || isGroupedByLabels) ? background : '' }"
    >
      <div
        class="group prevent-drag-scroll"
        :class="[
          isEdit ? 'cursor-default' : 'cursor-grab drag-handler',
          {'px-5' :isCardView},
          groupedBy === 'Assignee' && !item.id ? 'mt-5 mb-[25px]' : !showMore && isCardView ? '' : 'mb-6'
        ]"
      >
        <div class="flex items-center">
          <div
            class="flex items-center"
            :class="isCardView ? 'flex-grow' : 'rounded-6 px-10 py-3 justify-between w-full'"
            :style="(!isCardView && isGroupedByStatus) ? { backgroundColor: rowColor } : {}"
          >
            <div class="flex items-center" :class="isCardView ? 'flex-grow' : ''">
              <ButtonModule
                v-if="computedTasks.length && !isCardView"
                :has-hover="!isMobile"
                :prefix="showMore ?
                  'icon-keyboard-arrow-down' :
                  'icon-keyboard-arrow-left rotate-180'
                "
                class="md:hover:bg-menu-hover rounded-6 text-grey-975 text-12 py-6 px-8 no-drag flex"
                @click.stop="setMinimizedRows(showMore)"
              />

              <div
                class="flex items-center rounded-full bg-opacity-10 anim-all max-w-[205px]"
                :class="[
                  groupedBy === 'Labels' ? '' : 'pr-15 pl-9 py-7',
                  groupedBy === 'Assignee' ? 'mb-[-5px]' : '',
                  groupedBy === 'WeekDays' ? '!pl-3' : ''
                ]"
              >
                <!-- <div
                  v-if="isGroupedByStatus && (isEdit || item.color)"
                  :class="isCardView && !showMore ? '-rotate-90' : ''"
                  class="flex items-center mr-5"
                >
                  <NewTaskRowColor
                    class="no-drag"
                    :width="12"
                    :height="12"
                    :withMargin="!(isCardView && !showMore)"
                    :color="item.color"
                    position="left-0"
                    @updateColor="updateColor"
                  />
                </div> -->

                <div
                  v-if="groupedBy === 'Labels' && item.id"
                  class="flex items-center rounded-full px-7 font-medium flex-shrink-0
                     tracking-small !h-24 text-10 !min-w-[35px]"
                  :class="[!!item.name ? 'min-w-[30px] h-30' : 'w-20 h-20']"
                  :style="[tagColor(item.color)]"
                >
                  <span class="truncate">{{ computedTitle }}</span>
                </div>

                <div
                  v-if="groupedBy === 'Space'"
                  class="flex items-center"
                >
                  <BookLabel
                    background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
                    class="truncate cursor-pointer text-14 py-5 mr-5"
                    :bookId="item"
                    :customStyle="{ fontSize: 'font-semibold', defaultIcon: 'w-18 h-18', iconHover: '' }"
                    :has-border="false"
                    size="18"
                  />
                </div>

                <div v-if="!isEdit" class="flex truncate items-center max-w-full">
                  <UserBadge
                    v-if="groupedBy === 'Assignee' && item.id"
                    :first-name="item.firstName"
                    :last-name="item.lastName"
                    :avatarUrl="item.avatar?.url"
                    :color="item.color"
                    :size="21"
                    fontSize="!text-12"
                    class="mb-4 text-14 items-center"
                  />
                  <UrgencyIcon
                    v-if="groupedBy === 'Priority'"
                    :type="item.id || 0"
                    :class="isListView ? 'mr-15' : 'mr-10'"
                  />

                  <div
                    v-if="isGroupedByDate || (item.id && groupedBy !== 'Labels' && item.id !== 'Overdue')"
                    class="flex items-center text-14 truncate font-semibold leading-small"
                    :class="{'md:text-[13.5px] text-14': !isCardView}"
                    :title="computedTitle"
                  >
                    <i v-if="isGroupedByEstimate" class="icon-story-points text-16 mr-10" />

                    <p
                      class="truncate"
                      :class="[
                        isHover && !isClient ? 'max-w-[145px]' : 'max-w-[200px]',
                        { 'font-bold': !isCardView && !isMobile }
                      ]"
                    >
                      {{ computedTitle }}
                    </p>
                  </div>

                  <p
                    v-if="!item.id && !isGroupedByDate && !isGroupedBySpace"
                    class="text-14 text-dark-default truncate font-semibold leading-small"
                  >
                    Unsorted
                  </p>
                </div>

                <input
                  v-if="isEdit && isGroupedByStatus"
                  ref="inputRef"
                  v-model="title"
                  class=" max-w-[200px] text-14 font-bold leading-small bg-transparent outline-none pr-5"
                  type="text"
                  @blur="cancelEdit"
                  @keypress.enter="cancelEdit"
                  @click.stop
                >
              </div>
            </div>

            <div
              v-if="!isEdit"
              class="flex items-center relative flex-shrink-0 h-26"
              :class="{ 'ml-auto !w-auto': isCardView }"
            >
              <transition name="fade">
                <div
                  v-if="(isHover || showMenu || isMobile)"
                  class="flex items-center absolute top-0 right-0 no-drag"
                  :class="{'right-26' : isMobile && !isCardView }"
                  @click.stop
                >
                  <ButtonModule
                    v-if="isCardView && showMore"
                    prefix="icon-task-decrease text-15"
                    :icon-has-margin="false"
                    :tooltipText="showMore ? 'Minimize' : 'Expand'"
                    teleportTooltip
                    tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
                    tooltipBottom
                    :class="{'mr-2': isGroupedByStatus}"
                    has-hover
                    class="rounded-6 anim-color-200 p-7 text-app-color hover:bg-menu-hover"
                    @click.stop="setMinimizedRows(showMore)"
                  />

                  <ButtonModule
                    v-if="showMore && !isClient && item.id !== 'Overdue'"
                    prefix="icon-add text-13"
                    :icon-has-margin="false"
                    tooltipText="Add Task"
                    teleportTooltip
                    tooltipBottom
                    has-hover
                    tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
                    class="rounded-6 anim-color-200 p-7 mr-5 text-app-color hover:bg-menu-hover"
                    @click.stop="newTask('top')"
                  />

                  <DropdownModule
                    v-if="isGroupedByStatus && !isClient"
                    :prefix="`icon-more-horizontal text-20 ${isCardView && !showMore ? '-rotate-90' : ''}`"
                    buttonClasses="!p-4"
                    tooltipText="More options"
                    tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
                    tooltipBottom
                    teleportTooltip
                    :width="150"
                    top-position="30px"
                    isAutoMenuPosition
                    defaultStyles
                    :class="{'-rotate-90': isCardView && !showMore}"
                    background="bg-primary dark:bg-grey-110"
                    :position-direction="isCardView && !showMore ? 'left' : 'right'"
                    @click="showMenu = true"
                    @close="showMenu = false"
                  >
                    <NewTaskRowColor
                      :color="item.color"
                      :withMargin="false"
                      position="top-40 right-0"
                      @updateColor="updateColor"
                    >
                      <ButtonModule
                        text="Change color"
                        prefix="icon-highlight mr-15"
                        class="px-10 py-8 w-full group-scope text-13"
                      />
                    </NewTaskRowColor>

                    <ButtonModule
                      text="Edit"
                      prefix="icon-edit mr-15"
                      class="px-10 py-8 w-full group-scope text-13"
                      @click="toggleEdit"
                    />
                    <ButtonModule
                      text="Delete"
                      prefix="icon-delete mr-15 "
                      class="px-10 py-8 w-full text-13 rounded-b-10"
                      @click="deleteTaskRow"
                    />
                  </DropdownModule>
                </div>

                <p
                  v-else
                  class="shrink-0 text-13 text-grey-250 mr-3 font-[450]"
                >
                  {{ taskCount }}
                </p>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showMore"
        id="show-scrollbar-on-hover"
        ref="wrapperRef"
        class="overflow-x-hidden"
        :class="[
          {'px-8 scrollbar-gutter': isCardView },
          { 'max-h-calc-mobile-task-board overflow-y-auto px-3 py-2 task-row-scroll-bar': isCardView },
          isCardView && isSidebarCollapsed
            ? 'md:max-h-calc-task-board-collapsed'
            : isCardView ? 'md:max-h-calc-task-board' : '',
          isPerspective ? (isSidebarCollapsed ? 'md:!max-h-calc-perspective-board-collapsed' : 'md:!max-h-calc-perspective-board') : ''
        ]"
      >
        <NewTask
          v-if="showNewTask && newTaskOrder === 'top'"
          :task-row-id="taskRowId"
          :order="0"
          :isPerspective="isPerspective"
          :book="isGroupedBySpace ? item : null"
          :urgencyStatus="isGroupedByPriority ? item?.id : null"
          :estimate="isGroupedByEstimate ? item.id : null"
          :teamMembers="(item.id !== null && isGroupedByAssignee) ? item : null"
          :taskEndDate="newTaskDateForGrouping"
          :taskTags="isGroupedByLabels ? item : null"
          class="prevent-drag-scroll"
          :isCardView="isCardView"
          :isListView="isListView"
          @getTasks="$emit('getTasks')"
          @hideNewTask="hideNewTask"
        />

        <draggable
          v-if="showMore || isCardView"
          :id="isGroupedByStatus ? `${item?.id} ${rowId}` : item?.id"
          v-model="computedTasks"
          :data-date="item"
          group="tasks"
          :disabled="isClient || isPerspective"
          :ghostClass="isCardView ? 'my-sortable-ghost-task--card' : 'my-sortable-ghost-task--list'"
          :chosenClass="isCardView && isMobile ? 'grab-class-task-mobile' : 'grab-class-task'"
          drag-class="grab-class-task"
          item-key="id"
          filter=".no-drag"
          handle=".drag-handler"
          :forceFallback="true"
          fallbackClass="force-fallback-light-task"
          class="rounded-8"
          :move="onMove"
          :class="[
            computedTasks.length === 0 ? 'w-full h-min absolute' : 'prevent-drag-scroll',
            { '-mr-6' : isCardView, 'contents': isCardView && isMobile }
          ]"
          :delay="500"
          :delay-on-touch-only="true"
          @add="add"
          @mousedown="$emit('toggleDragging', true)"
          @mouseup="$emit('toggleDragging', false)"
          @start="onDragStart"
          @end="onDragEnd"
        >
          <template #item="{ element, index }">
            <TaskItemObserver
              :isCardView="isCardView"
              :task="element"
              :idx="index"
              :showOnTask="showOnTask"
              :isPerspective="isPerspective"
              :rowId="rowId"
              @getTasks="$emit('getTasks')"
            />
          </template>
        </draggable>

        <NewTask
          v-if="showNewTask && newTaskOrder === 'bottom'"
          :task-row-id="taskRowId"
          class="prevent-drag-scroll"
          :isCardView="isCardView"
          :isListView="isListView"
          :isPerspective="isPerspective"
          :order="latestTaskOrder"
          :book="isGroupedBySpace ? item : null"
          :estimate="isGroupedByEstimate ? item.id : null"
          :urgencyStatus="isGroupedByPriority ? item?.id : null"
          :teamMembers="(item.id !== null && isGroupedByAssignee) ? item : null"
          :taskEndDate="newTaskDateForGrouping"
          :taskTags="isGroupedByLabels ? item : null"
          @getTasks="$emit('getTasks')"
          @addNewTemplate="addNewTemplate"
          @hideNewTask="hideNewTask"
        />
      </div>

      <ButtonModule
        v-if="(!isClient && (showMore || isCardView) && item.id !== 'Overdue') && showMore && !book?.isSample"
        text="new task"
        class="text-14 font-normal text-grey-250 hover:text-app-color
                 relative z-10 py-8 px-10 rounded-6 anim-color-200 prevent-drag-scroll ml-6 hover:bg-menu-hover"
        prefix="icon-add text-10 mt-2 mr-7"
        :class="{'mt-10': !isCardView }"
        @click.stop="newTask('bottom')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { tagColor } from '@/plugins/filters'
import dayjs from 'dayjs'
import { formatDate, getWeekDates, isDateInRange } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

const props = withDefaults(defineProps<{
  item: ITaskRow | any
  isCardView?: boolean
  isListView?: boolean
  sortedBy?: string
  groupedBy?: string
  rowIndex?: number
  isPerspective?: boolean
  showOnTask?: IShowOnTaskObj
}>(), {
  groupedBy: 'Status'
})

const emit = defineEmits(['getTasks', 'toggleDragging'])

const route = useRoute()
const { isDarkMode } = useTheme()
const { setNotification, isMobile } = useGeneral()
const { isSidebarCollapsed } = useSidebar()
const { bookMembers, book } = useBook()
const {
  tasks,
  rows,
  tags,
  handleUpdateTask,
  updateTask,
  updateRow,
  deleteRow,
  complete,
  deleteTaskTags,
  toggleTaskTag,
  assignMember,
  unassignMember
} = useTask()
const { allowAddTasks, toggleLimitModal, currentPlan } = usePlan()
const { isClient, user } = useProfile()

const inputRef = ref(null)
const wrapperRef = ref(null)
const dynamicHeight = ref('0px')
const showNewTask = ref(false)
const showMenu = ref(false)
const isHover = ref(false)
const isEdit = ref(false)
const newTaskOrder = ref('bottom')
const title = ref(props.item?.title)
const showMore = ref(true)

const isGroupedByStatus = computed(() => props.groupedBy === 'Status')
const isGroupedByLabels = computed(() => props.groupedBy === 'Labels')
const isGroupedByAssignee = computed(() => props.groupedBy === 'Assignee')
const isGroupedByPriority = computed(() => props.groupedBy === 'Priority')
const isGroupedByEstimate = computed(() => props.groupedBy === 'Estimate')
const isGroupedByDate = computed(() => props.groupedBy === 'Date')
const isGroupedBySpace = computed(() => props.groupedBy === 'Space')
const taskRowId = computed(() => isGroupedByStatus.value ? props.item.id : rows.value?.find(r => r.order === 0)?.id)
const rowId = computed(() => `task-row-${taskRowId.value}`)

const taskCount = computed(() => {
  const prefix = computedTasks.value.length === 1 ? '' : 's'

  return `${computedTasks.value.length} task${prefix}`
})

function getDateOptions (key) {
  const { nextWeek } = getWeekDates()
  const tomorrow = formatDate(dayjs().add(1, 'day'))
  const nextMonday = formatDate(dayjs().startOf('week').add(1, 'week').add(1, 'day'))
  const yesterday = formatDate(dayjs().subtract(1, 'day'))
  const upcoming = formatDate(dayjs(nextWeek.end).add(1, 'day'))

  const existingOptions = {
    Today: formatDate(dayjs()),
    Tomorrow: tomorrow,
    Overdue: yesterday,
    'Next week': nextMonday,
    Upcoming: upcoming,
    'Currently in progress': formatDate(dayjs()),
    // TODO: rewrite this with adding new prop for NewTask component
    'Currently in progress v2': {
      startDate: yesterday,
      endDate: tomorrow
    }
  }

  return existingOptions?.[key] || null
}

const latestTaskOrder = computed(() => {
  const orders = computedTasks.value.length > 0 ? computedTasks.value.map(t => t.order) : [9998]
  const maxOrder = Math.max(...orders)

  return maxOrder + 1
})

const newTaskDateForGrouping = computed(() => {
  if (isGroupedByDate.value) {
    return getDateOptions(props.item)
  }

  return null
})

const classes = computed(() => {
  if (props.isCardView) {
    if (!showMore.value) {
      return 'h-[51px] w-[51px] rotate-90'
    }
    return 'flex-1 min-w-[276px] w-[276px] first:ml-1 last:mr-1'
  } else {
    if (showMore.value) {
      return 'mb-20'
    }
    return '!ml-0 w-full mb-0'
  }
})

const computedTitle = computed(() => {
  const titleMap = {
    Status: props.item.title,
    Priority: props.item.text,
    Labels: props.item?.name || null,
    Estimate: props.item.text,
    WeekDays: props.item.id,
    Date: props.item,
    Space: props.item || null
  }
  return titleMap[props.groupedBy]
})

const rowColor = computed(() => props.item?.color ? `#${props.item.color.toString(16)}18` : '#fff')

const colorMap = computed(() => ({
  8947848: isDarkMode.value ? '#333' : '#FAFAFA',
  6284031: 'rgba(95, 226, 255, 9%)',
  16772959: 'rgba(254, 255, 0, 10%)',
  6291359: 'rgba(95, 255, 159, 10%)',
  6291426: 'rgba(95, 255, 226, 11%)'
}))

const background = computed(() => {
  return colorMap.value[props.item?.color] ?? (props.item?.color ? `#${props.item.color.toString(16)}0f` : '#ffffff0f')
})

const computedTasks = computed({
  get: () => {
    return tasks.value
      .filter(task => {
        if (props.groupedBy === 'Date') {
          return getConditionForDateGrouping(task, props.item)
        } else {
          return getConditionForGroupBy(task)
        }
      })
      .sort((a, b) => {
        if (props.sortedBy === 'Manual') {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
        }
        return 0
      })
  },
  set: (val) => {
    const ids = {}
    val.forEach((item, index) => {
      if (!ids[item.bookId]) {
        ids[item.bookId] = [item.id]
      } else {
        ids[item.bookId].push(item.id)
      }

      handleUpdateTask({ id: item.id, order: index })
    })

    for (const [key, value] of Object.entries(ids)) {
      taskService.order({ ids: value, bookId: key }).then(() => {
        (value as number[]).forEach((item, index) => handleUpdateTask({ id: item, order: index }))
      })
    }
  }
})

watch(() => props.isCardView, () => {
  checkMinimizedRows()
}, {
  immediate: true
})

function getConditionForDateGrouping (task: ITask, name: any) {
  const { nextWeek } = getWeekDates()
  const today = formatDate(dayjs())
  const tomorrow = formatDate(dayjs().add(1, 'day'))

  const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day')

  const conditions = {
    'No due date': !task?.endDate,
    Overdue: (task && task.endDate < today),
    'Currently in progress': task && task.startDate <= today && task.endDate > today,
    Today: (task && task.endDate === today),
    Tomorrow: (task && (task.startDate === tomorrow || (!task.startDate && task.endDate === tomorrow))),
    'Next week': (task && task.startDate ? task.startDate > tomorrow && task.endDate <= formatDate(nextWeek.end) : task.endDate <= formatDate(nextWeek.end)),
    Upcoming: (task.startDate > tomorrow && task.endDate > formatDate(endOfCurrentWeek))
  }

  return conditions[name]
}

function getStoredMinimizedRows () {
  const storedMinimizedRows = localStorageService.getItem('minimizedRows') || {}

  const currentRowKey = isGroupedByStatus.value ? props.item.id : props.rowIndex + props.groupedBy
  const currentViewKey = props.isCardView ? 0 : 1

  const generatedKey = `${user.value.id}-${route.params.id}-${currentViewKey}-${currentRowKey}`

  return {
    data: storedMinimizedRows,
    key: generatedKey
  }
}

function checkMinimizedRows () {
  const { data, key } = getStoredMinimizedRows()

  showMore.value = !data[key]
}

function setMinimizedRows (value: boolean) {
  const { data, key } = getStoredMinimizedRows()

  if (value) {
    data[key] = value
  } else {
    delete data[key]
  }

  showMore.value = !value
  isHover.value = false

  localStorageService.setItem('minimizedRows', data)
}

function clickOnRow () {
  if (!showMore.value) {
    setMinimizedRows(showMore.value)
  }
}

function hideNewTask () {
  showNewTask.value = false
}

function getConditionForGroupBy (task: ITask) {
  const id = props.item?.id

  const conditionMap = {
    Space: task.bookId === +props.item,
    Status: task.taskRowId === id,
    Priority: task.urgentStatus === id,
    Labels: props.item.id === null ? task.taskTags.length === 0 : task.taskTags?.some((e) => e?.id === id),
    Assignee: props.item.id === null ? task.teamMembers.length === 0 : task.teamMembers?.some((e) => e.id === id),
    Estimate: props.item.id === null ? !task.storyPoints : task.storyPoints === id,
    WeekDays: task.endDate ? isDateInRange(id, task.startDate, task.endDate) : false
  }

  return conditionMap[props.groupedBy]
}

function newTask (order = 'bottom') {
  if (book.value?.isSample) {
    setNotification({
      message: 'You cannot add tasks to a sample space',
      color: 'error',
      uuid: window.crypto.randomUUID()
    })

    return
  }

  if (!allowAddTasks.value) {
    toggleLimitModal({
      show: true,
      type: 'Special',
      title: 'You\'re Doing Great',
      // eslint-disable-next-line max-len
      description: `<p>You've reached the limit of
            <span class="font-semibold underline">${currentPlan.value?.maxTasks} tasks</span>
              on the free plan</p>`
    })

    return
  }

  newTaskOrder.value = order
  showNewTask.value = true
}

async function onAddForGroupedByAssignee (evt, task) {
  const assignedMembers = evt.item.__draggable_context.element.teamMembers
  const memberToAdd = bookMembers.value.find((e) => e?.id === +evt.to?.id)
  const memberToRemove = bookMembers.value.find((e) => e?.id === +evt.from?.id)

  if (!evt.to?.id) {
    await unassignMember({
      id: task?.id,
      task,
      bookId: task?.bookId,
      memberIds: assignedMembers.map((e: any) => e.id),
      isSubtask: false
    })
  } else {
    assignMember({
      id: task?.id,
      task,
      bookId: task?.bookId,
      memberIds: [memberToAdd?.id],
      isSubtask: false
    })

    if (memberToRemove) {
      await unassignMember({
        id: task?.id,
        task,
        bookId: task?.bookId,
        memberIds: [memberToRemove?.id],
        isSubtask: false
      })
    }
  }
}

async function onAddForGroupedByLabels (evt, task) {
  const tagToAdd = tags.value.find((e) => e.id === +evt.to.id)
  const tagToRemove = tags.value.find((e) => e.id === +evt.from.id)
  if (!tagToAdd?.id) {
    await deleteTaskTags({
      taskId: task?.id,
      bookId: task?.bookId,
      tagIds: task.taskTags.map((e: any) => e.id)
    })
  } else {
    if (task.taskTags.filter(e => e.id === tagToAdd.id).length === 0) {
      toggleTaskTag({
        tag: tagToAdd,
        taskId: task?.id,
        bookId: task?.bookId
      })
    }
    if (tagToRemove) {
      toggleTaskTag({
        tag: tagToRemove,
        taskId: task?.id,
        bookId: task?.bookId
      })
    }
  }
}
function add (evt) {
  const id = parseInt(evt.item.id)
  const task = tasks.value.find(item => item.id === id)
  const newIndex = evt.newIndex
  const taskRowId = parseInt(isGroupedByStatus.value ? evt.to.id : task.taskRowId)
  const taskRow = rows.value.find(r => r.id === parseInt(isGroupedByStatus.value ? evt.to.id : task.taskRowId))
  const urgentStatus = isGroupedByPriority.value ? +evt.to.id : task.urgentStatus
  const storyPoints = isGroupedByEstimate.value ? +evt.to.id : task.storyPoints
  const keyForDateGrouping = evt.to.dataset.date === 'Currently in progress'
    ? 'Currently in progress v2'
    : evt.to.dataset.date

  const dateOptions = getDateOptions(keyForDateGrouping)

  const startDate = isGroupedByDate.value ? (dateOptions?.startDate || dateOptions) : task.startDate
  const endDate = isGroupedByDate.value ? (dateOptions?.endDate || dateOptions) : task.endDate

  if (isGroupedByLabels.value) onAddForGroupedByLabels(evt, task)
  if (isGroupedByAssignee.value) onAddForGroupedByAssignee(evt, task)

  updateTask({ id: task.id, order: newIndex, taskRowId, bookId: task.bookId, urgentStatus, storyPoints, startDate, endDate })

  handleUpdateTask({ id: task.id, order: newIndex, taskRow, taskRowId, urgentStatus, storyPoints, startDate, endDate })
}

function toggleEdit () {
  if (isClient.value) return
  isEdit.value = !isEdit.value

  if (isEdit.value) {
    setTimeout(() => {
      inputRef.value.focus()
      inputRef.value.setSelectionRange(0, 9999)
    }, 100)
  }
}

function onMove () {
  return props.sortedBy === 'Manual'
}

function onDragStart (card) {
  emit('toggleDragging', true)

  nextTick(() => {
    const el = document.getElementById(card.clone.id)
    dynamicHeight.value = el?.getAttribute('data-height') || '0px'
  })
  document.body.classList.add('grabbing')

  if (props.sortedBy !== 'Manual' && !props.isPerspective) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: '<p>Remove the <span class="font-bold">Sort by</span> filter to rearrange tasks</p>',
      color: 'success'
    })
  }
}

function onDragEnd (value) {
  emit('toggleDragging', false)
  document.body.classList.remove('grabbing')
  const task = value.item.__draggable_context.element
  const taskRow = rows.value.find(r => r.id === parseInt(isGroupedByStatus.value ? value.to.id : task.taskRowId))
  const destinationDoneRows = ['done', 'completed']
  const shouldPreventCompleting = destinationDoneRows.includes(task.taskRow.title.toLowerCase())
  if (destinationDoneRows.includes(taskRow?.title.toLowerCase()) && isGroupedByStatus.value && !shouldPreventCompleting) {
    const { id, bookId, completedAt } = task
    if (!completedAt) {
      complete({ id, bookId, task, completedAt: new Date() })
    }
  }
}

function saveName () {
  if (title.value.trim() !== '' && title.value !== props.item.title) {
    updateRow({
      id: props.item.id,
      title: title.value.trim().slice(0, 28),
      bookId: props.item.bookId
    })
  }
}

function updateColor (value) {
  updateRow({
    id: props.item.id,
    color: value,
    bookId: props.item.bookId
  })
}

function cancelEdit () {
  if (isEdit.value) {
    saveName()
    isEdit.value = false
  }
}

function deleteTaskRow () {
  deleteRow({
    id: props.item.id,
    bookId: props.item.bookId
  })
}

function toggleHover (value) {
  isHover.value = value
}
function addNewTemplate () {
  if (props.isCardView) return

  newTask('bottom')
}
</script>

<style lang="scss">
.my-sortable-ghost-task {
  &--card {
    height: v-bind(dynamicHeight);
  }
}

.force-fallback-light-task {
  min-height: v-bind(dynamicHeight);
}
</style>
