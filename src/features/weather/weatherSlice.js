import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
   // 슬라이스 이름
   name: 'weather',
   // 초기 상태
   initialState: {
      showSummary: false, // 날씨 카드 표시 상태
   },
   // 리듀서 함수
   reducers: {
      showCard: (state) => {
         state.showSummary = true // 날씨 카드 표시
      },
      hideCard: (state) => {
         state.showSummary = false // 날씨 카드 숨김
      },
   },
})

// 액션 상태 변경 내보내기
export const { showCard, hideCard } = weatherSlice.actions
// 리듀서 내보내기
export default weatherSlice.reducer
