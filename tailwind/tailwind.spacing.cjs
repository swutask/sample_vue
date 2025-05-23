function generateSpacing () {
  const obj = {}

  for (let i = 0; i < 51; i++) {
    obj[i] = `${i}px`
  }

  return obj
}

const spacing = {
  ...generateSpacing(),
  auto: 'auto',
  full: '100%',
  screen: '100vh',
  max: 'max-content',
  header: 'var(--header-height)',
  268: '268px',
  330: '330px',
  '1/2': '50%',
  '1/3': '33.3%',
  '1/4': '25%',
  '1/5': '20%',
  '1/10': '10%',
  '2/3': '66.6%',
  '2/5': '40%',
  '3/5': '60%',
  '3/7': '43%',
  '4/7': '57%',
  '6/7': '85%',
  '7/10': '70%',
  '30%': '30%',
  '45%': '45%',
  '70%': '70%',
  '80vh': '80vh',
  'calc-20': 'calc(100% - 20px)',
  'calc-30': 'calc(100% - 30px)',
  'calc-50': 'calc(100% - 50px)',
  'calc-header': 'calc(100% - var(--header-height))',
  sidebar: 'var(--sidebar-width)',
  // 'calc-sidebar': 'calc(100% - 200px)',
  'calc-sidebar': 'calc(100% - var(--sidebar-width))',
  'calc-150': 'calc(100% - 150px)',
  'calc-mobile-task-board': 'calc(100dvh - 290px)',
  'calc-task-board': 'calc(100dvh - var(--header-height) - var(--main-header-height) - 90px)',
  'calc-task-board-collapsed': 'calc(100dvh - var(--header-height) - var(--main-header-height) - 150px)'
}

module.exports = {
  spacing,
  fontSize: generateSpacing()
}
