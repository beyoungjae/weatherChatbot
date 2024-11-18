import { createSlice } from '@reduxjs/toolkit'

const fivedaysSlice = createSlice({
   name: 'fivedays', // 슬라이스 이름
   initialState: {
      fivedays: [], // 5일치 데이터를 배열로 저장
   }, // 초기 상태 설정
   reducers: {
      setFivedays: (state, action) => {
         state.fivedays = action.payload
      },
   }, // 리듀서 함수 설정
})

// 액션 상태 변경 내보내기
export const { setFivedays } = fivedaysSlice.actions
// 리듀서 내보내기
export default fivedaysSlice.reducer
