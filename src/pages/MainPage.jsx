import { Wrap, Main, Content, Title, ButtonContainer, StyledButton } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import SearchBanner from '../components/SearchBanner'
import { useDispatch, useSelector } from 'react-redux'
import { showCard } from '../features/weather/weatherSlice'
import WeatherSummation from '../components/WeatherSummation'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
function MainPage() {
   // 리덕스 슬라이스 가져오기
   const dispatch = useDispatch()
   const showSummary = useSelector((state) => state.weather.showSummary) // 날씨 요약 상태
   const reduxSearchValue = useSelector((state) => state.search.searchValue) // 검색 값
   const user = useSelector((state) => state.auth.user) // 유저 정보 가져오기
   const navigate = useNavigate()

   // 날씨 요약 확인하기 버튼 클릭 시 실행되는 함수
   const handleShowWeather = useCallback(() => {
      // 유저 정보가 없으면 로그인 페이지로 이동
      if (!user) {
         alert('로그인이 필요한 서비스입니다.')
         navigate('/login')
         return
      }
      // 검색 값이 없으면 검색 페이지로 이동
      if (!reduxSearchValue) {
         alert('지역을 먼저 검색해주세요!')
         return
      }
      dispatch(showCard()) // 날씨 요약 상태 변경
   }, [user, navigate, reduxSearchValue, dispatch])

   // 챗봇이랑 대화하기 버튼 클릭 시 실행되는 함수
   const handleChatBot = useCallback(() => {
      // 유저 정보가 없으면 로그인 페이지로 이동
      if (!user) {
         alert('로그인이 필요한 서비스입니다.')
         navigate('/login')
         return
      }
      navigate('/chatbot') // 챗봇 페이지로 이동
   }, [user, navigate])

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
                  <StyledButton variant="contained" onClick={handleChatBot}>
                     챗봇이랑 대화하기
                  </StyledButton>
               </ButtonContainer>
               {showSummary && <WeatherSummation />}
            </Content>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MainPage
