import { Wrap, Main, Content, Title } from '../styles/styledComponent'
import Menu from '../components/Menu'
import { Button } from '@mui/material'
import Footer from '../components/Footer'
import SearchBanner from '../components/SearchBanner'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'

function MainPage() {
   const { isDarkMode } = useContext(ThemeContext)

   return (
      <Wrap>
         <Menu />
         <Main>
            <Content>
               <Title>오늘의 날씨 정보를 확인하세요.</Title>
               <SearchBanner />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '50px', width: '300px' }}>
                  <Button
                     variant="contained"
                     style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C',
                     }}
                  >
                     날씨 요약 확인하기
                  </Button>
                  <Button
                     variant="contained"
                     style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C',
                     }}
                  >
                     챗봇이랑 대화하기
                  </Button>
               </div>
            </Content>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MainPage
