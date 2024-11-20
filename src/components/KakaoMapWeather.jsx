import { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherByCoords, hideCard } from '../features/weather/weatherSlice'
import styled from 'styled-components'
import { ThemeContext } from './ThemeContext'
import { KAKAO_MAP_KEY } from '../api/weatherApi'

const MapWrapper = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width: 800px;
   margin: 0 auto;
   padding: 20px;
`

const MapContainer = styled.div`
   width: 100%;
   aspect-ratio: 16 / 9;
   min-height: 600px;
   border-radius: 15px;
   overflow: hidden;
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
   margin-bottom: 30px;
`

const WeatherCardContainer = styled.div`
   margin-top: 20px;
   padding: 25px;
   border-radius: 15px;
   animation: slideDown 0.3s ease-out;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#1a1a1a' : 'white')};
   color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
   box-shadow: ${({ $isDarkMode }) => ($isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)')};
   border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};

   @keyframes slideDown {
      from {
         transform: translateY(-20px);
         opacity: 0;
      }
      to {
         transform: translateY(0);
         opacity: 1;
      }
   }

   h3 {
      color: ${({ $isDarkMode }) => ($isDarkMode ? '#6750A4' : '#2a5298')};
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      border-bottom: 2px solid ${({ $isDarkMode }) => ($isDarkMode ? '#6750A4' : '#2a5298')};
      padding-bottom: 10px;
   }

   p {
      margin: 12px 0;
      color: ${({ $isDarkMode }) => ($isDarkMode ? '#E6E1E5' : '#333333')};
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 12px;

      i {
         width: 20px;
         color: ${({ $isDarkMode }) => ($isDarkMode ? '#6750A4' : '#2a5298')};
      }
   }

   button {
      margin-top: 20px;
      width: 100%;
      padding: 12px;
      border: none;
      background: ${({ $isDarkMode }) => ($isDarkMode ? '#6750A4' : '#2a5298')};
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
      font-weight: 500;

      &:hover {
         background: ${({ $isDarkMode }) => ($isDarkMode ? '#4F378B' : '#1e3c72')};
         transform: translateY(-1px);
      }

      &:active {
         transform: translateY(0);
      }
   }
`

function KakaoMapWeather() {
   const mapRef = useRef(null) // 지도 컨테이너 참조
   const markerRef = useRef(null) // 마커를 참조
   const dispatch = useDispatch() // 디스패치 함수 가져오기
   const weatherData = useSelector((state) => state.weather.data) // 날씨 데이터 가져오기
   const showSummary = useSelector((state) => state.weather.showSummary) // 날씨 요약 표시 여부 가져오기
   const { isDarkMode } = useContext(ThemeContext) // 테마 상태 가져오기

   // 지도 객체의 이벤트 관련 함수를 담은 네임스페이스 장소 검색 및 주소-좌표 간 변환 서비스를 포함하고 있다. drawing 라이브러리 네임스페이스. 지도 API의 마커객체와 그리기 요소를 쉽게 지도 위에 그릴 수 있도록 기능을 제공한다 라이브러리를 사용하기 위해서는 반드시 별도 로드 해야 한다.

   // 카카오 맵 공식 문서 참고
   // https://apis.map.kakao.com/web/documentation/#/javascript-v2/map/kakaomap.Map

   useEffect(() => {
      const initMap = () => {
         if (!window.kakao || !window.kakao.maps) return // 카카오 맵이 없으면 초기화 중단

         const container = document.getElementById('map') // 지도 컨테이너 가져오기
         if (!container) return // 지도 컨테이너가 없으면 초기화 중단

         const options = {
            center: new window.kakao.maps.LatLng(37.5143, 126.9784), // 초기 위치 설정 서울 중심
            level: 13, // 초기 확대 레벨 설정 1이면 확대 숫자가 높아질 수록 지도 확장
         }

         const map = new window.kakao.maps.Map(container, options) // 지도 초기화

         window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            const latlng = mouseEvent.latLng // 마우스 이벤트에서 위도와 경도 가져오기

            if (markerRef.current) {
               markerRef.current.setMap(null) // 이전 마커 제거
            }

            const marker = new window.kakao.maps.Marker({
               position: latlng, // 마커 위치 설정
               map: map, // 지도에 마커 추가
            })

            markerRef.current = marker // 마커 참조 업데이트

            dispatch(
               fetchWeatherByCoords({
                  lat: latlng.getLat(), // 위도 가져오기
                  lon: latlng.getLng(), // 경도 가져오기
               })
            )
         })

         mapRef.current = map // 지도 참조 업데이트
      }

      const loadKakaoMapScript = () => {
         return new Promise((resolve) => {
            // 카카오 맵 스크립트 로드 프로미스 반환
            if (window.kakao && window.kakao.maps) {
               // 카카오 맵이 있으면 프로미스 반환
               resolve()
               return
            }
            // 카카오 맵 스크립트 생성
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`
            script.async = true // 비동기 로드
            script.defer = true // 지연 로드

            script.onload = () => {
               // 카카오 맵 스크립트 로드 완료 시 프로미스 반환
               window.kakao.maps.load(() => {
                  // 카카오 맵 스크립트 로드 완료 시 프로미스 반환
                  resolve()
               })
            }
            // 카카오 맵 스크립트 추가
            document.head.appendChild(script)
         })
      }

      // 카카오 맵 스크립트 로드 프로미스 반환 및 지도 초기화
      const initialize = async () => {
         await loadKakaoMapScript() // 카카오 맵 스크립트 로드 프로미스 반환
         initMap() // 지도 초기화
      }

      initialize() // 카카오 맵 스크립트 로드 프로미스 반환 및 지도 초기화

      return () => {
         // 해당 컴포넌트에서 다른 페이지로 이동 시 마커 제거
         if (markerRef.current) {
            markerRef.current.setMap(null) // 마커 제거
            dispatch(hideCard()) // 카드 닫기
         }
         mapRef.current = null // 지도 참조 제거
         markerRef.current = null // 마커 참조 제거
      }
   }, [dispatch])

   return (
      <MapWrapper>
         <MapContainer>
            <div id="map" style={{ width: '100%', height: '100%' }} />
         </MapContainer>
         {showSummary && weatherData && (
            <WeatherCardContainer className="weather-card" $isDarkMode={isDarkMode}>
               <h3>현재 날씨 정보</h3>
               <p>
                  <i className="fas fa-map-marker-alt" />
                  위치: {weatherData.name}
               </p>
               <p>
                  <i className="fas fa-temperature-high" />
                  온도: {Math.round(weatherData.main.temp)}°C
               </p>
               <p>
                  <i className="fas fa-cloud" />
                  날씨: {weatherData.weather[0].description}
               </p>
               <p>
                  <i className="fas fa-tint" />
                  습도: {weatherData.main.humidity}%
               </p>
               <button onClick={() => dispatch(hideCard())}>닫기</button>
            </WeatherCardContainer>
         )}
      </MapWrapper>
   )
}

export default KakaoMapWeather
