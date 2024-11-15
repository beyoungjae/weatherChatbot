import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import { ThemeProvider } from 'styled-components'
import { ThemeContext } from './components/ThemeContext'
import { lightTheme, darkTheme } from './styles/styledComponent'
import { useContext } from 'react'

function App() {
   const { isDarkMode } = useContext(ThemeContext)

   return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </ThemeProvider>
   )
}

export default App
