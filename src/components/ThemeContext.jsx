import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/styledComponent'

export const ThemeContext = createContext() // 테마 상태 컨텍스트

export const ThemeProvider = ({ children }) => {
   // 다크 모드 상태 관리
   const [isDarkMode, setIsDarkMode] = useState(() => {
      // 로컬 스토리지에서 다크 모드 상태 가져오기
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark'
   })

   useEffect(() => {
      // 로컬 스토리지에 다크 모드 상태 저장
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      // 바디 태그에 다크 모드 상태 저장
      document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
   }, [isDarkMode])

   return (
      // 테마 상태를 여러 컴포넌트에 제공
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
         <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</StyledThemeProvider>
      </ThemeContext.Provider>
   )
}
