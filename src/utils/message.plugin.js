import Vue from 'vue';

const messageState = Vue.observable({
  show: false,
  text: '',
  color: 'info',
  icon: 'mdi-information',
  timeout: 4000,
});

let timeoutId = null;

function showMessage(content, color, icon) {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }

  messageState.text = content;
  messageState.color = color;
  messageState.icon = icon;
  messageState.show = true;

  timeoutId = window.setTimeout(() => {
    messageState.show = false;
    timeoutId = null;
  }, messageState.timeout);
}

export default {
  install(Vue) {
    Vue.prototype.$message = messageState;

    Vue.prototype.$info = function(content) {
      showMessage(content, 'info', 'mdi-information');
    };

    Vue.prototype.$success = function(content) {
      showMessage(content, 'success', 'mdi-check-circle');
    };

    Vue.prototype.$error = function(content) {
      showMessage(content, 'error', 'mdi-alert-circle');
    };
  }
};
