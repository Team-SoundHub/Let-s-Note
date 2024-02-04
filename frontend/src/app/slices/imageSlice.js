import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 이미지 업로드를 위한 비동기 함수
export const uploadImage = createAsyncThunk(
  'image/upload',
  async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    // 백엔드 되면 url 확인해서 바꾸기
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
      headers: {
        // access 토큰 추가?
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url; // 업로드된 이미지 URL 반환
  }
);

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.imageUrl = action.payload;
        state.loading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default imageSlice.reducer;
