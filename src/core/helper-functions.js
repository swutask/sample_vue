import designConfig from '@/core/design-config'
import renderStyles from '@/core/renderStyles'
import renderHTML from '@/core/renderHTML'
import { parseDate } from '@/plugins/filters'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
import { tagColors } from '@/core/colors'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export const preventBodyScroll = (value) => {
  const bodyClasses = document.getElementsByTagName('html')[0].classList
  if (value) {
    bodyClasses.add('prevent-body-scroll')
  } else {
    bodyClasses.remove('prevent-body-scroll')
  }
}

export const nextIndex = (items, title, expression, field = 'title') => {
  let index = 1

  const arr = items.filter(item => {
    return item[field].split(expression)[0] === title
  })

  if (arr.length) {
    arr.map(item => item[field].split(expression)[1]).sort((a, b) => +a < +b ? -1 : 1).forEach(item => {
      if (index === +item) index++
    })
  }

  return index
}

export const removeHTMLTags = (value) => {
  if (typeof value === 'string') {
    return value?.replace(/(<([^>]+)>)/ig, '')
  } else {
    return value
  }
}

export const selectText = (node) => {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(node)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  } else {
    console.warn('Could not select text in node: Unsupported browser.')
  }
}

export const unselectText = () => {
  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (document.selection) {
    document.selection.empty()
  }

  if (document.activeElement) {
    document.activeElement.blur()
  }
}

export const generateHTML = (settings, title) => {
  const maxW = designConfig.columns[settings?.columnWidth]
  const fontF = designConfig.fontFamilies[settings?.fontFamily]
  const fontSize = designConfig.fontSizes[settings?.fontSize]

  return renderHTML({
    title,
    style: renderStyles(maxW, fontF, fontSize)
  })
}

export const getNonDeletedTextContent = (topNode) => {
  let text = ''
  topNode.descendants((node) => {
    if (node.isBlock) {
      text += '\n'
    } else if (node.isText) {
      text += node.text
    }
  })
  return text.replace(/(^\s*)|(\s*$)/gi, '').replace(/[ ]{2,}/gi, ' ').replace(/\n /, '\n').replace(/\n{2,}/gi, '\n')
}

export const countWords = (doc) => {
  const textContent = getNonDeletedTextContent(doc)
  const docContent = textContent + ' '
  const docWords = docContent.split(/[\n ]+/)

  const docNumNoSpace = docWords.join('').length
  const docNumWords = docNumNoSpace ? docWords.length : 0

  return docNumWords === 0 ? 0 : docNumWords - 1
}

export const getPosition = (menu, block, btnRef, staticTop) => {
  const { isMobile } = useGeneral()
  const height = window.innerHeight
  const parent = menu.getBoundingClientRect()
  const content = block.getBoundingClientRect()
  const btn = btnRef.getBoundingClientRect()

  const top = (parent.top + parent.height + content.height > height) || staticTop ? 'bottom: 100%' : 'top: 42px'
  const left = btn.right > window.innerWidth || btn.right + content.width > window.innerWidth
    ? `left: ${btn.right - parent.left - content.width}px`
    : `left: ${btn.left - parent.left}px`

  return isMobile.value ? `left: 0px; ${top}` : `${left}; ${top}`
}

export const onDragEnd = () => {
  const className = 'grabbing'
  const html = document.getElementsByTagName('html').item(0)
  if (html && new RegExp(className).test(html.className) === true) {
    // Remove className with the added space (from setClassToHTMLElement)
    html.className = html.className.replace(
      new RegExp(' ' + className),
      ''
    )
    // Remove className without added space (just in case)
    html.className = html.className.replace(new RegExp(className), '')
  }
}

export const onStart = () => {
  const className = 'grabbing'
  const html = document.getElementsByTagName('html').item(0)
  if (html && new RegExp(className).test(html.className) === false) {
    html.className += ' ' + className // use a space in case there are other classNames
  }
}

