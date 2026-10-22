import { useInfoStore } from '../store/info'
import { defaultLocale, locales } from '../locales'

export default function localizeFilter(key) {
  const locale = useInfoStore().info.locale || defaultLocale
  return locales[locale]['t'][key] || `[${key} not found]`
}
