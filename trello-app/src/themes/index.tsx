import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import {
  createTheme,
  MantineProvider,
  MantineThemeOverride,
  ColorSchemeScript,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const fontFamily = 'Segoe UI, sans-serif'

export const themeConfig: MantineThemeOverride = createTheme({
  fontFamily: fontFamily,
  headings: {
    fontFamily: fontFamily,
    fontWeight: '400',
    textWrap: 'wrap',
    sizes: {
      h1: {
        fontSize: '1.75rem',
        lineHeight: '1rem',
      },
      h2: {
        fontSize: '1rem',
        lineHeight: '1rem',
      },
    },
  },
  cursorType: 'pointer',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  white: '#fff',
  black: '#080a0b',
  colors: {
    backgrounds: [
      '#080a0b',
      '#f1f2f4',
      '#0c66e4',
      '#2AC9DE',
      '#eef3ff',
      '#091e4224',
      '#ffffff3d',
      '#a6c5e229',
      '#44546f',
      '#091e420f',
    ],
    labels: [
      '#4bce97',
      '#f5cd47',
      '#fea362',
      '#f87168',
      '#9f8fef',
      '#579dff',
      '#c6edfb',
      '#d3f1a7',
      '#fdd0ec',
      '#7a84ba',
    ],
  },
  other: {
    text: '#090d12',
    border: '#388bff',
  },
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorSchemeScript forceColorScheme='light' />
      <MantineProvider defaultColorScheme='light' theme={themeConfig} classNamesPrefix='app'>
        <Notifications />
        {children}
      </MantineProvider>
    </>
  )
}

export default ThemeProvider
