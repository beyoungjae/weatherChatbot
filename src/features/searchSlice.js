import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
   // 슬라이스 이름
   name: 'search',
   // 초기 상태
   initialState: {
      searchValue: '',
   },
   // 리듀서 함수
   reducers: {
      setSearchValue: (state, action) => {
         state.searchValue = action.payload // 검색 값 설정
      },
   },
})

// 액션 상태 변경 내보내기
export const { setSearchValue } = searchSlice.actions
// 리듀서 내보내기
export default searchSlice.reducer
