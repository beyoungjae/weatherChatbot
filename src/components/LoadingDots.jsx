import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
`

const DotsContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 4px;
`

const Dot = styled.span.attrs((props) => ({
   style: {
      animationDelay: `${props.$delay}s`,
   },
}))`
   width: 6px;
   height: 6px;
   background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#FFFFFF' : '#4F46E5')};
   border-radius: 50%;
   display: inline-block;
   animation: ${bounce} 1s infinite ease-in-out;
`

// 메세지 전송할 때 로딩 디테일을 표시하는 컴포넌트
export const LoadingDots = ({ $isDarkMode }) => {
   return (
      <DotsContainer>
         <Dot $isDarkMode={$isDarkMode} $delay={0} />
         <Dot $isDarkMode={$isDarkMode} $delay={0.2} />
         <Dot $isDarkMode={$isDarkMode} $delay={0.4} />
      </DotsContainer>
   )
}