// convert hex color to rgb
export const hexToRGB = (hex) => {
  const hexReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  if (!hex.match(hexReg)) return hex

  if (hex.length === 4 || hex.length === 7) {
    const color = hex.replace(hexReg, (_, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16))

    return `rgb(${color})`
  }
}

// convert rgb to hex
export const rgbToHex = (color) => {
  const regEx = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/

  if (regEx.test(color)) {
    const match = regEx.exec(color)
    const r = Number(match[1])
    const g = Number(match[2])
    const b = Number(match[3])

    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  } else {
    return color
  }
}

export const detectMob = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}

export const detectIOS = () => {
  const toMatch = [
    /iPhone/i,
    /iPad/i,
    /iPod/i
  ]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}

export const caseInsensitiveIncludes = (text, search) => {
  if (search.length > text.length) {
    return false
  } else {
    return text.indexOf(search, 0) !== -1
  }
}

export function replaceHighlightedText (text, query) {
  const queryRegExp = new RegExp(query, 'ig')
  const position = text.search(queryRegExp)
  const word = text.slice(position, query.length + position)

  const regExp = new RegExp(word, 'ig')
  return `<p>${text.replace(regExp, `<strong class="text-app-color">${word}</strong>`)}</p>`
}

export const getHighlightedItems = (text, query = '') => {
  const span = document.createElement('span')
  span.innerHTML = text.replace(/(<([^>]+)>)/ig, '\n')
  const highlight = span.textContent.split('\n').filter(item => caseInsensitiveIncludes(item.toLowerCase(), query.toLowerCase()))

  if (highlight.length > 0) {
    return parseQuery(highlight, query)
  } else {
    const result = []
    const splittedQuery = query.trim().split(' ')

    splittedQuery.forEach((str) => {
      const span = document.createElement('span')
      span.innerHTML = text.replace(/(<([^>]+)>)/ig, '\n')
      const highlight = span.textContent.split('\n').filter(item => caseInsensitiveIncludes(item.toLowerCase(), str.toLowerCase()))

      if (highlight.length > 0 && str.length > 1) {
        result.push(...parseQuery(highlight, str))
      }
    })

    return result
  }
}

function parseQuery (arr, query) {
  const result = []

  arr.forEach((item) => {
    if (item.length > 130) {
      const splittedByDot = item.split('.').filter(item => caseInsensitiveIncludes(item.toLowerCase(), query.toLowerCase()))

      splittedByDot.forEach(el => {
        result.push(replaceHighlightedText(el, query))
      })
    } else {
      result.push(replaceHighlightedText(item, query))
    }
  })

  return result
}

export const copy = async (value, cb) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }

  cb()
}

export const checkIsToday = (newDate) => {
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })
  const dateToCheck = new Date(newDate).toLocaleDateString('en-US', { timeZone: 'UTC' })

  return currentDate === dateToCheck
}

export const checkIsTomorrow = (date) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  )
}

export const checkIsTodayInRange = (range) => {
  const today = new Date()

  return today >= new Date(range.start) && today <= new Date(range.end)
}

const getMonth = (date, options = {
  month: 'short',
  timeZone: 'UTC'
}) => {
  return new Date(date).toLocaleString('en-US', options)
}

const getDay = (date, options = {
  day: 'numeric',
  timeZone: 'UTC'
}) => {
  return new Date(date).toLocaleString('en-US', options)
}

const getYear = (date, options = {
  year: 'numeric',
  timeZone: 'UTC'
}) => {
  return new Date(date).toLocaleString('en-US', options)
}

