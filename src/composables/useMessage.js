import { reactive } from 'vue'

const messageState = reactive({
  show: false,
  text: '',
  color: 'info',
  icon: 'mdi-information',
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
    info: (content) => showMessage(content, 'info', 'mdi-information'),
    success: (content) => showMessage(content, 'success', 'mdi-check-circle'),
    error: (content) => showMessage(content, 'error', 'mdi-alert-circle'),
  }
}
