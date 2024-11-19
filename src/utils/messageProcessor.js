// 날씨 상태에 따른 아이콘 매핑
const getWeatherIcon = (description) => {
   if (description.includes('맑음')) return '☀️'
   if (description.includes('구름')) return '☁️'
   if (description.includes('비')) return '🌧️'
   if (description.includes('눈')) return '🌨️'
   if (description.includes('안개')) return '🌫️'
   return '🌤️'
}

// 메세지를 처리해주는 함수
export const processMessage = {
   // 날씨 쿼리 확인 함수
   checkWeatherQuery: (input) => {
      const weatherKeywords = ['날씨', '기온', '온도', '비', '맑음', '흐림'] // 날씨 관련 키워드
      const cityPattern = /([가-힣]+)(?:시|도)?/ // 한글 지역명 패턴 AI 추천 사용
      const cityMatch = input.match(cityPattern) // 지역명 추출

      if (weatherKeywords.some((keyword) => input.includes(keyword)) && cityMatch) {
         // 날씨 관련 키워드와 지역명이 포함된 경우
         return { city: cityMatch[1] } // 지역명 반환
      }
      return null
   },

   // 날씨 데이터를 포맷팅해주는 함수
   formatWeatherResponse: (weatherData, city) => {
      // 날씨 데이터가 없는 경우
      if (!weatherData) return '죄송해요, 날씨 정보를 가져오는데 실패했어요.'

      const temp = Math.round(weatherData.main.temp) // 기온
      const description = weatherData.weather[0].description // 날씨 상태
      const humidity = weatherData.main.humidity // 습도
      const feelsLike = Math.round(weatherData.main.feels_like) // 체감온도
      const weatherIcon = getWeatherIcon(description) // 날씨 아이콘

      // 날씨 정보를 보기 좋게 표시해줌
      return `[ ${city} 날씨 정보 ${weatherIcon} ]

🌡️ 현재 기온
${temp}°C (체감온도 ${feelsLike}°C)

🌤️ 날씨 상태
${description}

💧 습도
${humidity}%


지역을 바꾸시려면 다른 지역의 이름을 입력해주세요.`
   },

   // 기본 응답 함수 머신러닝 포기
   getBasicResponse: (input) => {
      // 기본 키워드 배열 설정 (안녕 => 안녕하세요, 뭐하 => 뭐하냐, 도움 => 도움을 줘 등으로 키워드가 들어가면 대답 인식해서 반환)
      const patterns = {
         greetings: ['안녕', '하이', '헬로', '반가워'],
         questions: ['뭐해', '머해', '모해', '뭐하', '무엇을'],
         thanks: ['고마워', '감사', '땡큐'],
         help: ['도움', '사용법', '어떻게'],
      }

      // 인사 키워드가 포함된 경우
      if (patterns.greetings.some((word) => input.includes(word))) {
         const responses = ['안녕하세요! 날씨 정보가 필요하신가요?', '반갑습니다! 어떤 지역의 날씨를 알려드릴까요?', '안녕하세요! 무엇을 도와드릴까요?']
         return responses[Math.floor(Math.random() * responses.length)] // 랜덤 응답 반환
      }

      // 질문 키워드가 포함된 경우
      if (patterns.questions.some((word) => input.includes(word))) {
         return '저는 현재 날씨 정보만 알려드리고 있어요! 지역명을 말씀해주시면 해당 지역의 현재 날씨를 알려드릴게요.'
      }

      // 감사 키워드가 포함된 경우
      if (patterns.thanks.some((word) => input.includes(word))) {
         return '천만에요! 다음에는 더 나은 서비스로 찾아뵙겠습니다.'
      }

      // 도움 키워드가 포함된 경우
      if (patterns.help.some((word) => input.includes(word))) {
         return '원하시는 지역의 날씨를 알고 싶으시다면 "[지역명] 날씨 알려줘" 라고 말씀해주세요!'
      }

      // 기본 응답
      return '죄송해요, 잘 이해하지 못했어요. 날씨 정보가 필요하시다면 원하시는 "[지역명] 날씨 알려줘" 라고 한글로 물어봐주세요!'
   },

   // 메세지를 처리해주는 함수
   getResponse: async (input) => {
      const weatherQuery = processMessage.checkWeatherQuery(input)
      if (weatherQuery) {
         return weatherQuery
      }
      return processMessage.getBasicResponse(input)
   },
}
