import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useContext, useEffect, useCallback } from 'react'
import { ThemeContext } from './ThemeContext'
import { Button } from '@mui/material'
import { hideCard } from '../features/weather/weatherSlice'
import { getCurrentWeather } from '../api/weatherApi'
import CircularProgress from '@mui/material/CircularProgress'

// 스타일 및 애니메이션은 ai 참고
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Card = styled.div`
   background: ${(props) => (props.$isDarkMode ? '#1a1a1a' : 'white')};
   color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
   border-radius: 20px;
   padding: 35px;
   box-shadow: ${(props) => (props.$isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)')};
   width: 100%;
   max-width: 500px;
   transition: all 0.4s ease;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 25px;
   animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.5s ease-in-out forwards;
   opacity: ${(props) => (props.$isClosing ? 0 : 1)};
   pointer-events: ${(props) => (props.$isClosing ? 'none' : 'auto')};
   backdrop-filter: blur(8px);
   border: 1px solid ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};

   &:hover {
      box-shadow: ${(props) => (props.$isDarkMode ? '0 12px 48px rgba(0, 0, 0, 0.4)' : '0 12px 48px rgba(0, 0, 0, 0.15)')};
   }
`

const WeatherInfo = styled.div`
   display: flex;
   align-items: center;
   gap: 30px;
   padding: 25px;
   background: ${(props) => (props.$isDarkMode ? '#2d2d2d' : '#f8f9fa')};
   border-radius: 16px;
   width: 100%;
   animation: ${slideIn} 0.6s ease-out;
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-5px);
      box-shadow: ${(props) => (props.$isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)')};
   }
`

const Title = styled.h2`
   font-size: 2.2rem;
   font-weight: 600;
   margin: 0;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #e0e0e0, #ffffff)' : 'linear-gradient(135deg, #2d2d2d, #000000)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: ${slideIn} 0.4s ease-out;
`

const Temperature = styled.div`
   font-size: 3rem;
   font-weight: bold;
   margin-bottom: 10px;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #4F378B, #FFD8E4)' : 'linear-gradient(135deg, #05c9ff, #09ff36)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`

const WeatherDetails = styled.div`
   display: flex;
   flex-direction: column;
   gap: 12px;
   font-size: 1.2rem;
   animation: ${slideIn} 0.8s ease-out;
`

const WeatherIcon = styled.img`
   filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
   animation: ${slideIn} 0.6s ease-out;
   transition: all 0.3s ease;
   &:hover {
      transform: scale(1.1);
   }
`

const StyledButton = styled(Button)`
   width: 100%;
   padding: 12px !important;
   border-radius: 12px !important;
   font-size: 1.1rem !important;
   text-transform: none !important;
   transition: all 0.3s ease !important;
   animation: ${slideIn} 1s ease-out;

   &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   }
`

function WeatherCard() {
   // 검색 값 가져오기
   const searchValue = useSelector((state) => state.search.searchValue)
   // 테마 상태 가져오기
   const { isDarkMode } = useContext(ThemeContext)
   // 디스패치 함수 가져오기
   const dispatch = useDispatch()
   // 날씨 상태 가져오기
   const weatherData = useSelector((state) => state.weather)
   // 로딩, 에러, 닫기 상태 가져오기
   const { loading, error, isClosing } = weatherData

   // 검색 값이 변경될 때마다 날씨 정보 가져오기
   useEffect(() => {
      const fetchWeather = async () => {
         try {
            const data = await getCurrentWeather(searchValue)
            dispatch({ type: 'weather/weather', payload: data })
         } catch (err) {
            console.log('에러:', err)
            dispatch({ type: 'weather/error', payload: '날씨 정보를 불러오는데 실패했습니다.' })
         }
      }

      if (searchValue) {
         fetchWeather()
      }
   }, [searchValue, dispatch])

   // 카드 닫기
   const handleClose = useCallback(() => {
      dispatch({ type: 'weather/isClosing', payload: true })
      setTimeout(() => {
         dispatch(hideCard())
      }, 100)
   }, [dispatch])

   // 로딩 중일 때 로딩 아이콘 반환
   if (loading) {
      return (
         <Card $isDarkMode={isDarkMode}>
            <CircularProgress color={isDarkMode ? 'secondary' : 'primary'} />
         </Card>
      )
   }

   // 에러 상태일 때 에러 메시지 반환
   if (error) {
      return (
         <Card $isDarkMode={isDarkMode}>
            <div>{error}</div>
            <Button
               variant="contained"
               onClick={handleClose}
               style={{
                  backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C',
               }}
            >
               닫기
            </Button>
         </Card>
      )
   }

   // 날씨 정보가 있을 때 날씨 카드 반환
   return (
      <Card $isDarkMode={isDarkMode} $isClosing={isClosing}>
         <Title $isDarkMode={isDarkMode}>{searchValue} 날씨</Title>
         <WeatherInfo $isDarkMode={isDarkMode}>
            <div>
               <WeatherIcon src={`https://openweathermap.org/img/wn/${weatherData.weather?.weather[0].icon}@4x.png`} alt="weather icon" />
            </div>
            <WeatherDetails>
               <Temperature $isDarkMode={isDarkMode}>{Math.round(weatherData.weather?.main.temp)}°C</Temperature>
               <div>{weatherData.weather?.weather[0].description}</div>
               <div>체감온도: {Math.round(weatherData.weather?.main.feels_like)}°C</div>
               <div>습도: {weatherData.weather?.main.humidity}%</div>
            </WeatherDetails>
         </WeatherInfo>
         <StyledButton
            variant="contained"
            onClick={handleClose}
            style={{
               backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C',
            }}
         >
            닫기
         </StyledButton>
      </Card>
   )
}

export default WeatherCard
