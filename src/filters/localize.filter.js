import { useInfoStore } from '../store/info'
import { defaultLocale, locales } from '../locales'

function pick(obj, ...keys) {
  return keys.reduce((acc, key) => acc?.[key], obj)
}

export default function localizeFilter(key) {
  const locale = useInfoStore().info.locale || defaultLocale
  const compositeKey = [locale, 't', ...key.split('.')]

  return pick(locales, ...compositeKey) || `[${key} not found]`
}
