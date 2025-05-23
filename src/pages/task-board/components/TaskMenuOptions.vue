<template>
  <DropdownModule
    ref="dropdownRef"
    :width="150"
    topPosition="30px"
    :contentHeight="415"
    zIndex="z-[1000]"
    background="bg-primary dark:bg-grey-110"
    defaultStyles
    isAutoMenuPosition
  >
    <template #button>
      <div />
    </template>

    <ButtonModule
      v-if="!isClient"
      text="Complete task"
      prefix="icon-check-circle-outline text-16"
      class="p-10 w-full group-scope text-13"
      @click="completeTask"
    />

    <div class="divider my-2" />

    <template v-if="!isClient">
      <SelectTaskRow
        v-if="route.name === 'TaskBoardTeam'"
        :ref="(e) => modalsRefs[0] = e"
        :task="task"
        customClasses="rounded-6 py-4 px-7 text-[12.5px]"
        :bookId="task.bookId"
        :disabled="isClient"
        :rows="rows"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @select="selectRow"
        @click.stop="closeAll(0)"
      >
        <template #button>
          <ButtonModule
            text="Status"
            prefix="icon-status text-15 mr-13"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </SelectTaskRow>

      <TaskAssignMember
        :ref="(e) => modalsRefs[1] = e"
        class="text-12"
        :task="task"
        :assignedMembers="task.teamMembers || []"
        :disabled="isClient"
        :bookId="task.bookId"
        fontSize="!text-9"
        iconSize="text-18"
        :isTeleported="false"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @click.stop="closeAll(1)"
      >
        <template #button>
          <ButtonModule
            text="Assignee"
            prefix="icon-mention-member text-15 mr-13"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </TaskAssignMember>

      <TaskDateForTaskMenu
        :ref="(e) => modalsRefs[2] = e"
        :current-date="task.endDate"
        :isTeleported="false"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @toggleBothDates="toggleBothDates"
        @click.stop="closeAll(2)"
      >
        <template #button>
          <ButtonModule
            text="Due date"
            prefix="icon-add-date text-15 mr-13"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </TaskDateForTaskMenu>

      <Urgency
        :ref="(e) => modalsRefs[3] = e"
        :disabled="isClient"
        :task="task"
        zIndex="z-9999"
        class="w-full cursor-pointer"
        :isTeleported="false"
        positionMenu="next-to"
        :dropdownClasses="dropdownClasses"
        @update:modelValue="dropdownRef.close()"
        @click.stop="closeAll(3)"
      >
        <template #button>
          <ButtonModule class="p-10 w-full group-scope text-13">
            <div class="flex items-center w-full">
              <UrgencyIcon
                :iconSize="14"
                :type="9999"
                class="mr-15"
              />
              <p>Priority</p>
              <i class="icon-arrow-top rotate-90 ml-auto" />
            </div>
          </ButtonModule>
        </template>
      </Urgency>

      <Reminder
        :ref="(e) => modalsRefs[4] = e"
        :task="task"
        class="w-full"
        :isTeleported="false"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @click.stop="closeAll(4)"
      >
        <template #button>
          <ButtonModule
            text="Reminder"
            prefix="icon-alarm text-15 mr-15"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </Reminder>

      <TagsModal
        v-if="route.name === 'TaskBoardTeam'"
        :ref="(e) => modalsRefs[5] = e"
        :selected-tags="task.taskTags"
        :tags="tags"
        :disabled="isClient"
        isAttributeDropdown
        isModalView
        :isTeleported="false"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @blockHotKey="blockHotKey"
        @toggleTag="handleToggleTaskTag"
        @click.stop="closeAll(5)"
      >
        <template #button>
          <ButtonModule
            text="Labels"
            prefix="icon-label text-15 mr-15"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </TagsModal>

      <StoryPoints
        :ref="(e) => modalsRefs[6] = e"
        :task="task"
        positionMenu="right"
        :isTeleported="false"
        positionDirection="next-to"
        :dropdownClasses="dropdownClasses"
        @click.stop="closeAll(6)"
      >
        <template #button>
          <ButtonModule
            text="Estimate"
            prefix="icon-story-points text-15 mr-15"
            suffix="icon-arrow-top rotate-90 ml-auto"
            class="p-10 w-full group-scope text-13"
          />
        </template>
      </StoryPoints>

      <div class="divider my-2" />
    </template>

    <ButtonModule
      text="Copy link"
      prefix="icon-copy-link mr-15"
      class="p-10 w-full group-scope text-13"
      @click="onCopy"
    />
    <ButtonModule
      v-if="!isClient"
      text="Duplicate"
      prefix="icon-duplicate mr-15"
      class="p-10 w-full group-scope text-13"
      @click="duplicateTask"
    />
    <ButtonModule
      v-if="!isClient"
      text="Delete"
      prefix="icon-delete mr-15"
      class="p-10 w-full group-scope text-13"
      @click="handleDeleteTask"
    />
  </DropdownModule>
