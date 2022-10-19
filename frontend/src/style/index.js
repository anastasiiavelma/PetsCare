import { createTheme } from '@mui/material'
import RobotoBold from '../assets/fonts/RobotoMono-Bold.ttf'
import RobotoLight from '../assets/fonts/RobotoMono-Light.ttf'

export const theme = createTheme({
  palette: {
    primary: {
      light: '',
      main: '#503007'
    },
    secondary: {
      main: '#fbfbfb'
    },
    background: {
      default: '#020202'
    },
    mode: 'light'
  },
  typography: {
    h1: {
      fontFamily: 'RobotoBold, sans-serief',
      fontWeight: 200
    },
    h2: {
      fontFamily: 'RobotoBold, sans-serief',
      fontWeight: 200
    },
    h3: {
      fontFamily: 'RobotoBold, sans-serief',
      fontWeight: 200
    },
    h4: {
      fontFamily: 'RobotoLight, sans-serief',
      fontWeight: 200
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
        margin: 0;
        padding: 0;
        }
        @font-face {
            font-family: 'RobotoBold';
            font-style: bold;
            font-display: swap;
            font-weight: 700;
            src: url(${RobotoBold}) format('ttf');
        }
        @font-face {
            font-family: 'RobotoLight';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${RobotoLight}) format('ttf');
        }
      `
    }
  }
})
