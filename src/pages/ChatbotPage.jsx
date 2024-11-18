import Chatbot from '../components/Chatbot'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// 스타일드 컴포넌트 추가
const PageContainer = styled.div`
   padding-top: 80px;
   min-height: 100vh;s
   display: flex;
   flex-direction: column;
`

const ContentContainer = styled.main`
   flex: 1;
   padding: 20px;
   width: 100%;
   max-width: 1200px;
   margin: 0 auto;
`

function ChatbotPage() {
   const user = useSelector((state) => state.auth.user) // 유저 정보 가져오기
   const navigate = useNavigate()

   useEffect(() => {
      // 로그인을 해야 사용이 가능함
      if (!user) {
         alert('로그인이 필요한 서비스입니다.')
         navigate('/login')
      }
   }, [user, navigate])

   // 유저 정보가 없으면 null 반환
   if (!user) return null

   return (
      <>
         <Menu />
         <PageContainer>
            <ContentContainer>
               <Chatbot />
            </ContentContainer>
         </PageContainer>
         <Footer />
      </>
   )
}

export default ChatbotPage
