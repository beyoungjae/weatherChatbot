import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeatherByCoords } from '../../api/weatherApi'

// 위도/경도로 날씨 조회하는 thunk
export const fetchWeatherByCoords = createAsyncThunk('weather/weatherByCoords', async ({ lat, lon }) => {
   const response = await getWeatherByCoords(lat, lon)
   return response
})

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      showSummary: false,
      loading: false,
      error: null,
      isClosing: false,
      data: null, // 날씨 데이터를 저장할 필드 추가
      weather: null, // 기존 weather 필드 유지
      map: null, // 카카오맵 객체 저장
   },
   reducers: {
      showCard: (state) => {
         state.showSummary = true
      },
      hideCard: (state) => {
         state.showSummary = false
      },
      weather: (state, action) => {
         state.weather = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchWeatherByCoords.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            state.showSummary = true // 날씨 데이터를 받으면 카드 표시
         })
         .addCase(fetchWeatherByCoords.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export const { showCard, hideCard, weather } = weatherSlice.actions
export default weatherSlice.reducer
