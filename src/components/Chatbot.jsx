import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ThemeContext } from './ThemeContext'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ChatHeader from './ChatHeader'
import { useChat } from '../hooks/useChat'

const ChatContainer = styled.div`
   max-width: 500px;
   min-height: 600px;
   margin: 0 auto;
   padding: 20px;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#1E1E2E' : '#FFFFFF')};
   border-radius: 20px;
   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`

const ChatArea = styled.div`
   height: 450px;
   overflow-y: auto;
   padding: 15px;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#2D2D3D' : '#F8F9FA')};
   border-radius: 15px;
   margin: 15px 0;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-thumb {
      background: ${({ $isDarkMode }) => ($isDarkMode ? '#4A4A4A' : '#CCC')};
      border-radius: 3px;
   }
`

const Chatbot = () => {
   // 테마 컨텍스트 사용
   const { isDarkMode } = useContext(ThemeContext)
   // 채팅 영역 useRef 사용으로 null 초기값 설정
   const chatAreaRef = useRef(null)
   // 채팅 훅 사용
   const { messages, inputValue, isLoading, handleInputChange, handleSendMessage, handleKeyPress } = useChat()

   useEffect(() => {
      // 채팅 영역 스크롤 위치 조정
      if (chatAreaRef.current) {
         chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
      }
   }, [messages]) // 메시지 변경 시 스크롤 위치 조정

   return (
      <ChatContainer $isDarkMode={isDarkMode}>
         <ChatHeader $isDarkMode={isDarkMode} />
         <ChatArea ref={chatAreaRef} $isDarkMode={isDarkMode}>
            {/* 메시지 렌더링 */}
            {messages.map((message, index) => (
               <ChatMessage key={index} message={message} $isDarkMode={isDarkMode} isLoading={isLoading && index === messages.length - 1} />
            ))}
         </ChatArea>
         <ChatInput $isDarkMode={isDarkMode} value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} onSend={handleSendMessage} isLoading={isLoading} />
      </ChatContainer>
   )
}

export default Chatbot
