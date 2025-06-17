import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './pages/**/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './app.vue'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      spacing: {
        32: '8rem',
        '-32': '-8rem',
      },
      colors: {
        bluepastel: '#C4E6FA',
        pricefree: '#E6F4FE',
        pricebasic: '#FEF6E9',
        pricepremium: '#EBF4F3',

        /**
         * palette generated with https://uicolors.app/create
         */
        cerulean: {
          '50': '#eff9ff',
          '100': '#def2ff',
          '200': '#b6e8ff',
          '300': '#75d8ff',
          '400': '#2cc4ff',
          '500': '#009fe3', // default value
          '600': '#008ad4',
          '700': '#006eab',
          '800': '#005d8d',
          '900': '#064d74',
          '950': '#04314d',
          DEFAULT: '#009fe3',
        },
        /**
         * changed palette to shades of green
         */
        purple: {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
          '950': '#052e16', // default value
          DEFAULT: '#052e16',
        },
      },
    }
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        'h2': {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        'h3': {
          fontSize: theme('fontSize.lg')
        },
      })
    })
  ]

}
