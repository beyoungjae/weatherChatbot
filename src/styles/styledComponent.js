import styled, { keyframes } from 'styled-components'
import { Button } from '@mui/material'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

// 테마 객체 정의
export const lightTheme = {
   background: '#ffffff',
   text: '#000000',
   gradient: 'linear-gradient(to right, #05c9ff, #09ff36)',
   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
   buttonHover: '#f0f0f0',
   backgroundColor: '#60E47D',
}

export const darkTheme = {
   background: '#3c3941',
   text: '#ffffff',
   gradient: 'linear-gradient(to right, #4F378B, #FFD8E4)',
   boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
   buttonHover: '#2a2a2a',
   backgroundColor: '#4F378B',
}

// 전체 페이지 스타일
export const Wrap = styled.div`
   min-height: 100vh;
   background-color: ${(props) => props.theme.background};
   color: ${(props) => props.theme.text};
   transition: all 0.3s ease;
   overflow-x: hidden;
`

// 메인 페이지 스타일
export const Main = styled.main`
   display: flex;
   justify-content: center;
   padding: 0 20px;
`

// 메인 페이지 컨텐츠 스타일
export const Content = styled.div`
   padding: 40px;
   display: flex;
   flex-direction: column;
   margin-top: 120px;
   align-items: center;
   width: 100%;
   max-width: 1200px;
   background-color: ${(props) => props.theme.background};
   color: ${(props) => props.theme.text};
   border-radius: 20px;
   box-shadow: ${(props) => props.theme.boxShadow};
   transition: all 0.3s ease;
   animation: ${fadeIn} 0.6s ease-out;

   @media (max-width: 768px) {
      margin-top: 100px;
      padding: 20px;
   }
`

// 메인 페이지 타이틀 스타일
export const Title = styled.div`
   font-size: 3.5rem;
   font-weight: bold;
   background: ${(props) => props.theme.gradient};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-bottom: 40px;
   text-align: center;
   word-break: keep-all;
   animation: ${float} 3s ease-in-out infinite;

   @media (max-width: 768px) {
      font-size: 2.5rem;
   }

   @media (max-width: 480px) {
      font-size: 2rem;
   }
`

export const ButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
   margin-top: 50px;
   width: 300px;
   animation: ${fadeIn} 0.8s ease-out;

   @media (max-width: 480px) {
      width: 100%;
   }
`

export const StyledButton = styled(Button)`
   padding: 15px 25px !important;
   border-radius: 12px !important;
   font-size: 1.1rem !important;
   text-transform: none !important;
   transition: all 0.3s ease !important;
   background-color: ${(props) => props.theme.backgroundColor} !important;
   color: ${(props) => props.theme.text} !important;
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;

   &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
   }

   @media (max-width: 480px) {
      font-size: 1rem !important;
   }
`
