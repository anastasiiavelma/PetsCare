import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './style'
import { BrowserRouter } from 'react-router-dom'
import Root from './routers'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Root />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
