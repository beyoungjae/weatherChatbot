import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import { ThemeProvider } from 'styled-components'
import { ThemeContext } from './components/ThemeContext'
import { lightTheme, darkTheme } from './styles/styledComponent'
import { useContext } from 'react'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
   const { isDarkMode } = useContext(ThemeContext)

   return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
         <Provider store={store}>
            <Routes>
               <Route path="/" element={<MainPage />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </Provider>
      </ThemeProvider>
   )
}

export default App
