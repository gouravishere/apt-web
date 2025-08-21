import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { CONSTANTS } from "../../pages/PricingPage/PricingConstant";

// Async thunk for file upload
export const uploadFiles = createAsyncThunk(
  "getInTouch/uploadFiles",
  async ({ files }, { rejectWithValue }) => {
    const url = `/attachments/upload`;
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const extractIds = response?.data?.map((item) => item.id);
      return extractIds;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to upload files");
    }
  }
);

// Async thunk for fetching all services
export const getAllServices = createAsyncThunk(
  "getInTouch/getAllServices",
  async (_, { rejectWithValue }) => {
    const url = "/services";
    try {
      const response = await axiosInstance.get(url);
      const data = response?.data?.data?.map((item) => ({
        id: item.id,
        name: CONSTANTS[item.name],
        label: CONSTANTS[item.name],
      }));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get the services"
      );
    }
  }
);

// Async thunk for creating ticket
export const createTicketSupport = createAsyncThunk(
  "getInTouch/createTicket",
  async (
    { title, description, type, getId, fileIds },
    { rejectWithValue }
  ) => {
    const data = {
      title,
      description,
      type,
      serviceId:getId,
      attachmentIds:fileIds,
    };
    try {
      const response = await axiosInstance.post("/tickets", data);
      return response?.data?.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create the ticket"
      );
    }
  }
);

const createTicket = createSlice({
  name: "ticket",
  initialState: {
    filesId: [],
    options: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the uploadFiles async thunk
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.filesId = action.payload;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the getAllServices async thunk
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createTicket.reducer;
