import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ChatInterface from './components/ChatInterface'
import { ChatProvider } from './context/ChatContext'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatProvider>
        <ChatInterface />
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App