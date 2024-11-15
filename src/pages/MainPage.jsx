import React, { useState, useCallback } from 'react'
import { Wrap, Main, Content, Title } from '../styles/styledComponent'
import TextField from '@mui/material/TextField'
import Menu from '../components/Menu'
import { Button } from '@mui/material'
import Footer from '../components/Footer'

function MainPage() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <Content>
               <Title>오늘의 날씨 정보를 확인하세요.</Title>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '50px', marginBottom: '20px' }}>
                  <TextField fullWidth id="standard-basic" variant="standard" style={{ width: 500 }} defaultValue="Incheon" />
                  <Button
                     variant="contained"
                     style={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: '#60E47D',
                     }}
                  >
                     &gt;
                  </Button>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '50px', width: '300px' }}>
                  <Button
                     variant="contained"
                     style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: '#60E47D',
                     }}
                  >
                     날씨 요약 확인하기
                  </Button>
                  <Button
                     variant="contained"
                     style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: '#60E47D',
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