export const prepareDate = (date, date2 = null) => {
  if (!date && date2) {
    const month2 = getMonth(date2).toLowerCase()
    const day2 = getDay(date2)
    const year2 = getYear(date2)
    const currentYear = new Date().getFullYear()

    return +year2 === +currentYear ? `${day2} ${month2}` : `${day2} ${month2} ${year2}`
  }

  const month = getMonth(date)
  const day = getDay(date)
  const year = getYear(date)

  const currentYear = new Date().getFullYear()

  let month2
  let day2
  let year2

  if (date2) {
    month2 = getMonth(date2)
    day2 = getDay(date2)
    year2 = getYear(date2)

    if (+currentYear === +year && +currentYear === +year2) {
      if (month === month2) {
        const currentMonth = getMonth(new Date())
        const currentDate = getDay(new Date())
        const formaDate = dayjs(date2)

        if (currentMonth === month && currentDate === day && formaDate.isToday()) {
          return 'Today'
        }
        if (currentMonth === month && formaDate.isTomorrow()) {
          return 'Tomorrow'
        }

        if (currentMonth === month2 && currentDate === day2) return `${day} ${month.toLowerCase()} - Today`

        if (currentMonth === month && currentDate === day) return `Today - ${day2} ${month2.toLowerCase()}`

        if (new Date(date).getTime() === new Date(date2).getTime()) {
          return `${day2} ${month2.toLowerCase()}`
        }

        return `${day} - ${day2} ${month.toLowerCase()}`
      } else {
        return `${day} ${month.toLowerCase()} - ${day2} ${month2.toLowerCase()}`
      }
    } else if (+currentYear !== +year || +currentYear !== year2) {
      if (+year === +year2) {
        if (month === month2) {
          return day === day2 ? `${day2} ${month2.toLowerCase()} ${year2}` : `${day} - ${day2} ${month2.toLowerCase()} ${year2}`
        } else {
          return `${day} ${month.toLowerCase()} ${year} - ${day2} ${month2.toLowerCase()} ${year2}`
        }
      }

      return `${day} ${month.toLowerCase()} ${year} - ${day2} ${month2.toLowerCase()} ${year2}`
    }
  }

  if (+currentYear === +year) {
    const currentMonth = getMonth(new Date())
    const currentDate = getDay(new Date())

    if (month === currentMonth && day === currentDate) {
      return 'Today'
    }

    return `${day} ${month.toLowerCase()}`
  } else {
    return `${day} ${month.toLowerCase()} ${year}`
  }
}

export function awaitTimeout (delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function prepareImgSrc (url) {
  const href = new URL(url, import.meta.url).href

  return href
}
// function to get the array of months in different formats via passing 'format' property ('short', 'long')
// and in different languages via passing lang property
// example of default return value: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export function getMonthList (lang = 'en', format = 'long') {
  const year = new Date().getFullYear()

  const monthList = [...Array(12).keys()]

  const formatter = new Intl.DateTimeFormat(lang, { month: format })

  const getMonthName = (monthIndex) => formatter.format(new Date(year, monthIndex))

  return monthList.map(getMonthName)
}

