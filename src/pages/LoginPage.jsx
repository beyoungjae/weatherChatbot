// 라이브러리 우선으로 가져오기
import { ThemeContext } from '../components/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext, useCallback } from 'react'
// 리덕스 슬라이스 가져오기
import { loginUser, clearError } from '../features/auth/authSlice'

// 컴포넌트에서 가져오기
import Menu from '../components/Menu'
import Footer from '../components/Footer'

// 스타일 컴포넌트 가져오기
import styled, { keyframes } from 'styled-components'
import TextField from '@mui/material/TextField'
import { alpha } from '@mui/material/styles'
import { Button } from '@mui/material'

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

const Title = styled.div`
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

const LoginContainer = styled.div`
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   background-color: ${({ theme }) => theme.bgColor};
   border-radius: 8px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 15px;
`

const StyledTextField = styled(TextField)`
   & .MuiOutlinedInput-root {
      transition: all 0.3s ease;
      border-radius: 12px;
      background-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.05) : alpha('#000000', 0.03))};

      & fieldset {
         border-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1))};
      }

      &:hover fieldset {
         border-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.2) : alpha('#000000', 0.2))};
      }

      &.Mui-focused fieldset {
         border-color: ${(props) => (props.$isDarkMode ? '#4F378B' : '#7DFB8C')};
      }
   }

   & .MuiInputBase-input {
      color: ${(props) => (props.$isDarkMode ? '#ffffff' : '#000000')};
      &::placeholder {
         color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.5) : alpha('#000000', 0.5))};
      }
   }
`

const LoginButton = styled(Button)`
   padding: 12px !important;
   border-radius: 12px !important;
   background-color: ${(props) => (props.$isDarkMode ? '#4F378B' : '#7DFB8C')} !important;
   transition: all 0.3s ease !important;
   box-shadow: 0 4px 12px ${(props) => (props.$isDarkMode ? 'rgba(79, 55, 139, 0.2)' : 'rgba(125, 251, 140, 0.2)')} !important;
   color: ${(props) => (props.$isDarkMode ? '#ffffff' : '#000000')} !important;

   &:hover {
      transform: translateY(-2px);
      background-color: ${(props) => (props.$isDarkMode ? '#5F479B' : '#8DFB9C')} !important;
      box-shadow: 0 6px 16px ${(props) => (props.$isDarkMode ? 'rgba(79, 55, 139, 0.3)' : 'rgba(125, 251, 140, 0.3)')} !important;
   }

   &:disabled {
      background-color: #cccccc !important;
      cursor: not-allowed;
      transform: none;
   }
`

const ErrorMessage = styled.div`
   color: red;
   font-size: 14px;
   margin-top: 10px;
`

function LoginPage() {
   // 로그인 정보 상태 관리
   const [credentials, setCredentials] = useState({
      username: '',
      password: '',
   })

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const authState = useSelector((state) => state.auth) // 유저 정보 상태
   const status = authState?.status || 'idle' // 로그인 상태
   const error = authState?.error || null // 로그인 에러
   const { isDarkMode } = useContext(ThemeContext) // 다크 모드 상태

   useEffect(() => {
      return () => {
         dispatch(clearError()) // 에러 초기화
      }
   }, [dispatch])

   const handleSubmit = async (e) => {
      e.preventDefault()
      const result = await dispatch(loginUser(credentials)) // 로그인 요청
      if (result.type === 'auth/loginUser/fulfilled') {
         navigate('/') // 메인 페이지로 이동
      }
   }

   const handleChange = useCallback(
      (e) => {
         const { name, value } = e.target
         setCredentials({ ...credentials, [name]: value }) // 로그인 정보 상태 변경
      },
      [credentials]
   )
   return (
      <>
         <Menu />
         <div style={{ paddingTop: '200px' }}>
            <LoginContainer>
               <Title $isDarkMode={isDarkMode}>반갑습니다.</Title>
               <h2 style={{ textAlign: 'center', padding: 30 }}>로그인</h2>
               <Form onSubmit={handleSubmit}>
                  <StyledTextField
                     fullWidth
                     variant="outlined"
                     name="username"
                     placeholder="아이디"
                     value={credentials.username}
                     onChange={handleChange}
                     $isDarkMode={isDarkMode}
                     sx={{
                        '& .MuiInputBase-input': { height: 20 },
                     }}
                  />
                  <StyledTextField
                     fullWidth
                     variant="outlined"
                     type="password"
                     name="password"
                     placeholder="비밀번호"
                     value={credentials.password}
                     onChange={handleChange}
                     $isDarkMode={isDarkMode}
                     sx={{
                        '& .MuiInputBase-input': { height: 20 },
                     }}
                  />
                  <LoginButton type="submit" disabled={status === 'loading'} $isDarkMode={isDarkMode}>
                     {status === 'loading' ? '로그인중...' : '로그인'}
                  </LoginButton>
               </Form>
               {error && <ErrorMessage>{error}</ErrorMessage>}
            </LoginContainer>
         </div>
         <Footer />
      </>
   )
}

export default LoginPage
