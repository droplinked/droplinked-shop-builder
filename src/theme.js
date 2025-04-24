import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  components: {
    Switch: createMultiStyleConfigHelpers(switchAnatomy.keys).defineMultiStyleConfig({
      baseStyle: createMultiStyleConfigHelpers(switchAnatomy.keys).definePartsStyle({
        container: { border: "none", outline: "none" },
        thumb: { backgroundColor: "neutral.black" },
        track: {
          backgroundColor: "neutral.gray.750",
          _checked: { bg: "primary.default" }
        }
      })
    }),
    Divider: { baseStyle: { margin: "0" } },
    FormLabel: { baseStyle: { margin: "0", width: "fit-content" } },
  },
  colors: {
    neutral: {
      white: '#ffffff',
      gray: {
        50: '#f9f9f9',
        100: '#f2f2f2',
        200: '#dedede',
        300: '#d6d6d6',
        400: '#c4c4c4',
        450: '#a3a3a3',
        500: '#878787',
        550: '#747474',
        600: '#616161',
        650: '#4f4f4f',
        700: '#3c3c3c',
        750: '#333333',
        800: '#292929',
        850: '#262626',
        900: '#222222',
        1000: '#1c1c1c'
      },
      background: '#141414',
      black: '#000000',
    },
    primary: {
      default: '#2bcfa1',
    },
    system: {
      success: '#2bcfa1',
      warning: '#ffd951',
      error: '#ff2244',
      link: '#179ef8',
    },
    text: {
      white: '#ffffff',
      black: '#000000',
      subtextPlaceholder: {
        light: '#b1b1b1',
        dark: '#7b7b7b',
      },
      disabled: {
        light: '#bcbcbc',
        dark: '#4f4f4f',
      },
      primary: '#2bcfa1',
      error: '#ff2244',
      link: '#179ef8',
    },
    button: {
      default: {
        primary: '#2bcfa1',
        secondary: '#292929',
      },
      hover: {
        transparent: 'rgba(43, 206, 161, 0.1)',
        filled: '#06c295',
        secondary: '#333333',
      },
      pressed: {
        transparent: 'rgba(43, 206, 161, 0.2)',
        filled: '#01b48a',
        secondary: '#3c3c3c',
      },
      disable: {
        light: '#f2f2f2',
        dark: '#262626',
      }
    },
    sonner: {
      success: '#004935',
      warning: '#B77B00',
      error: '#670010',
      link: '#003E68',
    },
    label: {
      normal: 'rgba(0, 0, 0, 0.05)',
      success: 'rgba(43, 207, 161, 0.1)',
      warning: 'rgba(255, 217, 81, 0.1)',
      error: 'rgba(255, 34, 68, 0.05)',
      link: 'rgba(23, 158, 248, 0.1)',
    }
  },
  breakpoints: {
    sm: "360px", // Mobile: 360px and above
    md: "768px", // Tablet (Portrait): 768px and above
    lg: "1024px", // Tablet (Landscape): 1024px and above
    xl: "1280px", // Desktop (Small): 1280px and above
    "2xl": "1440px", // Desktop (HD): 1440px and above
    "3xl": "1920px", // Desktop (FHD): 1920px and above
  }
})