</template>
<script setup lang="ts">
import completeSound from '@/assets/sounds/complete-v2.mp3'

const props = defineProps<{
  task: ITask
}>()

const route = useRoute()

const {
  rows,
  tags: storedTags,
  copyLink,
  deleteTask,
  duplicate,
  complete,
  updateTask,
  toggleTaskTag,
  handleUpdateTask,
  getTasksForTaskBoardPageWithFilters
} = useTask()

const { isClient } = useProfile()
const { blockHotKey } = useGeneral()

const dropdownRef = ref()
const modalsRefs = ref([])

const tags = computed(() => storedTags.value.filter(tag => tag.bookId === props.task.bookId))

const isOpened = computed(() => dropdownRef.value?.isDropdownVisible)

const dropdownClasses = '!shadow'

function duplicateTask () {
  duplicate({
    id: props.task.id,
    bookId: props.task.bookId
  })
  dropdownRef.value.close()
}

function handleDeleteTask () {
  deleteTask({ id: props.task.id, bookId: props.task.bookId })
  dropdownRef.value.close()
}

function onCopy () {
  copyLink({ bookId: props.task.bookId, taskId: props.task.id })
  dropdownRef.value.close()
}

function open (e: MouseEvent) {
  document.body.click()
  dropdownRef.value.toggle(true, e)
}

async function completeTask () {
  const completedAt = props.task.completedAt ? null : new Date()

  if (completedAt) {
    new Audio(completeSound).play()
  }

  await complete({
    id: props.task.id,
    bookId: props.task.bookId,
    completedAt,
    task: props.task
  })

  dropdownRef.value.close()
}

function toggleBothDates (value) {
  updateTask({
    id: props.task.id,
    bookId: props.task.bookId,
    startDate: value.start,
    endDate: value.end,
    rrule: value.rrule
  })

  handleUpdateTask({
    ...props.task,
    bookId: props.task.bookId,
    startDate: value.start,
    endDate: value.end,
    rrule: value.rrule
  })

  dropdownRef.value.close()

  if (route.name === 'TaskBoardTeam') {
    getTasksForTaskBoardPageWithFilters(+route.params.id)
  }
}

function handleToggleTaskTag ({ tag, isSelected }) {
  let taskTags = props.task.taskTags || []

  if (isSelected) {
    taskTags = taskTags.filter(t => t.id !== tag.id)
  } else {
    taskTags.push(tag)
  }

  toggleTaskTag({
    tag,
    taskId: props.task.id,
    isSelected,
    bookId: props.task.bookId
  })

  handleUpdateTask({
    ...props.task,
    taskTags
  })
}

function selectRow (value: ITaskRow) {
  updateTask({
    id: props.task.id,
    order: 0,
    taskRowId: value.id,
    bookId: props.task.bookId
  })

  handleUpdateTask({
    id: props.task.id,
    order: 0,
    taskRow: value,
    taskRowId: value.id
  })

  const destinationDoneRows = ['done', 'completed']
  const shouldPreventCompleting = destinationDoneRows.includes(props.task.taskRow.title.toLowerCase())

  if (destinationDoneRows.includes(value.title.toLowerCase()) && !shouldPreventCompleting) {
    completeTask()
  }
}

function closeAll (key: number) {
  modalsRefs.value.forEach((item, index) => {
    if (index !== key) {
      item?.close()
    }
  })
}

defineExpose({
  open,
  isOpened
})
</script>
