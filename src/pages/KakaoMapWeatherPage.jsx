import React, { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'
import styled from 'styled-components'
import KakaoMapWeather from '../components/KakaoMapWeather'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const PageContainer = styled.div`
   min-height: 100vh;
   background: ${(props) => (props.$isDarkMode ? '#3c3941' : 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)')};
`

const ContentWrapper = styled.div`
   padding: 100px 20px;
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   justify-content: center;
   align-items: center;
`

const MapContainer = styled.div`
   background: ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
   backdrop-filter: blur(10px);
   border-radius: 20px;
   padding: 30px;
   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
   border: 1px solid rgba(255, 255, 255, 0.18);

   h2 {
      color: ${(props) => (props.$isDarkMode ? '#ffffff' : '#000000')};
      margin-bottom: 20px;
      font-size: 24px;
      text-align: center;
   }
`

const WeatherCard = styled.div`
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)')};
   padding: 25px;
   border-radius: 15px;
   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
   animation: slideIn 0.3s ease-out;

   @keyframes slideIn {
      from {
         transform: translate(-50%, -40%);
         opacity: 0;
      }
      to {
         transform: translate(-50%, -50%);
         opacity: 1;
      }
   }

   h3 {
      color: ${(props) => (props.$isDarkMode ? '#2a5298' : '#2a5298')};
      margin-bottom: 15px;
      font-size: 20px;
      border-bottom: 2px solid ${(props) => (props.$isDarkMode ? '#2a5298' : '#2a5298')};
      padding-bottom: 10px;
   }

   p {
      margin: 10px 0;
      color: #333;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
   }

   button {
      margin-top: 15px;
      width: 100%;
      padding: 10px;
      border: none;
      background: ${(props) => (props.$isDarkMode ? '#2a5298' : '#2a5298')};
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
         background: ${(props) => (props.$isDarkMode ? '#1e3c72' : '#1e3c72')};
      }
   }
`

function KakaoMapWeatherPage() {
   const { isDarkMode } = useContext(ThemeContext)

   const user = useSelector((state) => state.auth.user) // 유저 정보 가져오기
   const navigate = useNavigate()
   useEffect(() => {
      // 로그인을 해야 사용이 가능함
      if (!user) {
         alert('로그인이 필요한 서비스입니다.')
         navigate('/login')
      }
   }, [user, navigate])

   // 유저 정보가 없으면 null 반환
   if (!user) return null

   return (
      <PageContainer $isDarkMode={isDarkMode}>
         <Menu $isDarkMode={isDarkMode} />
         <ContentWrapper $isDarkMode={isDarkMode}>
            <MapContainer $isDarkMode={isDarkMode}>
               <h2>지도를 클릭하여 날씨 확인하기</h2>
               <KakaoMapWeather WeatherCard={WeatherCard} />
            </MapContainer>
         </ContentWrapper>
         <Footer $isDarkMode={isDarkMode} />
      </PageContainer>
   )
}

export default KakaoMapWeatherPage
