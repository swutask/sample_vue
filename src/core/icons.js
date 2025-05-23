import { allIcons, bookIcons } from '@/helpers/icons'

function importAllIcons (filterBy = '') {
  let filteredIcons = allIcons

  if (filterBy === 'original') {
    filteredIcons = allIcons.filter(item => !item.match('outlined'))
  } else if (filterBy === 'outlined') {
    filteredIcons = allIcons.filter(item => item.match('outlined'))
  }

  return filteredIcons.map(item => item.replace('.png', '').replace('./', ''))
}

function importBookIcons () {
  const icons = bookIcons

  return icons.map(item => item.replace('.svg', '').replace('./', ''))
}

function randomBookIcon () {
  const icons = importBookIcons()
  const lastColorIndex = icons.length - 1

  const index = Math.floor(Math.random() * lastColorIndex)

  return icons[index]
}

function getRandomColorIcon () {
  const { books } = useBook()
  const icons = ['FC5EFF', 'FF00A8', '00FF19', '1400FF', '7E5EFF', 'FF5E67', 'FFEF5E', 'F0A411', '00D1FF', '14A6F9', '5EFFF5', 'F91466', '00FFC2', '14F98B']

  const existingColors = books.value.map(item => item.icon)
  const availableColors = icons.filter(item => !existingColors.includes(item))

  const colorsToApply = availableColors.length ? availableColors : icons
  const lastColorIndex = colorsToApply.length - 1
  const index = Math.floor(Math.random() * lastColorIndex)

  return colorsToApply[index]
}

export default {
  original: importAllIcons('original'),
  outlined: importAllIcons('outlined'),
  bookIcons: importBookIcons(),
  icons: importAllIcons(),
  getBookIcon: randomBookIcon,
  getRandomColorIcon
}
