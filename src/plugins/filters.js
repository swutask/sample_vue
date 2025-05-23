import { computed } from 'vue'
import { tagColors } from '@/core/colors'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(isTomorrow)

export function daySuffix (i) {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export const parseDate = (value, format) => computed(() => {
  if (format === 'lastUpdate') {
    const isSameMonth = dayjs(value).isSame(new Date(), 'month')

    if (isSameMonth) {
      if (dayjs(value).isYesterday()) {
        return 'Yesterday'
      } else if (dayjs(value).isToday()) {
        return dayjs(value).format('HH:mm')
      } else {
        return dayjs(value).format('MMM D, HH:mm')
      }
    }

    return dayjs(value).format('MMM D YYYY')
  }

  return dayjs(value).format(format)
}).value

export const tagColor = (value) => computed(() => {
  const { isDarkMode } = useTheme()
  const defaultColor = { main: '#FFDE88', text: '#634700' }
  const color = tagColors[value] || defaultColor
  const filter = isDarkMode.value ? 'filter: invert(1) brightness(1.4)' : ''

  return `background-color: ${color.main}4D; border: 1px solid ${color.main}; ${color.main}; color: ${color.text}; ${filter}`
}).value

export const tagColorWeekPlanner = (value) => computed(() => {
  const color = tagColors[value] || ''

  return `background-color: ${color.main}4D; border-radius: 4px; padding:1px 0px 1px 4px;`
}).value

export const tagColorForLatestActivity = (value) => {
  const defaultColor = { main: '#FFDE88', text: '#634700' }
  const color = tagColors[value] || defaultColor

  return {
    border: `1px solid ${color.main}`,
    background: `${color.main}4D`,
    shadow: `0 0 0 0.5px ${color.main}`,
    textColor: `${color.text}`
  }
}

export const currency = (value, currency) => computed(() => {
  if (Number.isNaN(value)) {
    return value
  }

  const currencyFormatter = new Intl.NumberFormat('en', {
    currency: currency || 'usd',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })

  return currencyFormatter.format(value)
}).value
