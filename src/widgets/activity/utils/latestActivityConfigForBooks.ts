/* eslint-disable no-prototype-builtins */
import {
  defaultHighlightClasses,
  defaultActiveClasses,
  EBookUtils,
  createActivityConfigBuilder,
  routerEventBuilder
} from '@/widgets/activity/utils/latest-activity-utils'
import { removeHTMLTags } from '@/core/helper-functions'
import { statuses } from '@/pages/file-manager/utils/file-manager-utils'

const addRemoveTextInfo = { value: (activity) => activity.action === 'create' ? 'added ' : 'removed ' }

const toolActivities = Object.fromEntries(
  Object.entries(EBookUtils).map(([key, value]) => [
    key,
    [
      { value: (activity) => activity.action === 'create' ? 'added the tool ' : 'removed the tool ' },
      { value: () => `"${value}" `, classes: defaultHighlightClasses },
      { value: (activity) => `${activity.action === 'create' ? 'to' : 'from'} the project.` }
    ]
  ])
)

const deleteMap = {

  'project-delete': [
    { value: () => 'deleted the note ' },
    { value: (activity) => `${activity.customValue}.`, classes: defaultHighlightClasses }
  ]
}

const createMap = (activity) => {
  return {
    'project-create': [
      { value: () => 'created a new note called ' },
      {
        value: (activity) => `${activity.customValue}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(router, 'TeamBook', activity.data.bookId, { page: activity.data.projectId })
      }
    ]
  }
}

const titleMap = (activity) => {
  return {

    projectId: [
      { value: () => 'changed the title of a note from ' },
      { value: (activity) => `${activity.additionValue} `, classes: defaultHighlightClasses },
      { value: () => 'to ' },
      {
        value: (activity) => `${activity.value} `,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(router, 'TeamBook', activity.data.bookId, { page: activity.data.projectId })
      }
    ],
    default: [
      { value: () => 'updated the title ' },
      { value: (activity) => `${activity.customValue} `, classes: defaultHighlightClasses },
      { value: () => 'of the project.' }
    ]
  }
}

const textCommentMap = (activity) => {
  return {
    attachmentId: [
      { value: () => 'commented in the file ' },
      {
        value: (activity) => `${activity.value} `,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => {
          routerEventBuilder(router, 'FileManagerTeam', activity.data.bookId, { messageId: activity.data.messageId, fileId: activity.data.attachmentId })
        }
      }
    ],
    default: [
      { value: () => 'left a chat message in the group chat ' },
      {
        value: (activity) => `${removeHTMLTags(activity.value)}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(router, 'Chat', activity.data.bookId, { messageId: activity.data.messageId, bookId: activity.data.bookId })
      }
    ]
  }
}

const datesMap = (action: TDefaultActivityAction, title: string) => {
  const actions = {
    create: 'added dates to the project ',
    update: 'updated the dates of the project ',
    delete: 'removed the dates from the project '
  }

  return [
    { value: () => `${actions[action]}` },
    { value: () => `${title}.`, classes: defaultHighlightClasses }
  ]
}

export default function lastActivitiesForBooks (activity: IBookActivity['activity']) {
  const { books } = useBook()
  const { members } = useTeam()
  const book = books.value.find(e => e.id === activity.data.bookId)
  const assignedUser = members.value.find((e) => e.userId === activity.data?.value)

  const activityBookConfigs: Record<string, TActivityConfigElement[]> = {
    ...deleteMap,
    ...createMap(activity),
    ...toolActivities,
    title: titleMap(activity)[Object.keys(titleMap(activity)).find(item => activity.data.hasOwnProperty(item))] || titleMap(activity).default,
    name: [
      { value: () => 'uploaded a new file ' },
      {
        value: (activity) => `${activity.value}.`,
        event: (router) => routerEventBuilder(router, 'FileManagerTeam', activity.data.bookId, { fileId: activity.data.attachmentId }),
        classes: defaultActiveClasses
      }
    ],
    bookLinkId: [
      addRemoveTextInfo,
      { value: (activity) => `a link ${activity.action === 'create' ? 'to' : 'from'} the project ` },
      { value: (activity) => `${activity.customValue}.`, classes: defaultHighlightClasses }
    ],
    dates: datesMap(activity.data.action, book?.title),
    subTitle: [
      { value: () => 'updated the description of the project ' },
      { value: () => `${book.title}.`, classes: defaultHighlightClasses }
    ],
    relatedUserId: [
      addRemoveTextInfo,
      { value: () => `${assignedUser?.firstName} ${assignedUser?.lastName} `, classes: defaultHighlightClasses },
      { value: (activity) => `${activity.action === 'create' ? 'to' : 'from'} the project` }
    ],
    defaultFilter: [
      { value: () => 'saved a filter setup as the new default view for tasks in ' },
      {
        value: (activity) => `${activity.customValue}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(router, 'TaskBoardTeam', activity.data.bookId)
      }],
    body: [
      { value: () => 'made changes to the note ' },
      {
        value: (activity) => `${activity.customValue}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(router, 'TeamBook', activity.data.bookId, { page: activity.data.projectId })
      }
    ],
    text: textCommentMap(activity)[Object.keys(textCommentMap(activity)).find(item => activity.data.hasOwnProperty(item) &&
      activity.data[item])] ||
      textCommentMap(activity).default,
    clientId: [
      addRemoveTextInfo,
      { value: (activity) => `a ${activity.action === 'delete' ? '' : 'new'} observer ` },
      { value: (activity) => `${activity.action === 'create' ? 'to' : 'from'} the project ` },
      { value: (activity) => `${activity.customValue}.`, classes: defaultHighlightClasses }
    ],
    resolvedAt: [
      { value: () => 'resolved a comment in ' },
      {
        value: (activity) => `${removeHTMLTags(activity.customValue)}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => {
          routerEventBuilder(router, 'FileManagerTeam', activity.data.bookId, { fileId: activity.data.attachmentId, annotationId: activity.data.annotationId, messageId: activity.data.messageId })
        }
      }
    ],
    'annotation-create': [
      { value: () => 'annotated the ' },
      {
        value: (activity) => `${removeHTMLTags(activity.customValue)}.`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => routerEventBuilder(
          router,
          'FileManagerTeam',
          activity.data.bookId,
          { fileId: activity.data.attachmentId, annotationId: activity.data.annotationId, messageId: activity.data.messageId }
        )
      }
    ],
    status: [
      { value: () => 'changed the status of the ' },
      {
        value: (activity) => `${activity.customValue}`,
        classes: defaultActiveClasses,
        tagName: 'button',
        event: (router) => {
          return routerEventBuilder(
            router,
            'FileManagerTeam',
            activity.data.bookId,
            { fileId: activity.data.attachmentId }
          )
        }
      },
      { value: () => ' file to ' },
      {
        value: (activity) => `${statuses[activity.value]?.name ? statuses[activity.value]?.name : 'Set status'}.`,
        classes: defaultHighlightClasses
      }
    ],
    version: [
      { value: () => 'added new version ' },
      {
        value: (activity) => `${activity.value}`
      },
      { value: () => ' for the ' },
      {
        value: () => 'file',
        tagName: 'button',
        event: (router) => {
          return routerEventBuilder(
            router,
            'FileManagerTeam',
            activity.data.bookId,
            { fileId: activity.data.attachmentId }
          )
        },
        classes: defaultActiveClasses
      }
    ]
  }

  return Object.fromEntries(
    Object.entries(activityBookConfigs).map(([key, config]) => [key, createActivityConfigBuilder(config)])
  )
}
