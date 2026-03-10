import store from '../store'
import { defaultLocale, locales } from '../locales'

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || defaultLocale
  return locales[locale]['t'][key] || `[${key} not found]`
}
