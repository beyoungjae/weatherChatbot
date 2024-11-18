import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 15px 0;
   border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#363636' : '#E5E7EB')};
`

const Title = styled.h2`
   margin: 0;
   color: ${({ $isDarkMode }) => ($isDarkMode ? '#FFFFFF' : '#1F2937')};
   font-size: 1.5rem;
`

const ChatHeader = ({ $isDarkMode }) => {
   return (
      <Header $isDarkMode={$isDarkMode}>
         <Title $isDarkMode={$isDarkMode}>날씨 챗봇</Title>
      </Header>
   )
}

export default ChatHeader
