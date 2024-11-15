import styled from 'styled-components'

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
   height: 100vh;
   background-color: ${(props) => props.theme.background};
   color: ${(props) => props.theme.text};
   transition: all 0.3s ease;
`

// 메인 페이지 스타일
export const Main = styled.main`
   display: flex;
   justify-content: center;
`

// 메인 페이지 컨텐츠 스타일
export const Content = styled.div`
   padding: 20px;
   display: flex;
   flex-direction: column;
   margin-top: 200px;
   align-items: center;
   width: 100%;
   max-width: 1200px;
   background-color: ${(props) => props.theme.background};
   color: ${(props) => props.theme.text};
   box-shadow: ${(props) => props.theme.boxShadow};
   transition: all 0.3s ease;
`

// 메인 페이지 타이틀 스타일
export const Title = styled.div`
   font-size: 3rem;
   font-weight: bold;
   background: ${(props) => props.theme.gradient};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-bottom: 30px;
   text-align: center;
   word-break: keep-all;
`
