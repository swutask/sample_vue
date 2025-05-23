import { useRoute } from 'vue-router'
import { onBeforeUnmount } from 'vue'

import task from './task'
import chat from './chat'
import inbox from './inbox'
import attachment from './attachment'
import latestActivity from './activity'

export default function useSocket () {
  const route = useRoute()
  const { token } = useAuth()

  const { initChat } = chat()
  const { initTasks } = task()
  const { initLatestActivity } = latestActivity()
  const { initInbox } = inbox()
  const { initAttachment } = attachment()

  let ws = null
  let needReconnection = true

  function initSocket () {
    if (ws) {
      ws.onopen = ws.onopen = ws.onerror = null
      ws.close()
    }

    ws = new WebSocket(`${import.meta.env.VITE_APP_WEBSOCKET}?auth=${token.value}`)

    ws.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data)

      // files
      if (parsedData.name === 'attachment' && parsedData.payload) {
        initAttachment(parsedData)
      }

      // chat
      if (parsedData.name === 'chat' && parsedData.payload) {
        initChat(parsedData)
      }

      // inbox
      if (parsedData.name === 'inbox' && parsedData.payload) {
        initInbox(parsedData)
      }

      // tasks
      if (parsedData.name === 'task' && parsedData.payload) {
        initTasks(parsedData, route)
      }

      if ((parsedData.name === 'taskActivity' || parsedData.name === 'inboxActivity') && parsedData.payload) {
        initLatestActivity(parsedData, route)
      }
    }

    ws.onclose = () => {
      ws = null
      if (needReconnection) {
        setTimeout(() => initSocket(), 1000)
      }
    }
  }

  onBeforeUnmount(() => {
    needReconnection = false
    if (ws) ws.close()
  })

  return {
    initSocket
  }
}
