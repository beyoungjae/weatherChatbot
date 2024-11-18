import React from 'react'
import styled from 'styled-components'
import { LoadingDots } from './LoadingDots'

const MessageContainer = styled.div`
   max-width: 70%;
   min-width: 60px;
   padding: 12px 16px;
   margin: 8px 0;
   border-radius: 15px;
   word-break: break-word;
   white-space: pre-line;
   line-height: 1.5;
   ${({ $isUser, $isDarkMode }) =>
      $isUser
         ? `
    margin-left: auto;
    background: ${$isDarkMode ? '#4F378B' : '#7DFB8C'};
    color: ${$isDarkMode ? '#FFFFFF' : '#1F2937'};
    border-top-right-radius: 5px;
  `
         : `
    margin-right: auto;
    background: ${$isDarkMode ? '#3F3F46' : '#E5E7EB'};
    color: ${$isDarkMode ? '#FFFFFF' : '#1F2937'};
    border-top-left-radius: 5px;
  `}
   animation: fadeIn 0.3s ease-in;

   @keyframes fadeIn {
      from {
         opacity: 0;
         transform: translateY(10px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }
`

const WeatherInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 12px;
   padding: 8px 0;
`

const WeatherSection = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 4px 0;
   border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};

   &:last-child {
      border-bottom: none;
   }
`

const TimeStamp = styled.span`
   font-size: 0.7rem;
   color: ${({ $isDarkMode }) => ($isDarkMode ? '#9CA3AF' : '#6B7280')};
   margin-top: 8px;
   display: block;
   text-align: right;
`
// 날씨 메시지를 포맷팅해서 렌더링해주는 함수
const formatWeatherMessage = (text, $isDarkMode) => {
   if (!text.includes('날씨 정보')) return text

   // 날씨 메시지를 줄바꿈 기준으로 분리
   const sections = text.split('\n\n')
   return (
      <WeatherInfo>
         {/* 각 섹션을 렌더링 */}
         {sections.map((section, index) => (
            <WeatherSection key={index} $isDarkMode={$isDarkMode}>
               {section}
            </WeatherSection>
         ))}
      </WeatherInfo>
   )
}
// 채팅 메시지 컴포넌트
const ChatMessage = ({ message, $isDarkMode, isLoading }) => {
   return (
      // 메시지 컨테이너 스타일 적용
      <MessageContainer $isUser={message.sender === 'user'} $isDarkMode={$isDarkMode}>
         {/* 로딩 상태일 경우 로딩 점 렌더링 */}
         {isLoading ? (
            <LoadingDots $isDarkMode={$isDarkMode} />
         ) : (
            <>
               {/* 날씨 메시지 포맷팅 */}
               {formatWeatherMessage(message.text, $isDarkMode)}
               {/* 메시지 시간 표시 */}
               <TimeStamp $isDarkMode={$isDarkMode}>{new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</TimeStamp>
            </>
         )}
      </MessageContainer>
   )
}

export default ChatMessage
