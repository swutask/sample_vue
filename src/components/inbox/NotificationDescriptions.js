import { removeHTMLTags } from '@/core/helper-functions'

function navigateToSubTask (notification, router) {
  const query = { taskId: notification.task.parentId, highlight: notification.task.id }

  router.push({ name: 'TaskBoard', params: { team: notification.team.link, id: notification.book.id }, query })
}

function GOT_A_NEW_TASK ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')
  const span3 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span1.innerHTML = 'A '
  button.innerHTML = 'task'
  span2.innerHTML = 'has been assigned to you by '
  span3.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName}`

  span3.classList.add('font-semibold', 'text-app-color')
  button.classList.add('text-brand', 'text-left')

  function redirect () {
    if (notification.task?.parentId) return navigateToSubTask(notification, router)

    router.push({ name: 'TaskBoard', params: { id: notification.book.id }, query: { highlight: notification.task.id } })
  }

  button.addEventListener('click', redirect)

  p.appendChild(span1)
  p.appendChild(button)
  p.appendChild(span2)
  p.appendChild(span3)

  ref.appendChild(p)
}

function _mentionIn ({ notification, ref, router, buttonTitle, href, where }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName} `
  span1.innerHTML = 'mentioned you in the '
  button.innerHTML = buttonTitle
  span2.innerHTML = where

  span.classList.add('font-semibold', 'text-app-color')
  button.classList.add('text-brand', 'text-left')

  function redirect () {
    if (notification.task?.parentId) return navigateToSubTask(notification, router)

    router.push(href)
  }

  button.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(span1)
  p.appendChild(button)
  p.appendChild(span2)

  ref.appendChild(p)
}

function MENTIONED_IN_CHAT ({ notification, ref, router }) {
  const buttonTitle = notification.book.title
  const href = { name: 'Chat', params: { id: notification.book.id, team: notification.team.link }, query: { chatId: notification.chat.id } }
  const where = ' chat.'

  _mentionIn({ notification, ref, router, buttonTitle, href, where })
}

function MENTIONED_IN_PAGE ({ notification, ref, router }) {
  const buttonTitle = notification.project?.title
  const href = { name: 'TeamBook', params: { id: notification.book.id, team: notification.team.link }, query: { page: notification.project?.id } }
  const where = ' page.'

  _mentionIn({ notification, ref, router, buttonTitle, href, where })
}
function MENTIONED_IN_COMMENT () {
  // deprecated
}

function MENTIONED_IN_TASK ({ notification, ref, router }) {
  const buttonTitle = notification.task?.title
  const href = { name: 'TaskBoardTeam', params: { id: notification.book?.id, team: notification.team?.link }, query: { taskId: notification.task?.id } }

  const where = ' task.'

  _mentionIn({ notification, ref, router, buttonTitle, href, where })
}

function ASSIGNED_TO_TASK ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName} `
  span1.innerHTML = notification?.title === 19 ? 'unassigned you to from the ' : 'assigned you to the '
  button.innerHTML = notification.task?.title
  span2.innerHTML = ' task.'

  span.classList.add('font-semibold', 'text-app-color')
  button.classList.add('text-brand', 'text-left')

  const href = { name: 'TaskBoardTeam', params: { id: notification.book.id, team: notification.team.link }, query: { highlight: notification.task?.id } }

  function redirect () {
    if (notification.task?.parentId) return navigateToSubTask(notification, router)

    router.push(href)
  }

  button.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(span1)
  if (notification.task?.title) { p.appendChild(button) }
  p.appendChild(span2)

  ref.appendChild(p)
}

function ADDED_TO_A_NEW_SPACE ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName} `
  span1.innerHTML = 'added you to the '
  button.innerHTML = notification.book?.title
  span2.innerHTML = ' space.'

  span.classList.add('font-semibold', 'text-app-color')
  button.classList.add('text-brand', 'text-left')

  function redirect () {
    router.push({ name: 'TaskBoardTeam', params: { id: notification.book.id, team: notification.team.link } })
  }

  button.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(span1)
  if (notification.book?.title) { p.appendChild(button) }
  p.appendChild(span2)

  ref.appendChild(p)
}

