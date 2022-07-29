import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from 'contexts/AuthContext'
import { ThemeContext as ThemeProvider } from 'contexts/ThemeContext'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <SnackbarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
