import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import WeatherPage from './pages/WeatherPage'
import { ThemeProvider } from './components/ThemeContext'
import ChatbotPage from './pages/ChatbotPage'
import KakaoMapWeatherPage from './pages/KakaoMapWeatherPage'

const App = () => {
   return (
      <ThemeProvider>
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/fivedays" element={<WeatherPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/kakaomap" element={<KakaoMapWeatherPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </ThemeProvider>
   )
}

export default App
