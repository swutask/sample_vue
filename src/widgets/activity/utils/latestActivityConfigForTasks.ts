import { existingPriorities } from '@/core/priority'
import {
  defaultHighlightClasses,
  createActivityConfigBuilder,
  defaultLabelClasses,
  defaultActiveClasses
} from '@/widgets/activity/utils/latest-activity-utils'
import { prepareDate, removeHTMLTags } from '@/core/helper-functions'
import { tagColorForLatestActivity } from '@/plugins/filters'
import dayjs from 'dayjs'

const datesTextInfo = (action) => {
  const isStartEqualEnd = action.value.startDate === action.value.endDate
  const removeCondition = action.additionValue?.startDate === action.additionValue?.endDate
  const textMap = {
    create: `added ${isStartEqualEnd ? 'dates' : 'due date'}`,
    update: `changed the ${isStartEqualEnd ? 'dates' : 'due date'} to`,
    delete: `removed the ${removeCondition ? 'dates' : 'due date'}`
  }
  return textMap[action.action]
}

const assigneeInfo = (action, isCreatorEqualRelatedUser) => {
  return `${isCreatorEqualRelatedUser ? 'was ' : ''}${action === 'create' ? 'assigned' : 'removed'} `
}

export default function lastActivitiesForTask (activity: ITaskActivityDescription) {
  const { members } = useTeam()
  const { getTaskById } = useTask()
  const creator = members.value.find((e) => e.userId === activity.creatorId)
  const assignedUser = members.value.find((e) => e.userId === activity.data?.value)
  const isCreatorEquelRelatedUser = assignedUser?.userId === creator?.userId

  const activityTypeConfigs: Record<string, TActivityConfigElement[]> = {
    urgentStatus: [
      { value: (activity) => activity?.action !== 'delete' ? 'changed the priority to ' : 'removed the ' },
      { value: (activity) => `${existingPriorities.find(e => e.id === activity?.value)?.text}.`, classes: defaultHighlightClasses }
    ],
    remindAt: [
      { value: () => 'Reminder ⏰ ' },
      {
        value: (activity) => `${removeHTMLTags(activity.taskTitle)}`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: () => { getTaskById(activity.data.taskId) }
      },
      {
        value: (activity: ITaskActivityDescription['data']) => `Reminder was set for ${dayjs(activity.remindAt).format('D MMM, ddd hh:mm A')}`,
        classes: ['block', 'font-normal', 'text-grey-950', 'text-11']
      }
    ],
    taskRowName: [
      { value: () => 'changed the status from ' },
      { value: (activity) => `"${activity.additionValue}"`, classes: defaultHighlightClasses },
      { value: () => ' to ' },
      { value: (activity) => `"${activity.value}"`, classes: defaultHighlightClasses }
    ],
    'task-create': [{ value: () => 'created this task.' }],
    messageId: [{ value: () => 'added a comment.' }],
    relatedUserId: [
      { value: (activity) => assigneeInfo(activity.action, isCreatorEquelRelatedUser) },
      { value: () => isCreatorEquelRelatedUser ? '' : `${assignedUser?.firstName} ${assignedUser?.lastName} `, classes: defaultHighlightClasses },
      { value: (activity) => `${activity.action === 'create' ? 'to' : 'from'} this task` }
    ],
    tag: [
      { value: (activity) => activity.action === 'create' ? 'added the label ' : 'removed the label ' },
      {
        value: (activity) => activity?.[activity.action === 'create' ? 'value' : 'customValue'].name
          ? activity?.[activity.action === 'create' ? 'value' : 'customValue']?.name
          : '',
        classes: defaultLabelClasses,
        isLabel: true,
        styles: tagColorForLatestActivity(activity.data.action === 'create' ? activity.data.value?.color : activity.data.customValue?.color)
      },
      { value: (activity) => ` ${activity.action === 'create' ? 'to' : 'from'} this task.` }
    ],
    attachmentCoverImageId: [
      { value: (activity) => activity.action === 'create' ? 'added a cover image.' : 'removed the cover image.' }
    ],
    title: activity.data.isSubtask
      ? [
        { value: () => 'updated the subtask ' },
        { value: (activity) => `${removeHTMLTags(activity.value)}.`, classes: defaultHighlightClasses }
      ]
      : [
        { value: () => 'changed the title to ' },
        { value: (activity) => `${removeHTMLTags(activity.value)}.`, classes: defaultHighlightClasses }
      ],
    subTitle: [{ value: () => 'updated the subtitle of this task.' }],
    additionalInfo: [{ value: () => 'updated the description of this task.' }],
    'subTask-create': [
      { value: () => 'added the subtask ' },
      { value: (activity) => `${removeHTMLTags(activity.customValue)}.`, classes: defaultHighlightClasses }
    ],
    'subTask-delete': [
      { value: () => 'removed the subtask ' },
      { value: (activity) => `${removeHTMLTags(activity.customValue)}.`, classes: defaultHighlightClasses }
    ],
    completedAt:
      [
        { value: (activity) => `${activity.action === 'delete' ? 're-opened' : 'completed'} ` },
        { value: (activity: ITaskActivityDescription['data']) => `${activity.isSubtask ? 'the subtask ' : 'this task'} ` },
        {
          value: (activity: ITaskActivityDescription['data']) => `${activity.isSubtask ? `${removeHTMLTags(activity.customValue)}` : ''}`,
          classes: defaultHighlightClasses
        }
      ],
    dates: [
      { value: (activity) => `${datesTextInfo(activity)} ` },
      {
        value: (activity) => `${
          activity.action === 'delete'
            ? ''
            : prepareDate(activity.value.startDate, activity.value.endDate)}.`,
        classes: defaultHighlightClasses
      }
    ]
  }

  return Object.fromEntries(
    Object.entries(activityTypeConfigs).map(([key, config]) => [key, createActivityConfigBuilder(config)])
  )
}
