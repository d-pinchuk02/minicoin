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

export default {
  install(app) {
    app.config.globalProperties.$message = messageState

    app.config.globalProperties.$info = function (content) {
      showMessage(content, 'info', 'mdi-information')
    }

    app.config.globalProperties.$success = function (content) {
      showMessage(content, 'success', 'mdi-check-circle')
    }

    app.config.globalProperties.$error = function (content) {
      showMessage(content, 'error', 'mdi-alert-circle')
    }
  },
}
