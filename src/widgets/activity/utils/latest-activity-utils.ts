import router from '@/router'
import { removeHTMLTags } from '@/core/helper-functions'
import { parseDate } from '@/plugins/filters'

export enum EBookUtils {
  pages = 'Pages',
  tasks = 'Tasks',
  chat = 'Chat',
  files = 'Files',
}

export const defaultHighlightClasses = ['font-medium', 'text-app-color', 'max-w-[300px]']

export const defaultLabelClasses = ['rounded-full', 'min-w-[30px]', 'h-23', 'text-11', 'px-5', 'font-medium', 'inline-flex', 'items-center', 'justify-center', 'w-[fit-content]', 'align-middle']

export const defaultActiveClasses = ['text-brand', 'cursor-pointer']

export const routerEventBuilder = (router, name: string, bookId: number | null, query?: Record<string, number | string>) => {
  router.push(bookId ? { name, params: { id: bookId }, query } : { name, query })
}

export const getActivityTime = (time: string) => {
  const { isMobile } = useGeneral()
  const date = new Date(time)
  const minutes = (Date.now() - date.getTime()) / 1000 / 60
  if (minutes < 1) {
    return 'now'
  } else if (minutes < 2) {
    return '1 min. ago'
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} min. ago`
  } else if (minutes / 60 < 2) {
    return '1 hour ago'
  } else if (minutes / 60 < 24) {
    return `${Math.floor(minutes / 60)} hours ago`
  } else if (minutes / 60 > 24 && minutes / 60 / 24 < 8) {
    if (Math.floor(minutes / 60 / 24) === 1) return `${Math.floor(minutes / 60 / 24)} day ago`
    return `${Math.floor(minutes / 60 / 24)} days ago`
  }

  return isMobile.value ? parseDate(time, 'D MMM') : parseDate(time, 'D MMM YYYY')
}

function addCreator (el: HTMLParagraphElement, creatorId: number) {
  const { members } = useTeam()

  const creator = members.value.find((e) => e.userId === creatorId)
  const creatorSpan = document.createElement('span')

  creatorSpan.innerHTML = `${creator?.firstName} ${creator?.lastName} `
  creatorSpan.classList.add(...defaultHighlightClasses)

  el.appendChild(creatorSpan)
}

async function addTaskRedirect (el: HTMLParagraphElement, task: ITask) {
  const { setModalTask, getTasks, tasks } = useTask()

  const taskSpan = document.createElement('span')

  taskSpan.addEventListener('click', async () => {
    await getTasks({ bookIds: [task.bookId] })
    const modalTask = tasks.value.find(e => e.id === task.id)

    routerEventBuilder(router, 'TaskBoardTeam', task.bookId, { taskId: task.id })
    setModalTask(modalTask)
  })
  taskSpan.innerHTML = ` ${removeHTMLTags(task?.title || '')}`
  taskSpan.classList.add(...defaultActiveClasses)

  el?.appendChild(taskSpan)
}

// Function builder for creating dynamic HTMlElement by configuration arrays
export function createActivityConfigBuilder (config: TActivityConfigElement[]) {
  return function ({ activity, ref, router, creatorId, isPrivate, task, truncateText }: IActivityData) {
    const p = document.createElement('p')

    // Add the firstName and the lastName of the creator to the start of each message
    // this can be made optional if desired, just put one more param to our IActivityData for specifying it for instances like task, book, inbox
    // or put one more param to our config for specifying it for smaller instances like priority, assigne, bookDate etc...
    addCreator(p, creatorId)

    // by forEaching our configuration array, we create a dynamic HTMLelement and put it into our ref
    config.forEach((elementConfig) => {
      // we can specify tag with "tagName" key
      const element = document.createElement(elementConfig.tagName ? elementConfig.tagName : 'span')
      element.innerHTML = elementConfig.value(activity)

      // we can add some logic by click with key "event"
      if (elementConfig.event) {
        element.addEventListener('click', () => {
          elementConfig.event(router)
        })
      }
      // we can add dynamic styles by key "classes" with an array of strings for each elementConfig
      if (Array.isArray(elementConfig.classes)) {
        element.classList.add(...elementConfig.classes)
      }

      // adding styles for labels
      if (elementConfig?.isLabel && elementConfig.styles) {
        element.style.border = elementConfig.styles.border
        element.style.background = elementConfig.styles.background
        element.style.color = elementConfig.styles.textColor
        element.style.boxShadow = elementConfig.styles.shadow
      }

      p?.appendChild(element)
    })

    if (truncateText) p.classList.add('truncate')

    // for private inbox messagaes, witch are relates to you, and are showing in 'About you' section
    // (you are subscribed on the task)
    if (isPrivate) addTaskRedirect(p, task)

    ref.appendChild(p)
  }
}
