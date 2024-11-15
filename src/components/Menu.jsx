import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ForumIcon from '@mui/icons-material/Forum'
import './css/Menu.css'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function Menu() {
   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

   const handleModeChange = () => {
      setIsDarkMode(!isDarkMode)
   }

   return (
      <header>
         <nav>
            <ul>
               <li style={{ display: 'flex', alignItems: 'center' }}>{isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}</li>
               <li>
                  <Button onClick={handleModeChange} sx={{ color: isDarkMode ? 'white' : 'black' }}>
                     {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                     {isDarkMode ? '라이트모드' : '다크모드'}
                  </Button>
               </li>
               <li>
                  <NavLink to="/chatbot" className={({ isActive }) => (isActive ? 'active' : '')}>
                     <ForumIcon /> 챗봇
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/weather" className={({ isActive }) => (isActive ? 'active' : '')}>
                     날씨 정보
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                     로그인
                  </NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
