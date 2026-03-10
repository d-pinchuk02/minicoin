import store from '../store'
import { defaultLocale } from '../locales'

export default function currencyFilter(value, currency = 'UAH') {
  const locale = store.getters.info.locale || defaultLocale

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}
