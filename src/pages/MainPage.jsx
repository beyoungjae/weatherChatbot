import React, { useState, useCallback } from 'react'
import { Wrap, Main, Content, Title } from '../styles/styledComponent'
import Menu from '../components/Menu'

function MainPage() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <Content>
               <Title>오늘의 날씨 정보를 확인하세요.</Title>
            </Content>
         </Main>
      </Wrap>
   )
}

export default MainPage
