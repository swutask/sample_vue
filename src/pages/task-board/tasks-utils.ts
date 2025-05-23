import { formatDate, getDueDateOptions } from '@/core/helper-functions'
import { EShowCompletedStatuses } from '@/types/enum'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

export const recurringData = [
  { type: RRule.DAILY, text: 'Daily' },
  { type: RRule.WEEKLY, text: 'Weekly' },
  { type: RRule.WEEKLY, text: 'Bi-Weekly' },
  { type: RRule.MONTHLY, text: 'Monthly' },
  { type: RRule.YEARLY, text: 'Yearly' }
]

export const storyPointsData = [
  { id: 1, text: '1 point' },
  { id: 2, text: '2 points' },
  { id: 3, text: '3 points' },
  { id: 5, text: '5 points' },
  { id: 8, text: '8 points' }
]

export const groupByData = [
  { id: 'Status', label: 'Status' },
  { id: 'Labels', label: 'Labels' },
  { id: 'Priority', label: 'Priority' },
  { id: 'Assignee', label: 'Assignees' },
  { id: 'Date', label: 'Due date' },
  { id: 'Space', label: 'Space' },
  { id: 'Estimate', label: 'Estimate' }
]

export const sortByMapForToday = ['Title', 'Last updated', 'Last created',
  'Due date', 'Priority', 'Assignee', 'Labels', 'Estimate']

export const sortByMap = ['Manual', 'Title', 'Last updated', 'Last created',
  'Due date', 'Priority', 'Assignee', 'Labels', 'Estimate']

export const findDateRange = (dateFilter: IDateFilter[]) => {
  const filterText = dateFilter?.map(item => item.text)

  const isAllSelected = filterText.includes('Overdue') && filterText.includes('Upcoming')

  if (!dateFilter || !filterText.length || isAllSelected) return null

  const dates = getDueDateOptions()
  const selectedRanges = filterText.map(option => dates[option])

  const startDate = Math.min(...selectedRanges.map(range => range.startDate))

  const endDate = Math.max(...selectedRanges.map(range => range.endDate))

  return {
    startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
    endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null
  }
}

export const initialFiltersForTasks = {

  showCompletedFilter: {
    label: 'All',
    val: 0
  },
  sortedBy: 'Manual',
  sortedDirection: 'ASC',
  groupBy: 'Status',
  search: '',
  tagsFilter: [],
  urgencyFilter: [],
  dateFilter: [],
  showOnTask: [
    { name: 'Labels', key: 'labels', width: 56.45, selected: true },
    { name: 'Assignee', key: 'assignee', width: 70.47, selected: true },
    { name: 'Priority', key: 'priority', width: 59.92, selected: true },
    { name: 'Due date', key: 'dueDate', width: 73, selected: true },
    { name: 'Comments', key: 'comments', width: 79.08, selected: true },
    { name: 'Attachments', key: 'attachments', width: 89.28, selected: false, isHidden: true },
    { name: 'Description', key: 'description', width: 82, selected: false, isHidden: true },
    { name: 'Subtitle', key: 'subtitle', width: 62.75, selected: true },
    { name: 'Image', key: 'image', width: 52.52, selected: true },
    { name: 'Estimate', key: 'storyPoints', width: 66, selected: true }
  ]
}

export const initialFiltersForToday = {
  ...initialFiltersForTasks,
  sortedBy: 'Due date',
  groupBy: 'Date',
  showCompletedFilter: {
    label: 'None',
    val: 3
  }
}

export const showCompletedOptions = (value: IShowCompletedFilter): IShowCompletedFilter => {
  switch (value.label) {
    case EShowCompletedStatuses.all: {
      return {}
    }

    case EShowCompletedStatuses.today: {
      const tomorrow = new Date()
      tomorrow.setDate((new Date()).getDate() + 1)

      return {
        completedAtFrom: formatDate(new Date()),
        completedAtTo: formatDate(tomorrow)
      }
    }

    case EShowCompletedStatuses.lastWeek : {
      const tomorrow = new Date()
      tomorrow.setDate((new Date()).getDate() + 1)

      const weekAgo = new Date()
      weekAgo.setDate((new Date()).getDate() - 7)

      return {
        completedAtFrom: formatDate(weekAgo),
        completedAtTo: formatDate(tomorrow)
      }
    }

    default: {
      return {
        withoutCompleted: true
      }
    }
  }
}

export const calendarAttrsForTaskRule = (recurringDates: Date[], pastDates: Date[], exdates: Date[]) => {
  return [
    {
      key: 'recurring',
      highlight: {
        contentClass: 'hover:!bg-black',
        class: 'hover:!bg-black',
        start: {
          contentClass: 'text-white !bg-transparent',
          class: 'bg-black !rounded-6 anim-color'
        }
      },
      dates: recurringDates
    },
    {
      highlight: {
        contentClass: 'hover:!bg-black',
        class: 'hover:!bg-black',
        start: {
          contentClass: 'text-white !bg-transparent',
          class: 'bg-black/[0.5] !rounded-6 anim-color'
        }
      },
      dates: pastDates,
      popover: {
        label: 'Past date'
      }
    },
    {
      highlight: {
        contentClass: 'hover:!bg-black',
        class: 'hover:!bg-black',
        start: {
          contentClass: 'text-white !bg-transparent',
          class: 'bg-event-pink/[0.7] !rounded-6 anim-color'
        }
      },
      dates: exdates,
      popover: {
        label: 'Deleted from recurring'
      }
    }
  ]
}
