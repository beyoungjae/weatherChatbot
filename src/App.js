import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import WeatherPage from './pages/WeatherPage'
import { ThemeProvider } from './components/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ChatbotPage from './pages/ChatbotPage'

const App = () => {
   return (
      <Provider store={store}>
         <ThemeProvider>
            <Routes>
               <Route path="/" element={<MainPage />} />
               <Route path="/fivedays" element={<WeatherPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/chatbot" element={<ChatbotPage />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </ThemeProvider>
      </Provider>
   )
}

export default App
