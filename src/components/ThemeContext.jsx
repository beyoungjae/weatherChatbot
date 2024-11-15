import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
   const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark'
   })

   useEffect(() => {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
   }, [isDarkMode])

   return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeContext.Provider>
}
