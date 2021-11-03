import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import DataActionsContextTag from './context'

const theme = createTheme({
  palette: {
    primary: {
      light: '#5BB110',
      main: '#5BB110',
      dark: '#5BB110',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#232323',
      main: '#232323',
      dark: '#232323',
      contrastText: '#ffffff',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataActionsContextTag>
        <App />
      </DataActionsContextTag>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