export function getTimeList (isHour12 = true) {
  const items = []

  for (let hour = 0; hour < 24; hour++) {
    items.push([hour, 0])
    items.push([hour, 15])
    items.push([hour, 30])
    items.push([hour, 45])
  }

  const date = new Date()

  const options = {
    hourCycle: 'h23',
    hour: 'numeric',
    minute: 'numeric'
  }

  if (isHour12) {
    options.hour12 = true
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)

  const range = items.map(time => {
    const [hour, minute] = time
    date.setHours(hour)
    date.setMinutes(minute)

    return formatter.format(date)
  }).map(e => e.toLowerCase())

  return range
}

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours.length === 1 ? '0' + hours : hours}:${minutes}`
}

export function convertTime24to12 (time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

  if (time.length > 1) {
    time = time.slice(1)
    time[5] = +time[0] < 12 ? ' am' : ' pm'
    time[0] = +time[0] % 12 || 12
  }
  return time.join('')
}

export function convertTime (time, to12H = true) {
  if (to12H) {
    return convertTime24to12(time)
  } else {
    return convertTime12to24(time)
  }
}

export function checkPlanLimit () {
  const { stats, subscription, plans } = usePlan()

  const currentPlanLimit = plans.value.find((item) => subscription.value?.planId === item.id)?.maxBooks
  const difference = currentPlanLimit - stats.value?.books

  return difference < 0
}

export function getTime (time, isShortDate = false) {
  const minutes = (Date.now() - +(new Date(time))) / 1000 / 60
  if (minutes < 1) {
    return 'now'
  } else if (minutes < 2) {
    return '1 minute ago'
  } else if (minutes < 60) {
    return `${parseInt(minutes.toString())} minutes ago`
  } else if (minutes / 60 < 2) {
    return '1 hour ago'
  } else if (minutes / 60 < 24) {
    return `${parseInt((minutes / 60).toString())} hours ago`
  } else if (minutes / 60 > 24 && minutes / 60 / 24 < 8) {
    if (parseInt((minutes / 60 / 24).toString()) === 1) return `${parseInt((minutes / 60 / 24).toString())} day ago`
    return `${parseInt((minutes / 60 / 24).toString())} days ago`
  }
  const isCurrentYear = new Date(time).getFullYear() === new Date().getFullYear()
  const type = isCurrentYear && isShortDate ? 'D MMM' : 'D MMM YYYY'

  return parseDate(time, type)
}

export function getDateByOffset (dayOffset, direction) {
  const timeOffset = dayOffset * 24 * 60 * 60 * 1000

  return new Date(new Date().getTime() + (direction * timeOffset))
}

export function getWeekDates () {
  const { calendarFirstDay } = useSettings()
  const currentDayOfWeek = new Date().getDay()
  const daysInWeek = calendarFirstDay.value ? 7 : 6

  const dayOffset = 7

  return {
    nextWeek: {
      start: getDateByOffset(dayOffset - (daysInWeek - currentDayOfWeek), 1),
      end: getDateByOffset((calendarFirstDay.value ? 6 : 8) - currentDayOfWeek + daysInWeek, 1)
    },
    lastWeek: {
      start: getDateByOffset(currentDayOfWeek + daysInWeek, -1),
      end: getDateByOffset(daysInWeek - currentDayOfWeek, -1)
    }
  }
}

export function getDueDateOptions () {
  const todayRef = new Date()
  const today = new Date(todayRef.getFullYear(), todayRef.getMonth(), todayRef.getDate())
  const yesterday = new Date(todayRef.getFullYear(), todayRef.getMonth(), todayRef.getDate() - 1)
  const tomorrow = new Date(todayRef.getFullYear(), todayRef.getMonth(), todayRef.getDate() + 1)
  const { nextWeek, lastWeek } = getWeekDates()

  return {
    Overdue: { startDate: getDateByOffset(1000, -1), endDate: yesterday },
    'Last week': { startDate: lastWeek.start, endDate: lastWeek.end },
    Yesterday: { startDate: yesterday, endDate: yesterday },
    Today: { startDate: today, endDate: today },
    Tomorrow: { startDate: tomorrow, endDate: tomorrow },
    'Next week': { startDate: nextWeek.start, endDate: nextWeek.end },
    Upcoming: { startDate: tomorrow, endDate: getDateByOffset(1000, 1) }
  }
}

export function formatDate (date) { // REWRITE TO DAYJS
  if (date) {
    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    return year + '-' + month + '-' + day
  } else return null
}

export function getSelectedUsers (content) {
  const selectedUsers = []

  for (const item of content) {
    if (item.type !== 'paragraph' || !item.content?.length) {
      continue
    }

    let id = null
    let message = ''
    let hasMention = false

    for (const subItem of item.content) {
      const { attrs, type, text } = subItem

      if (type === 'mention') {
        id = attrs.id
        message += `@${attrs.title}`
        hasMention = true
      } else if (type === 'text') {
        message += text
      } else if (type === 'hardBreak') {
        message += ' '
      }
    }

    if (hasMention) {
      selectedUsers.push({ id, message })
    }
  }

  return selectedUsers
}

export function transformProjects (inputArray) {
  const map = new Map()

  // Create a map of IDs to their respective objects
  for (const item of inputArray) {
    map.set(item.id, { ...item, subProject: [] })
  }

  const result = []

  // Traverse the input array and build the desired structure
  for (const item of inputArray) {
    const currentItem = map.get(item.id)
    const parent = map.get(item.parentId)

    if (parent) {
      parent.subProject.push(currentItem)
    }

    result.push(currentItem)
  }

  return result
}

export const stringifyParams = (obj, removeEmpty = true) => {
  const val = cloneDeep(obj)

  for (const key of Object.keys(val)) {
    if (removeEmpty && ((!val[key] && !Number.isInteger(val[key])) || val[key].length === 0)) delete val[key]
    else if (Array.isArray(val[key])) val[key] = val[key].join(',')
    else val[key] = String(val[key])
  }

  return val
}

export const falsyFilter = (item) => {
  return (item !== '' && item !== null && typeof item !== 'undefined')
}

export const removeEmpty = (obj) => {
  const val = cloneDeep(obj)

  for (const key of Object.keys(val)) {
    if (!falsyFilter(val[key])) delete val[key]
  }

  return val
}

export const replaceRouterQuery = function (obj) {
  const routerQuery = router.currentRoute.value.query
  const query = obj && Object.keys(obj).length ? stringifyParams({ ...routerQuery, ...obj }) : {}

  if (JSON.stringify(routerQuery) !== JSON.stringify(query)) {
    router.replace({ query })
  }
}

export const openOriginalImage = (url) => {
  const image = new Image()
  image.src = url
  window.open(url, '_blank')
}

const colorClasses = {
  16736017: {
    class: ['border-event-orange', '!shadow-orange-event-05']
  },
  14088787: {
    class: ['border-event-green', '!shadow-green-event-05']
  },
  1179476: {
    class: ['border-event-greenlight', '!shadow-green-event-100-05']
  },
  1176063: {
    class: ['border-event-blue', '!shadow-blue-event-05']
  },
  16405431: {
    class: ['border-event-pink', '!shadow-pink-event-05']
  },
  11735551: {
    class: ['border-event-purple', '!shadow-purple-event-05']
  },
  15724527: {
    class: ['border-grey-250 dark:border-black', '!shadow-grey-event-05']
  },
  67356281: {
    class: ['border-blue-0099ff', '!bg-blue-f1faff', '!shadow-event-2', 'dark:!shadow-grey-1000-05']
  }
}

export function eventColor (tagColor) {
  return {
    borderClass: colorClasses[tagColor]?.class || '!shadow-event-2 dark:!shadow-grey-1000-05',
    borderColor: tagColors[tagColor]?.border || ''
  }
}

export function isDateInRange (date, startDate, endDate) {
  const today = new Date()
  const targetDate = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Normalize the time part to compare only dates
  targetDate.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  // Check if the target date is within the range
  return !startDate
    ? (dayjs(today).isSame(end, 'day') && dayjs(targetDate).isSame(today, 'day'))
    : (targetDate >= start && targetDate <= end)
}

export function getCurrentWeekNumber (defaultDate = new Date()) {
  const today = new Date(defaultDate)

  const date = new Date(today.getTime())
  const dayOfWeek = (date.getDay() + 6) % 7

  date.setDate(date.getDate() - dayOfWeek + 3)

  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)

  const daysBetween = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000))

  const weekNumber = Math.ceil((daysBetween + 1) / 7)

  return weekNumber
}

export function getCurrentMonthName (date) {
  const today = new Date(date)
  const options = { month: 'long' }
  return new Intl.DateTimeFormat(undefined, options).format(today)
}

export function bytesToSize (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(0)}${sizes[i]}`
}

export function isMoreThanDaysOld (date, dayCount) {
  return dayjs().diff(dayjs(date), 'day') >= dayCount
}

export function moveItem (arr, fromIndex, toIndex) {
  // Check if the fromIndex is valid
  if (fromIndex < 0 || fromIndex >= arr.length) {
    throw new Error('Invalid fromIndex')
  }

  // Remove the item from the original position
  const [item] = arr.splice(fromIndex, 1)

  // Insert the item at the new position
  arr.splice(toIndex, 0, item)

  return arr // Return the modified array
}
