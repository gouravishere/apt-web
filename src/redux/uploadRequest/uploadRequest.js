import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const uploadRequest = createAsyncThunk(
  "attachments/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(
        "/attachments/upload",
        { files: file },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type is set
          },
        }
      );

      return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload file."
      );
    }
  }
);

const initialState = {
  fileData: null, // Store the uploaded file's response data (e.g., file URL, ID)
  loading: false, // Store loading state (if file is being uploaded)
  error: null, // Store any error messages
};

const uploadSlice = createSlice({
  name: "upload", // Slice name
  initialState, // Initial state
  reducers: {}, // No additional synchronous actions for now
  extraReducers: (builder) => {
    builder
      .addCase(uploadRequest.pending, (state) => {
        state.loading = true; // Set loading to true when request is pending
        state.error = null; // Reset error when uploading starts
      })
      .addCase(uploadRequest.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is complete
        state.fileData = action.payload; // Store the response data (e.g., file URL or ID)
      })
      .addCase(uploadRequest.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload; // Store the error message if the upload fails
      });
  },
});

export default uploadSlice.reducer;
