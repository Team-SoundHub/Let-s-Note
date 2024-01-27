// 지우고 쓰시면 됩니다
import { createSlice } from '@reduxjs/toolkit'

export const sampleSlice = createSlice({
  name: 'sample',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1
    }
    // 여기에 추가 리듀서 정의
  }
})

export const { increment } = sampleSlice.actions

export default sampleSlice.reducer
