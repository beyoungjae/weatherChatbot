import WeatherCard from './WeatherCard'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import styled, { keyframes } from 'styled-components'
import { useSelector } from 'react-redux'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: ${(props) => (props.$isDarkMode ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)')};
   color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
   z-index: 1000;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 20px;
   transition: all 0.3s ease;
   animation: ${fadeIn} 0.3s ease-out;
   backdrop-filter: blur(8px);
`

function WeatherSummation() {
   // 테마 상태 가져오기
   const { isDarkMode } = useContext(ThemeContext)
   // 검색 값 가져오기
   const searchValue = useSelector((state) => state.search.searchValue)

   // 검색 값이 없으면 null 반환
   if (!searchValue) {
      return null
   }

   // 검색 값이 있으면 날씨 카드 반환
   return (
      <Container $isDarkMode={isDarkMode}>
         <WeatherCard />
      </Container>
   )
}

export default WeatherSummation
