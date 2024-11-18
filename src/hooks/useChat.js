import { useState, useCallback } from 'react'
import { getCurrentWeather } from '../api/weatherApi'
import { processMessage } from '../utils/messageProcessor'

export const useChat = () => {
   // 채팅 메시지 상태 관리
   const [messages, setMessages] = useState([])
   // 사용자 입력 상태 관리
   const [inputValue, setInputValue] = useState('')
   // 로딩 상태 관리
   const [isLoading, setIsLoading] = useState(false)

   // 메시지 추가 함수
   const addMessage = useCallback((message) => {
      setMessages((prev) => [...prev, message])
   }, [])

   // 날씨 조회 함수
   const handleWeatherQuery = useCallback(async (city) => {
      try {
         // 로딩 상태 설정
         setIsLoading(true)
         // 날씨 데이터 조회
         const weatherData = await getCurrentWeather(city)
         // 날씨 데이터 processMessage 함수를 통해 포맷팅
         return processMessage.formatWeatherResponse(weatherData, city)
      } catch (error) {
         console.error('날씨 정보 조회 실패:', error)
         if (error.response?.status === 404) {
            return `죄송합니다. '${city}' 지역의 날씨 정보를 찾을 수 없습니다.`
         }
         return '죄송합니다. 날씨 정보를 가져오는데 실패했습니다.'
      } finally {
         setIsLoading(false)
      }
   }, [])

   // 메시지 전송 함수
   const handleSendMessage = useCallback(async () => {
      if (!inputValue.trim()) return

      // 사용자 메시지 추가
      addMessage({ sender: 'user', text: inputValue })

      try {
         setIsLoading(true)
         // 날씨 관련 키워드 확인
         const weatherQuery = processMessage.checkWeatherQuery(inputValue)
         if (weatherQuery) {
            const response = await handleWeatherQuery(weatherQuery.city)
            addMessage({ sender: 'bot', text: response })
         } else {
            // 일반 대화 처리
            const response = await processMessage.getResponse(inputValue)
            addMessage({ sender: 'bot', text: response })
         }
      } catch (error) {
         console.error('메시지 처리 실패:', error)
         addMessage({
            sender: 'bot',
            text: '죄송합니다. 메시지 처리 중 오류가 발생했습니다.',
         })
      } finally {
         setIsLoading(false)
         setInputValue('')
      }
   }, [inputValue, addMessage, handleWeatherQuery])

   // 사용자 입력 변경 함수
   const handleInputChange = useCallback((e) => {
      setInputValue(e.target.value)
   }, [])

   // 엔터 키 입력 처리 함수
   const handleKeyPress = useCallback(
      (e) => {
         if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
         }
      },
      [handleSendMessage]
   )

   return {
      messages,
      inputValue,
      isLoading,
      handleInputChange,
      handleSendMessage,
      handleKeyPress,
   }
}
