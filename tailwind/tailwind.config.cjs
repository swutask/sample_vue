const plugin = require('tailwindcss/plugin')
const colors = require('./tailwind.colors.cjs')
const { spacing, fontSize } = require('./tailwind.spacing.cjs')

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    spacing,
    inset: spacing,
    fontSize,
    maxWidth: spacing,

    fontWeight: {
      light: '300',
      'normal-plus': '450',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },

    opacity: {
      0: '0',
      25: '.25',
      30: '.3',
      40: '.4',
      50: '0.5',
      70: '.7',
      80: '.8',
      90: '.9',
      100: '1'
    },

    screens: {
      sm: '500px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1448px',
      '3xl': '1725px'
    },

    zIndex: {
      '-1': -1,
      5: 5,
      10: 10,
      20: 20,
      40: 40,
      50: 50,
      100: 100,
      101: 101,
      500: 500,
      600: 600,
      9998: 9998,
      9999: 9999
    },

    fontFamily: {
      main: 'var(--main-font-family)',
      Relative: ['relative', 'sans-serif'],
      Geomanist: ['Geomanist', 'sans-serif'],
      Lato: ['Lato', 'sans-serif'],
      Inter: ['Inter', 'sans-serif'],
      'Space-Grotesk': ['Space Grotesk', 'sans-serif'],
      Ambid: ['Ambid', 'sans-serif']
    },

    gap: () => ({
      8: '8px',
      10: '10px',
      18: '18px',
      20: '20px',
      22: '22px'
    }),

    letterSpacing: {
      negative: '-0.7px',
      small: '-0.1px',
      normal: 0,
      tiny: '0.1px'
    },

    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1.5: '1.5px',
      2: '2px',
      3: '3px',
      4: '4px'
    },

    borderRadius: {
      none: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      12: '12px',
      16: '16px',
      20: '20px',
      full: '9999px'
    },
    boxShadow: {
      space: 'rgba(0, 0, 0, 0.02) 0px 4px 4px -1px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px',
      'hamburger-dropdown': 'rgb(0 0 0 / 14%) 0px 2px 12px',
      switcher: '1px 2px 4px #e3e3e3',
      chat: '0 0 0 1px rgb(15 15 15 / 9%), 0 2px 2px rgb(15 15 15 / 6%)',
      'chat-active': '0 0 0 1px rgb(15 15 15 / 16%), 0 2px 2px rgb(15 15 15 / 6%)',
      'short-cut': '0 0 0 1px rgb(15 15 15 / 30%), 0 2px 2px rgb(15 15 15 / 16%)',
      'keyboard-shortcut': '0 2px #b6b6b6',
      event: 'rgb(15 15 15 / 9%) 0px 0px 0px 1px, rgb(15 15 15 / 9%) 0px 2px 4px',
      'event-dark': '0 0 0 1px rgb(15 15 15 / 10%), 0 2px 6px rgb(15 15 15 / 63%)',
      'event-hover': '0 0 0 1px rgb(15 15 15 / 11%), 0 2px 4px rgb(15 15 15 / 28%)',
      'event-2': '0px 1px 1px -1px rgba(0,0,0,.08), 0px 2px 2px -1px rgba(0,0,0,0.12), 0px 0px 0px 1px rgba(0,0,0,.08), inset 0px 1px 0px #fff, inset 0px 1px 2px 1px #fff, inset 0px 1px 2px rgba(0,0,0,.06)',
      signup: '0px 2px 7px #ddd',
      dropdown: '0 0 0 1px rgb(15 15 15 / 3%), 0 2px 15px rgb(15 15 15 / 16%)',
      limit: '0 0 0 1px rgb(15 15 15 / 3%), 0 2px 25px rgb(15 15 15 / 46%)',
      'create-task-modal': '1px 7px 20px #999999',
      search: '2px 2px 7px #ddd',
      'search-dark': '3px 0 15px #000',
      none: 'none',
      DEFAULT: '2px 2px 10px rgba(0, 0, 0, 0.15)',
      onboarding: '2px 2px 24px rgba(0, 0, 0, 0.15)',
      sharp: '1px 1px 2px #ddd',
      sharpDark: '1px 1px 2px #1a1a1a',
      smooth: '0 1.4px 6px rgb(0 0 0 / 10%), 0 3.6px 12.6px rgb(0 0 0 / 9%)',
      header: '1px 1px 4px #ddd',
      paperMode: '1px -2px 16px #e8e8e8',
      hover: '0px 0px 0px 0.5px rgb(var(--color-hover))',
      'sidebar-menu': '0px 0px 5px #3F40F2',
      card: '1px 2px 30px #ddd',
      'card-hover': '1px 2px 17px #ccc',
      'card-hover-light': '1px 2px 7px #ccc',
      'user-badge': '0 1px 3px #ccc',
      lightest: 'rgba(50, 50, 105, 0.05) 0px 2px 7px 2px, rgba(0, 0, 0, 0.08) 0px 1px 1px 0px',
      'sign-up': '0.31px 0.93px 3.87px rgba(0, 0, 0, 0.15)',
      'new-dropdown': 'rgb(0 0 0 / 20%) 0px 2px 18px',
      'orange-event-05': '0 0 0 0.5px #F3AF00',
      'green-event-05': '0 0 0 0.5px #0EB476',
      'green-event-100-05': '0 0 0 0.5px #4DE101',
      'blue-event-05': '0 0 0 0.5px #00D4C9',
      'pink-event-05': '0 0 0 0.5px #FF005A',
      'purple-event-05': '0 0 0 0.5px #8127FD',
      'grey-event-05': '0 0 0 0.5px #BBBBBB',
      'grey-1000-05': '0 0 0 0.5px #777',
      'dark-300-05': '0 0 0 0.5px #555',
      'grey-1400-05': '0 0 0 0.5px #E5E7EB',
      'grey-950-05': '0 0 0 0.5px #999',
      'grey-700-05': '0 0 0 0.5px #ddd',
      'grey-500-05': '0 0 0 0.5px #eee',
      'brand-05': '0 0 0 0.5px #3F40F2',
      'dark-500-05': '0 0 0 0.5px #333',
      'black-05': '0 0 0 0.5px #000',
      modal: ' 1px 7px 22px #444',
      'add-task': ' 1px 4px 13px #aaa',
      'task-modal': ' 1px 7px 22px #666',
      'create-task': '4px 3px 6px #ccc',
      'alt-c-modal': ' 1px 3px 15px #444',
      'black-1': '0 0 0 1px #000',
      'task-card': 'rgba(15, 15, 15, 0.06) 0px 1px 0px 1px, rgba(15, 15, 15, 0.25) 0px 0px 1px',
      'today-task': 'rgba(15, 15, 15, .06) 0px 1px 0px 0px, rgba(15, 15, 15, .05) 0px 0px 1px',
      'main-button': '1px 2px 1px rgb(var(--color-grey-f5f5f5))',
      'sidebar-nav-active': 'rgba(15, 15, 15, .03) 0px 1px 0px 1px, rgba(15, 15, 15, .25) 0px 0px 1px',
      'perspective-card': 'rgba(15, 15, 15, 0.03) 0px 1px 0px 0px, rgba(15, 15, 15, 0.06) 0px 0px 1px !important'
    },
    extend: {
      textOpacity: {
        80: '0.8',
        90: '0.9'
      },
      transitionDuration: {
        50: '50ms'
      },
      backgroundOpacity: {
        4: '0.04',
        10: '0.1',
        70: '0.7',
        80: '0.8'
      },
      lineHeight: {
        0: 0,
        tiny: 0.1,
        none: 1,
        extraTight: 1.1,
        small: 1.2,
        middle: 1.3,
        normal: 1.4,
        base: 1.6
      },
      transitionProperty: {
        position: 'top, left, right, bottom'
      }
    },
    groups: ['block', 'scope']
  },
  plugins: [
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || []

      groups.forEach((group) => {
        addVariant(`group-${group}-hover`, () => {
          return `:merge(.group-${group}):hover &`
        })
      })
    })
  ]
}
