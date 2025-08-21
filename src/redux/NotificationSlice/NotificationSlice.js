import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchUnseenNotifications = createAsyncThunk(
  'notifications/fetchUnseen',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/notifications/unseen-messages');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearNotifications(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnseenNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnseenNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUnseenNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
