import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { Button } from '@mui/material'
import { hideCard } from '../features/weather/weatherSlice'
import { getCurrentWeather } from '../api/weatherApi'
import CircularProgress from '@mui/material/CircularProgress'

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
   background: ${(props) => (props.isDarkMode ? '#1a1a1a' : 'white')};
   color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
   border-radius: 20px;
   padding: 35px;
   box-shadow: ${(props) => (props.isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)')};
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
   animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.6s ease-out;
   visibility: ${(props) => (props.isClosing ? 'hidden' : 'visible')};
   backdrop-filter: blur(8px);
   border: 1px solid ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};

   &:hover {
      box-shadow: ${(props) => (props.isDarkMode ? '0 12px 48px rgba(0, 0, 0, 0.4)' : '0 12px 48px rgba(0, 0, 0, 0.15)')};
   }
`

const WeatherInfo = styled.div`
   display: flex;
   align-items: center;
   gap: 30px;
   padding: 25px;
   background: ${(props) => (props.isDarkMode ? '#2d2d2d' : '#f8f9fa')};
   border-radius: 16px;
   width: 100%;
   animation: ${slideIn} 0.6s ease-out;
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-5px);
      box-shadow: ${(props) => (props.isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)')};
   }
`

const Title = styled.h2`
   font-size: 2.2rem;
   font-weight: 600;
   margin: 0;
   background: ${(props) => (props.isDarkMode ? 'linear-gradient(135deg, #e0e0e0, #ffffff)' : 'linear-gradient(135deg, #2d2d2d, #000000)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: ${slideIn} 0.4s ease-out;
`

const Temperature = styled.div`
   font-size: 3rem;
   font-weight: bold;
   margin-bottom: 10px;
   background: ${(props) => (props.isDarkMode ? 'linear-gradient(135deg, #4F378B, #FFD8E4)' : 'linear-gradient(135deg, #05c9ff, #09ff36)')};
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
   width: 100px;
   height: 100px;
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
   const searchValue = useSelector((state) => state.search.searchValue)
   const { isDarkMode } = useContext(ThemeContext)
   const dispatch = useDispatch()
   const [weather, setWeather] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [isClosing, setIsClosing] = useState(false)

   useEffect(() => {
      const fetchWeather = async () => {
         try {
            setLoading(true)
            const response = await getCurrentWeather(searchValue)
            setWeather(response.data)
            setError(null)
         } catch (err) {
            setError('날씨 정보를 불러오는데 실패했습니다.')
         } finally {
            setLoading(false)
         }
      }

      if (searchValue) {
         fetchWeather()
      }
   }, [searchValue])

   const handleClose = () => {
      setIsClosing(true)
      setTimeout(() => {
         dispatch(hideCard())
      }, 600)
   }

   if (loading) {
      return (
         <Card isDarkMode={isDarkMode}>
            <CircularProgress color={isDarkMode ? 'secondary' : 'primary'} />
         </Card>
      )
   }

   if (error) {
      return (
         <Card isDarkMode={isDarkMode}>
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

   return (
      <Card isDarkMode={isDarkMode} isClosing={isClosing}>
         <Title isDarkMode={isDarkMode}>{searchValue} 날씨</Title>
         <WeatherInfo isDarkMode={isDarkMode}>
            <div>
               <WeatherIcon src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather icon" />
            </div>
            <WeatherDetails>
               <Temperature isDarkMode={isDarkMode}>{Math.round(weather?.main.temp)}°C</Temperature>
               <div>{weather?.weather[0].description}</div>
               <div>체감온도: {Math.round(weather?.main.feels_like)}°C</div>
               <div>습도: {weather?.main.humidity}%</div>
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
