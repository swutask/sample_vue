<template>
  <div
    v-if="filteredTasks.items.length && isMounted"
    :class="[
      (show && filteredTasks.items.length) ? 'md:mt-30 mt-20' : 'mt-[-8px]',
    ]"
    class="first:!mt-16"
  >
    <div>
      <div class="flex items-center px-5">
        <div class="font-semibold text-14 cursor-pointer" @click="toggle">
          <div
            v-if="groupedBy === 'Date' || groupedBy === 'Priority' || groupedBy === 'Estimate'"
            class="h-40 flex items-center select-none"
          >
            <span>
              {{ groupedBy === 'Priority' ? (name as IExistingPriority).text : (name || 'Unsorted') }}
            </span>
          </div>

          <div v-if="groupedBy === 'Status'" class="flex items-center">
            <div
              class="flex pr-15 pl-8 py-7 mb-10 rounded-full bg-opacity-10 mr-10"
              :style="{ backgroundColor: background }"
            >
              <div class="flex items-center mr-5">
                <NewTaskRowColor
                  class="no-drag"
                  :width="12"
                  disabled
                  :height="12"
                  :color="rowColorByStatus"
                  :position="rowTitleByStatus.length < 10 ? 'left-0' : 'left-1/2 -translate-x-1/2'"
                />
              </div>

              <p>{{ rowTitleByStatus }}</p>
            </div>
          </div>

          <div
            v-if="groupedBy === 'Space' || groupedBy === 'Labels' || groupedBy === 'Assignee'"
            class="flex items-center h-40"
          >
            <BookLabel
              v-if="groupedBy === 'Space' && currentBook"
              background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
              class="truncate cursor-pointer text-14 py-5 mr-5"
              :bookId="currentBook.id"
              :customStyle="{ fontSize: 'font-semibold', defaultIcon: 'w-18 h-18', iconHover: '' }"
              :has-border="false"
              size="18"
            />

            <div
              v-if="groupedBy === 'Labels' && name"
              class="flex items-center rounded-full px-7 font-medium flex-shrink-0
                     tracking-small !h-24 !min-w-[35px] mr-10 text-12"
              :class="[!!currentTag?.name ? 'min-w-[30px] h-30' : 'w-20 h-20']"
              :style="[tagColor(currentTag?.color)]"
            >
              <span v-if="currentTag?.name" class="truncate">{{ currentTag?.name }}</span>
            </div>

            <UserBadge
              v-if="groupedBy === 'Assignee' && currentMember?.id"
              :first-name="currentMember.firstName"
              :last-name="currentMember.lastName"
              :avatarUrl="currentMember.avatar?.url"
              :color="currentMember.color"
              :size="25"
              fontSize="!text-12"
              class="mb-4 text-14 items-center"
            />

            <p v-if="!name">
              Unsorted
            </p>
          </div>
        </div>

        <span
          class="text-13 text-grey-275 font-normal leading-5"
          :class="[
            groupedBy === 'Assignee' ? 'mb-4 ml-2' : 'ml-5',
            {'mb-10' : groupedBy === 'Status'}
          ]"
        >
          ({{ filteredTasks.all.length }})
        </span>

        <div class="flex items-center ml-auto">
          <p v-if="groupedBy === 'Date' && name === 'Today'" class="text-grey-250 mr-10 text-14">{{ dayjs().format('dddd D[th] MMMM') }}</p>
          <i
            class="cursor-pointer text-18 text-grey-250 anim-color hover:text-app-color"
            :class="show ? 'icon-visibility' : 'icon-visibility_off'"
            @click="toggle"
          />
        </div>
      </div>

      <TransitionExpand>
        <div
          v-if="show"
          class="px-2"
          :class="show && filteredTasks.items.length ? 'mb-30' : 'mb-0'"
        >
          <div v-for="(item, idx) in filteredTasks.items" :key="item.id">
            <ItemObserver needToWatchComponentUpdating>
              <TodayItem
                :task="item"
                :index="idx"
                :sortedBy="groupedBy"
                :showOnTask="showOnTask"
                :completedFilter="completedFilter"
                :name="name"
                :membersFilter="membersFilter"
              />
              <template #placeholder>
                <div
                  class="h-46 w-full"
                />
              </template>
            </ItemObserver>
          </div>
          <div
            v-if="((name === 'Upcoming' || name === 'No due date' || name === 'Unsorted') && filteredTasks.all.length > 20)"
            class="flex items-center mt-10"
          >
            <p
              class="flex items-center cursor-pointer text-grey-250 text-14 hover:text-grey-1200 anim-color"
              @click="toggleShowMore"
            >
              <i class="icon-arrow-to-top mr-5" :class="showMore ? '' : 'transform rotate-180'" />
              {{ showMore ? 'Show less' : 'Show more' }}
            </p>
          </div>
        </div>
      </TransitionExpand>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tagColor } from '@/plugins/filters'
import localStorageService from '@/core/local-storage'

import TransitionExpand from '@/components/shared/TransitionExpand'
import { getAssignedSubTasks } from '../utils'
import { formatDate } from '@/core/helper-functions'
import dayjs from 'dayjs'
import type { IExistingPriority } from '@/core/priority'

const props = defineProps<{
  name: string | number | object | IExistingPriority | ITaskRow | null
  filteredTags: ITag
  groupedBy: string
  index: number
  membersFilter?: ITeamMember[]
  completedFilter: IShowCompletedFilter
  showOnTask: IShowOnTaskObj
}>()

