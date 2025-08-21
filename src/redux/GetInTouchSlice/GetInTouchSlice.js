import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';


const initialState = {
  ticket: null,
  loading: false,
  error: null,
  fileUploadSuccess: false,
};

// Async thunk for file upload
export const uploadFiles = createAsyncThunk(
  'getInTouch/uploadFiles',
  async ({ files }, { rejectWithValue }) => {
    const url = `/attachments/upload`;
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      const response = await axiosInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Return uploaded file IDs
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to upload files');
    }
  }
);

// Async thunk for creating a ticket
export const createTicket = createAsyncThunk(
  'getInTouch/createTicket',
  async ({ title, description, query, service, attachmentIds }, { rejectWithValue }) => {
    const url = `/tickets`;
    try {
      const ticketData = {
        title,
        description,
        type: query,
        service,
        attachmentIds,
      };
      const response = await axiosInstance.post(url, ticketData);
      return response.data; // Return created ticket data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create ticket');
    }
  }
);

const getInTouchSlice = createSlice({
  name: 'getInTouch',
  initialState,
  reducers: {
    resetFileUploadSuccess: (state) => {
      state.fileUploadSuccess = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle file upload
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fileUploadSuccess = false;
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.loading = false;
        state.fileUploadSuccess = true;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fileUploadSuccess = false;
      });

    // Handle ticket creation
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.ticket = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFileUploadSuccess, resetError } = getInTouchSlice.actions;

export default getInTouchSlice.reducer;
