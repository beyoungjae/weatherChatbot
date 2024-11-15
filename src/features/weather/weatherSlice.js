import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      showSummary: false,
   },
   reducers: {
      showCard: (state) => {
         state.showSummary = true
      },
      hideCard: (state) => {
         state.showSummary = false
      },
   },
})

export const { showCard, hideCard } = weatherSlice.actions
export default weatherSlice.reducer
