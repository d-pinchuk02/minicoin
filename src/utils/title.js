import localizeFilter from '@/filters/localize.filter'

export default function title(titleKey, prefix = '') {
  const appName = import.meta.env.VITE_TITLE

  return (
    (prefix.length > 0 ? prefix + ' - ' : '') +
    `${localizeFilter(titleKey)} | ${appName}`
  )
}
