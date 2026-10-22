import { useInfoStore } from '../store/info'
import { defaultLocale } from '../locales'

export default function currencyFilter(value, currency = 'UAH') {
  const locale = useInfoStore().info.locale || defaultLocale

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}