function A_NEW_TEAM_MEMBER ({ notification, ref }) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  const span1 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName} `
  span1.innerHTML = 'joined the workspace.'

  span.classList.add('font-semibold', 'text-app-color')

  p.appendChild(span)
  p.appendChild(span1)

  ref.appendChild(p)
}

function A_SPACE_HAS_BEEN_REMOVED ({ notification, ref }) {
  ref.innerHTML = notification.message || ''
}

function ACTIVE_TOOLS ({ notification, ref }) {
  ref.innerHTML = notification.message || ''
}

function A_NEW_PAGE_WAS_CREATED ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const button2 = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')
  const span3 = document.createElement('span')

  const teamMember = notification.teamMember?.user.profile

  span.innerHTML = `${teamMember?.firstName} ${teamMember?.lastName} `
  span1.innerHTML = 'created a new page called '
  button.innerHTML = notification.project?.title

  span.classList.add('font-semibold', 'text-app-color')
  button.classList.add('text-brand', 'text-left')
  button2.classList.add('text-brand', 'text-left')

  function redirect (type = '') {
    if (type === 'page') {
      router.push({ name: 'TeamBook', params: { id: notification.book.id, team: notification.team.link }, query: { page: notification.project.id } })
    } else {
      router.push({ name: 'TaskBoardTeam', params: { id: notification.book.id, team: notification.team.link } })
    }
  }

  button.addEventListener('click', () => redirect('page'))
  button2.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(span1)
  p.appendChild(button)
  p.appendChild(span2)
  p.appendChild(button2)
  p.appendChild(span3)

  ref.appendChild(p)
}

function NEW_CHAT_MESSAGES ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const wrapper = document.createElement('div')

  let btnTitle = notification.book?.title
  let span1Title = ' space chat.'

  if (notification.taskId) {
    btnTitle = notification.task.title
    span1Title = ' task chat.'
  } else if (notification.attachmentId) {
    span1Title = ' file chat.'
    btnTitle = notification.attachment.name
  }

  const type = notification.taskId ||
               notification.attachmentId
    ? 'comments'
    : 'chat messages'

  span.innerHTML = `There are unread ${type} in the `
  button.innerHTML = btnTitle
  span1.innerHTML = span1Title

  button.classList.add('text-brand', 'text-left', 'mr-5')
  wrapper.classList.add('flex', 'whitespace-nowrap', 'justify-center')

  wrapper.appendChild(button)

  wrapper.appendChild(span1)

  function redirect () {
    let routeData = { name: 'Chat', params: { id: notification.book.id, team: notification.team.link } }

    if (notification.taskId) {
      routeData = { name: 'TaskBoardTeam', params: { id: notification.book.id, team: notification.team.link }, query: { highlight: notification.taskId, additionalInfo: true, 'new-message': true } }
    } else if (notification.attachmentId) {
      routeData = { name: 'FileManagerTeam', params: { id: notification.book.id, team: notification.team.link }, query: { highlight: notification.attachmentId, additionalInfo: true, 'new-message': true } }
    }

    router.push(routeData)
  }

  button.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(wrapper)

  ref.appendChild(p)
}

function A_SPACES_TITLE_WAS_CHANGED ({ notification, ref, router }) {
  const p = document.createElement('p')
  const button = document.createElement('button')
  const button2 = document.createElement('button')
  const span = document.createElement('span')
  const span1 = document.createElement('span')

  span.innerHTML = 'The '
  button.innerHTML = notification.oldBookTitle
  span1.innerHTML = ' space changed name to '
  button2.innerHTML = notification.message || notification.book.title

  button.classList.add('text-brand', 'text-left')
  button2.classList.add('text-brand', 'text-left')

  function redirect () {
    router.push({ name: 'TaskBoardTeam', params: { id: notification.book.id, team: notification.team.link } })
  }

  button.addEventListener('click', redirect)
  button2.addEventListener('click', redirect)

  p.appendChild(span)
  p.appendChild(button)
  p.appendChild(span1)
  p.appendChild(button2)

  ref.appendChild(p)
}

function HAS_BILLING_ACCESS ({ ref }) {
  const p = document.createElement('p')
  const span = document.createElement('span')

  span.innerHTML = 'You can now access the billing settings for the workspace.'

  p.appendChild(span)

  ref.appendChild(p)
}

function BOOK_MEMBER_ADD ({ notification, ref }) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  const span1 = document.createElement('span')

  span.innerHTML = 'You\'re invited to a space '
  span1.innerHTML = `"${notification.book.title}".`

  span1.classList.add('font-semibold', 'text-app-color')

  p.appendChild(span)
  p.appendChild(span1)

  ref.appendChild(p)
}

function BOOK_MEMBER_REMOVE ({ notification, ref }) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  const span1 = document.createElement('span')

  span.innerHTML = 'You\'ve been removed from a space '
  span1.innerHTML = `"${notification.book.title}".`

  span1.classList.add('font-semibold', 'text-app-color')

  p.appendChild(span)
  p.appendChild(span1)

  ref.appendChild(p)
}

function ROLE_UPDATE ({ notification, ref }) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  const span1 = document.createElement('span')

  const parts = notification.message.split('to')

  span.innerHTML = `${parts[0]} to `
  span1.innerHTML = `"${parts.length > 1 ? parts[1].trim() : null}".`
  span1.classList.add('font-semibold', 'text-app-color', 'capitalize')

  p.appendChild(span)
  p.appendChild(span1)

  ref.appendChild(p)
}

function NEW_PRIVATE_MESSAGE ({ notification, ref, router }) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  const span1 = document.createElement('span')
  const button = document.createElement('button')

  const teamMember = notification.teamMember.user.profile

  span.innerHTML = `${teamMember.firstName} ${teamMember.lastName} `
  const textMessage = removeHTMLTags(notification.chatMessage?.text)
  const text = textMessage.length ? 'send you a private chat message ' : 'send you a private chat '
  span1.innerHTML = text
  button.innerHTML = textMessage.length ? `"${removeHTMLTags(notification.chatMessage?.text)}".` : 'message.'
  span.classList.add('font-semibold', 'text-app-color', 'capitalize')
  button.classList.add('max-w-[400px]', 'truncate', 'flex', 'text-brand')

  button.addEventListener('click', () => {
    router.replace({ name: 'Chat', query: { chatId: notification.chat?.id, messageId: notification.chatMessageId } })
  })

  p.appendChild(span)
  p.appendChild(span1)
  p.appendChild(button)

  ref.appendChild(p)
}

export default {
  // personal
  1: GOT_A_NEW_TASK,
  2: MENTIONED_IN_CHAT,
  4: MENTIONED_IN_PAGE,
  6: MENTIONED_IN_COMMENT,
  7: ADDED_TO_A_NEW_SPACE,
  8: MENTIONED_IN_TASK,
  9: ASSIGNED_TO_TASK,
  14: BOOK_MEMBER_ADD,
  15: BOOK_MEMBER_REMOVE,
  16: ROLE_UPDATE,
  17: HAS_BILLING_ACCESS,
  18: NEW_PRIVATE_MESSAGE,
  19: ASSIGNED_TO_TASK,
  // general
  100: A_NEW_TEAM_MEMBER,
  101: A_SPACE_HAS_BEEN_REMOVED,
  102: A_NEW_PAGE_WAS_CREATED,
  104: NEW_CHAT_MESSAGES,
  105: A_SPACES_TITLE_WAS_CHANGED,
  // 1000: CREATED_BOOK
  1000: ACTIVE_TOOLS
}
