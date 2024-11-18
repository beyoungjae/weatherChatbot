import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 임시 사용자 데이터
const TEMP_USER = {
   id: 'admin',
   password: '0000',
}

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      // 임시 로그인
      if (credentials.username === TEMP_USER.id && credentials.password === TEMP_USER.password) {
         return { username: credentials.username }
      }
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      status: 'idle',
      error: null,
   },
   reducers: {
      logout: (state) => {
         state.user = null
         state.status = 'idle'
         state.error = null
      },
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.status = 'loading'
            state.error = null
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'succeeded'
            state.error = null
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
         })
   },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
