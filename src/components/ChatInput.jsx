import React from 'react'
import styled from 'styled-components'

const InputArea = styled.div`
   display: flex;
   gap: 8px;
   padding: 10px;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#2D2D3D' : '#F8F9FA')};
   border-radius: 15px;
`

const Input = styled.input`
   flex: 1;
   padding: 12px 16px;
   border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#4A4A4A' : '#E5E7EB')};
   border-radius: 10px;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#1E1E2E' : '#FFFFFF')};
   color: ${({ $isDarkMode }) => ($isDarkMode ? '#FFFFFF' : '#1F2937')};
   font-size: 14px;

   &:focus {
      outline: none;
      border-color: ${({ $isDarkMode }) => ($isDarkMode ? '#7C3AED' : '#4F46E5')};
   }

   &::placeholder {
      color: ${({ $isDarkMode }) => ($isDarkMode ? '#6B7280' : '#9CA3AF')};
   }
`

const SendButton = styled.button`
   padding: 10px 20px;
   background: ${({ $isDarkMode }) => ($isDarkMode ? '#4F378B' : '#7DFB8C')};
   color: ${({ $isDarkMode }) => ($isDarkMode ? '#FFFFFF' : '#1F2937')};
   border: none;
   border-radius: 10px;
   cursor: pointer;
   transition: all 0.2s;
   font-size: 14px;
   opacity: ${({ disabled }) => (disabled ? '0.7' : '1')};

   &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
   }
`

const ChatInput = ({ $isDarkMode, value, onChange, onKeyPress, onSend, isLoading }) => {
   return (
      <InputArea $isDarkMode={$isDarkMode}>
         <Input type="text" value={value} onChange={onChange} onKeyPress={onKeyPress} placeholder="메시지를 입력하세요..." $isDarkMode={$isDarkMode} disabled={isLoading} />
         <SendButton onClick={onSend} $isDarkMode={$isDarkMode} disabled={isLoading}>
            전송
         </SendButton>
      </InputArea>
   )
}

export default ChatInput
