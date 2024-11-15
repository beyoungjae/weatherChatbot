import styled from 'styled-components'

export const Wrap = styled.div`
   height: 100vh;
`

export const Main = styled.main`
   display: flex;
   justify-content: center;
`

export const Content = styled.div`
   padding: 20px;
   display: flex;
   flex-direction: column;
   margin-top: 200px;
   align-items: center;
   width: 100%;
   max-width: 1200px;
`

export const Title = styled.div`
   font-size: 3rem;
   font-weight: bold;
   background: linear-gradient(to right, #05c9ff, #09ff36);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-bottom: 30px;
   text-align: center;
   word-break: keep-all;
`
