import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '9510747a3798c51b80ba48582bf7f809'

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
   return fetchFromApi('/weather', { q: city })
}

// 5일 날씨 예보 가져오기
export const getFiveDayWeather = (city) => {
   return fetchFromApi('/forecast/daily', { q: city, cnt: 5 })
}
