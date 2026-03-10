import store from '../store'
import ru_RU from '../locales/ru-RU.json'
import en_US from '../locales/en-US.json'
import uk_UA from '../locales/uk-UA.json'

const locales = {
  'ru-RU': ru_RU,
  'en-US': en_US,
  'uk-UA': uk_UA
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[${key} not found]`
}
