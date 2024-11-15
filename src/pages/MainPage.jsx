import { Wrap, Main, Content, Title, ButtonContainer, StyledButton } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import SearchBanner from '../components/SearchBanner'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { showCard } from '../features/weather/weatherSlice'
import WeatherSummation from '../components/WeatherSummation'

function MainPage() {
   const { isDarkMode } = useContext(ThemeContext)
   const dispatch = useDispatch()
   const showSummary = useSelector((state) => state.weather.showSummary)
   const reduxSearchValue = useSelector((state) => state.search.searchValue)

   const handleShowWeather = () => {
      if (!reduxSearchValue) {
         alert('지역을 먼저 검색해주세요!')
         return
      }
      dispatch(showCard())
   }

   return (
      <Wrap>
         <Menu />
         <Main>
            <Content>
               <Title>오늘의 날씨 정보를 확인하세요.</Title>
               <SearchBanner />
               <ButtonContainer>
                  <StyledButton variant="contained" onClick={handleShowWeather}>
                     날씨 요약 확인하기
                  </StyledButton>
                  <StyledButton variant="contained">챗봇이랑 대화하기</StyledButton>
               </ButtonContainer>
               {showSummary && <WeatherSummation />}
            </Content>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MainPage
