import { reactive } from 'vue'
import { mdiInformation, mdiCheckCircle, mdiAlertCircle } from '@mdi/js'

const messageState = reactive({
  show: false,
  text: '',
  color: 'info',
  icon: mdiInformation,
  timeout: 4000,
})

let timeoutId = null

function showMessage(content, color, icon) {
  if (timeoutId) {
    window.clearTimeout(timeoutId)
    timeoutId = null
  }

  messageState.text = content
  messageState.color = color
  messageState.icon = icon
  messageState.show = true

  timeoutId = window.setTimeout(() => {
    messageState.show = false
    timeoutId = null
  }, messageState.timeout)
}

export function useMessage() {
  return {
    message: messageState,
    info: (content) => showMessage(content, 'info', mdiInformation),
    success: (content) => showMessage(content, 'success', mdiCheckCircle),
    error: (content) => showMessage(content, 'error', mdiAlertCircle),
  }
}
