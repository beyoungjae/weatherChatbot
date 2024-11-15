import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ForumIcon from '@mui/icons-material/Forum'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from './ThemeContext'
import { useContext } from 'react'
import './css/Menu.css'

// 아이콘 슬라이드 애니메이션
const slideRight = keyframes`
  0% {
    transform: translateX(-100%) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
`

const slideLeft = keyframes`
  0% {
    transform: translateX(100%) rotate(180deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
`

const IconWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   width: 24px;
   height: 24px;
   margin-right: 8px;

   svg {
      position: absolute;
      animation: ${(props) => (props.$isDarkMode ? slideLeft : slideRight)} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
   }
`

const StyledButton = styled.button`
   display: flex;
   align-items: center;
   gap: 8px;
   text-decoration: none;
   color: ${(props) => (props.$isDarkMode ? '#fff' : '#333')};
   font-weight: 500;
   padding: 8px 12px;
   border-radius: 8px;
   transition: all 0.2s ease-in-out;
   background: none;
   border: none;
   cursor: pointer;
   font-size: 1rem;

   &:hover {
      background-color: ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
      transform: translateY(-2px);
   }

   .text-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
   }

   svg {
      font-size: 20px;
   }
`

const Header = styled.header`
   width: 100%;
`

const Nav = styled.nav`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   height: 64px;
`

const LeftLogo = styled.div`
   margin-left: 20px;
`

const RightMenu = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
   position: absolute;
   right: 40px;
`

const StyledNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   gap: 8px;
   text-decoration: none;
   color: ${(props) => (props.$isDarkMode ? '#fff' : '#333')};
   font-weight: 500;
   padding: 8px 12px;
   border-radius: 8px;
   transition: all 0.2s ease-in-out;

   &:hover {
      background-color: ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
      transform: translateY(-2px);
   }

   &.active {
      background-color: ${(props) => (props.$isDarkMode ? '#4F378B' : '#7DFB8C')};
      color: ${(props) => (props.$isDarkMode ? '#fff' : '#333')};
      font-weight: 600;
   }

   svg {
      font-size: 20px;
   }
`

function Menu() {
   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

   const handleModeChange = () => {
      setIsDarkMode(!isDarkMode)
   }

   return (
      <Header>
         <Nav>
            <LeftLogo>
               <IconWrapper $isDarkMode={isDarkMode}>{isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}</IconWrapper>
            </LeftLogo>

            <RightMenu>
               <StyledButton $isDarkMode={isDarkMode} onClick={handleModeChange}>
                  <div className="text-wrapper">
                     <IconWrapper $isDarkMode={isDarkMode}>{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}</IconWrapper>
                     {isDarkMode ? '라이트모드' : '다크모드'}
                  </div>
               </StyledButton>

               <StyledNavLink to="/chatbot" $isDarkMode={isDarkMode} className={({ isActive }) => (isActive ? 'active' : '')}>
                  <ForumIcon /> 챗봇
               </StyledNavLink>

               <StyledNavLink to="/weather" $isDarkMode={isDarkMode} className={({ isActive }) => (isActive ? 'active' : '')}>
                  날씨 정보
               </StyledNavLink>

               <StyledNavLink to="/login" $isDarkMode={isDarkMode} className={({ isActive }) => (isActive ? 'active' : '')}>
                  로그인
               </StyledNavLink>
            </RightMenu>
         </Nav>
      </Header>
   )
}

export default Menu
