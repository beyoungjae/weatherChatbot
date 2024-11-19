import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
   // 슬라이스 이름
   name: 'weather',
   // 초기 상태
   initialState: {
      showSummary: false, // 날씨 카드 표시 상태
      loading: false, // 로딩 상태
      error: null, // 에러 상태
      isClosing: false, // 닫기 상태
   },
   // 리듀서 함수
   reducers: {
      showCard: (state) => {
         state.showSummary = true // 날씨 카드 표시
      },
      hideCard: (state) => {
         state.showSummary = false // 날씨 카드 숨김
      },
      weather: (state, action) => {
         state.weather = action.payload // 날씨 정보 설정
      },
   },
})

// 액션 상태 변경 내보내기
export const { showCard, hideCard } = weatherSlice.actions
// 리듀서 내보내기
export default weatherSlice.reducer
