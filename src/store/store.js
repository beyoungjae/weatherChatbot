import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weather/weatherSlice'
import searchReducer from '../features/searchSlice'
import fivedaysReducer from '../features/weather/fivedaysSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
   reducer: {
      weather: weatherReducer,
      search: searchReducer,
      fivedays: fivedaysReducer,
      auth: authReducer,
   },
})
