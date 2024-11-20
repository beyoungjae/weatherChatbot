import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = '9510747a3798c51b80ba48582bf7f809'

// 도시 이름을 영어로 변환하는 매핑 (전국 지역명을 영어로 매핑, 모든 지역을 매핑하기에는 너무 많아서 일부만 매핑)
const cityNameMapping = {
   서울: 'Seoul',
   부산: 'Busan',
   인천: 'Incheon',
   대구: 'Daegu',
   대전: 'Daejeon',
   광주: 'Gwangju',
   울산: 'Ulsan',
   세종: 'Sejong',
   수원: 'Suwon',
   용인: 'Yongin',
   고양: 'Goyang',
   창원: 'Changwon',
   성남: 'Seongnam',
   청주: 'Cheongju',
   제주: 'Jeju',
   전주: 'Jeonju',
   천안: 'Cheonan',
   안산: 'Ansan',
   안양: 'Anyang',
}

// API 호출을 위한 axios 인스턴스 생성
const weatherApi = axios.create({
   baseURL: BASE_URL, // API URL을 변수에 담아서 사용
   params: {
      appid: API_KEY, // API KEY를 변수에 담아서 사용
      units: 'metric', // 섭씨 온도 사용
      lang: 'kr', // 한국어 응답
   },
})

// 공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await weatherApi.get(url, { params })

      return {
         response,
         data: response.data,
      }
   } catch (error) {
      console.log(`API 요청 오류 : ${error.message}`)
      throw error
   }
}

// 현재 날씨 가져오기
export const getCurrentWeather = async (city) => {
   // 한글 도시명을 영어로 변환하거나 국가 코드 추가
   const searchCity = cityNameMapping[city] || `${city},KR`
   const { data } = await fetchFromApi('/weather', { q: searchCity })
   return data
}

// 5일 예보 조회
export const getFiveDayWeather = async (city) => {
   try {
      const searchCity = cityNameMapping[city] || city // 도시명 처리

      const response = await weatherApi.get('/forecast', {
         params: {
            q: `${searchCity},KR`,
         },
      })

      return response.data // 응답 데이터 반환
   } catch (error) {
      console.error('예보 정보 조회 실패:', error)
      throw error
   }
}

// 위도/경도로 현재 날씨 조회
export const getWeatherByCoords = async (lat, lon) => {
   const { data } = await fetchFromApi('/weather', {
      lat: lat,
      lon: lon,
   })
   return data
}

export const KAKAO_MAP_KEY = 'cdc8d8d8117901578b9aec0ff8b430b4'
