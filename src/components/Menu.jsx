import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ForumIcon from '@mui/icons-material/Forum'
import './css/Menu.css'

function Menu() {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <NavLink to="/">{<LightModeIcon />}</NavLink>
               </li>
               <li>
                  <NavLink to="/">다크모드 {<DarkModeIcon />}</NavLink>
               </li>
               <li>
                  <NavLink to="/">챗봇 {<ForumIcon />}</NavLink>
               </li>
               <li>
                  <NavLink to="/">날씨 정보</NavLink>
               </li>
               <li>
                  <NavLink to="/">로그인</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
