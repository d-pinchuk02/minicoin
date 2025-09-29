import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey, prefix = '') {
      const appName = import.meta.env.VITE_TITLE

      return (prefix.length > 0 ? prefix + ' - ' : '') + `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}
