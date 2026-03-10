import en_US from './en-US.json'
import ru_RU from './ru-RU.json'
import uk_UA from './uk-UA.json'

const defaultLocale = 'ru-RU'
const locales = {
  'en-US': {
    name: 'English',
    t: en_US,
  },
  'ru-RU': {
    name: 'Русский',
    t: ru_RU,
  },
  'uk-UA': {
    name: 'Українська',
    t: uk_UA,
  }
}
const localesArray = Object.entries(locales).map(([id, { name }]) => ({ id, name }))

export {
  defaultLocale,
  locales,
  localesArray,
  en_US,
  ru_RU,
  uk_UA,
}
