import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '9510747a3798c51b80ba48582bf7f809'

// 도시 이름을 영어로 변환하는 매핑
const cityNameMapping = {
   서울: 'Seoul',
   인천: 'Incheon',
   부산: 'Busan',
   대구: 'Daegu',
   대전: 'Daejeon',
   광주: 'Gwangju',
   울산: 'Ulsan',
   세종: 'Sejong',
   제주: 'Jeju',
   강릉: 'Gangneung',
   춘천: 'Chuncheon',
   원주: 'Wonju',
   속초: 'Sokcho',
   포항: 'Pohang',
   경주: 'Gyeongju',
   거제: 'Geoje',
}

// api 호출하기 axios 객체 생성
const weatherApi = axios.create({
   baseURL: BASE_URL,
   params: {
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
   },
})

// 공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await weatherApi.get(url, { params })
      return response
   } catch (error) {
      console.log(`API 요청 오류 : ${error.message}`)
      throw error
   }
}

// 현재 날씨 가져오기
export const getCurrentWeather = (city) => {
   // 한글 도시명을 영어로 변환하거나 국가 코드 추가
   const searchCity = cityNameMapping[city] || `${city},KR`
   return fetchFromApi('/weather', { q: searchCity })
}

// 5일 날씨 예보 가져오기
export const getFiveDayWeather = (city) => {
   const searchCity = cityNameMapping[city] || `${city},KR`
   return fetchFromApi('/forecast/daily', { q: searchCity })
}
