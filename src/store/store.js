import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weather/weatherSlice'
import searchReducer from '../features/searchSlice'

export const store = configureStore({
   reducer: {
      weather: weatherReducer,
      search: searchReducer,
   },
})