const { tasks } = useTask()
const { members } = useTeam()
const { books } = useBook()
const { user } = useProfile()
const isMounted = ref(false)
const show = ref(true)
const showMore = ref(false)
const background = computed(() => (props.name as ITaskRow)?.color ? `#${(props.name as ITaskRow).color.toString(16)}18` : '#FAFAFA10')
const rowTitleByStatus = ref((props.name as ITaskRow)?.title)
const rowColorByStatus = ref((props.name as ITaskRow)?.color)

const currentBook = computed(() => books.value.find(b => b.id === +props.name))
const currentMember = computed(() => members.value.find(b => b.id === +props.name))
const currentTag = computed(() => Object.values(props.filteredTags).flat().find(e => e.id === +props.name))

const filteredTasks = computed(() => {
  const date = dayjs().format('YYYY-MM-DD')
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')

  const sortedItems = sortAndFilterItems(tasks.value, date, tomorrow)

  if (shouldLimitItems(props.name as string)) {
    return { all: sortedItems, items: showMore.value ? sortedItems : sortedItems.slice(0, 20) }
  }

  return { all: sortedItems, items: sortedItems }
})

function checkSubtasks (task: ITask) {
  if (
    props.membersFilter?.length === members.value?.length || // check if Everyone selected in the filter
    task.subTask?.length === 0 || // check if task has subtasks
    task.teamMembers?.some(m => m.userId === user.value.id) || // If user is assigned to task, we don`t need to check subtasks
    task.teamMembers.some(m => props.membersFilter.some(e => e.userId === m.userId)) // If user from filter is assigned to task, we don`t need to check subtasks
  ) {
    return true
  }

  return getAssignedSubTasks(task, props.completedFilter, props.membersFilter).length > 0
}

function sortAndFilterItems (items: ITask[], date: string, tomorrow: string) {
  return items
    .filter(item => props.groupedBy === 'Date'
      ? checkSubtasks(item) && !item.isSample && item.taskRow && getConditionForDateGrouping(item, props.name, date, tomorrow)
      : checkSubtasks(item) && !item.isSample && item.taskRow && getConditionForGroupBy(item)
    )
}

function shouldLimitItems (name: string) {
  return ['Upcoming', 'No due date', 'Unsorted'].includes(name)
}

onMounted(() => {
  isMounted.value = true
  const storage = localStorageService.getItem('todayHiddenRowsV2')

  if (props.groupedBy === 'Status') {
    show.value = !storage?.[user.value.id]?.some((item: string) => item === (props.name as ITaskRow).title)
  } else {
    show.value = !storage?.[user.value.id]?.includes(props.name)
  }
})

function getConditionForGroupBy (task: ITask) {
  const conditionMap = {
    Status: (props.name as ITaskRow)?.title === task.taskRow?.title,
    Space: task.bookId === +props.name,
    Priority: task.urgentStatus === (props.name as IExistingPriority)?.id,
    Labels: props.name === null ? task.taskTags.length === 0 : task.taskTags?.some((e) => e.id === +props.name),
    Assignee: props.name === null ? task.teamMembers.length === 0 : task.teamMembers?.some((e) => e.id === +props.name),
    Estimate: props.name === null ? !task.storyPoints : task.storyPoints === parseInt(props.name as string)
  }

  return conditionMap[props.groupedBy]
}

function getConditionForDateGrouping (task: ITask, name: any, date: string, tomorrow: string) {
  const assignedSubTasks = getAssignedSubTasks(task, props.completedFilter, props.membersFilter) || []

  const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day')

  const conditions = {
    'No due date': !task?.endDate,
    Overdue: (task && task.endDate < date) || assignedSubTasks.some(s => s.endDate < date),
    'Currently in progress': task && task.startDate <= date && task.endDate > date,
    Today: (task && task.endDate === date) ||
          assignedSubTasks.some(s => s.endDate === date),
    Tomorrow: (task && (task.startDate === tomorrow || (!task.startDate && task.endDate === tomorrow))) ||
          assignedSubTasks.some(s => (s.startDate === tomorrow || (!s.startDate && s.endDate === tomorrow))),
    'Later this week': (task.endDate > date && task.endDate !== date) &&
      ((task && task.startDate
        ? task.startDate > tomorrow && task.endDate <= formatDate(endOfCurrentWeek)
        : task.endDate <= formatDate(endOfCurrentWeek)) ||
      (assignedSubTasks.some(s => s.startDate
        ? s.startDate > tomorrow && s.endDate < formatDate(endOfCurrentWeek)
        : s.endDate < formatDate(endOfCurrentWeek)))),
    Upcoming: (task.startDate > tomorrow && task.endDate > formatDate(endOfCurrentWeek)) ||
      assignedSubTasks.some(s => s.startDate
        ? s.startDate > formatDate(endOfCurrentWeek)
        : s.endDate > formatDate(endOfCurrentWeek))
  }

  return conditions[name]
}

function toggle () {
  show.value = !show.value
  const storage: TIndexedObject<any[]> = localStorageService.getItem('todayHiddenRowsV2') || {}
  const currentUserStorage = storage[user.value.id] || []

  let key = props.name

  if (props.groupedBy === 'Status') {
    key = (props.name as ITaskRow).title
  }

  if (show.value) {
    storage[user.value.id] = currentUserStorage.filter(i => i !== key)
  } else {
    storage[user.value.id] = [...currentUserStorage, key]
  }

  localStorageService.setItem('todayHiddenRowsV2', storage)
}

function toggleShowMore () {
  showMore.value = !showMore.value
}
</script>
