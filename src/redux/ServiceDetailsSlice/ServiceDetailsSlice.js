import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { uploadRequest } from "../uploadRequest/uploadRequest";

// get past transactions
export const fetchPastTransactions = createAsyncThunk(
  "pastTransactions/fetchPastTransactions",
  async ({ status, sortBy, serviceId }, {rejectWithValue, dispatch}) => {

    let url = "/payments/history?";
    if (sortBy) {
      url = url + `&sort=${sortBy}`;
    } else {
      url = url + `&sort=latest`;
    }
    if (status) {
      url = url + `&status=${status}`;
    }
    if (serviceId) {
      url = url + `&serviceId=${serviceId}`;
    }
    try {
      dispatch(emptyPaymentData())
      const response = await axiosInstance.get(url);
      return response.data; // Return the data from the response
    } catch (error) {
      // If the error response exists, use its message; otherwise, use the error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch transactions";
      return rejectWithValue(errorMessage);
    }
  }
);

// get latest leads
export const fetchLatestLead = createAsyncThunk(
  "latestLead/fetchLatestLead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/leads/me?userType=User&page=1&limit=100000"
      );
      return response.data.data.leads; // Assuming API returns the latest lead data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// fetch recent service leads
export const fetchRecentLead = createAsyncThunk(
  "latestLead/fetchRecentLead",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/leads/me?userType=User&page=1&limit=4&status=closed"
      );

      return data?.data?.leads || []; // Ensure it always returns an array
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch recent leads.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to upload lead document by ID
export const uploadLeadDocumentId = createAsyncThunk(
  "serviceDetails/uploadLeadDocumentId",
  async (
    {
      leadId,
      file,
      attachmentName,
      prevAttachments,
      inputType,
      documentId,
      isDelete = false,
    },
    { dispatch, rejectWithValue }
  ) => {
    let attachmentIds = [];
    try {
      const data = await dispatch(uploadRequest(file));
      if (file) {
        if (prevAttachments) {
          attachmentIds = [...prevAttachments, data?.payload[0]?.id];
        } else {
          attachmentIds = [data?.payload[0]?.id];
        }
      } else {
        attachmentIds = [...prevAttachments];
      }
      if (attachmentIds.length === 0 && isDelete === true) {
        try {
          const res = await axiosInstance.delete(
            `/leads/documents/${documentId}`
          );
          if (res) {
            dispatch(getLeadById(leadId));
          }
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to delete document."
          );
        }
      } else {
        const response = await axiosInstance.post(
          `/leads/${leadId}/documents`,
          {
            documents: [
              {
                name: attachmentName,
                attachmentIds: attachmentIds,
                inputType: inputType,
              },
            ],
          }
        );
        if (response.data.success) {
          dispatch(getLeadById(leadId));
        }
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload lead document."
      );
    }
  }
);

// Async thunk to upload lead document by ID
export const uploadInputData = createAsyncThunk(
  "serviceDetails/uploadLeadDocumentId",
  async ({ leadId, fields }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/leads/${leadId}/documents`, {
        documents: fields,
      });
      if (response.data.success) {
        dispatch(getLeadById(leadId));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload lead document."
      );
    }
  }
);

// Async Thunk to fetch lead timeline by ID
export const GetLeadTimeLineById = createAsyncThunk(
  "leadTimeline/getById",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/leads/${leadId}/timeline`);
      return response.data;
    } catch (error) {
      // Return a custom error message if the request fails
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

// Async thunk to get lead by ID
export const getLeadById = createAsyncThunk(
  "serviceDetails/getLeadById",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/leads/${leadId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lead details."
      );
    }
  }
);

// Async thunk to get my leads
export const getMyLeads = createAsyncThunk(
  "serviceDetails/getMyLead",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(emptyLeadData())
      const response = await axiosInstance.get(
        `/leads/me?userType=User&page=1&limit=10000`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my leads."
      );
    }
  }
);

// Async thunk to get my services
export const getMyServices = createAsyncThunk(
  "serviceDetails/getMyServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/services");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my services."
      );
    }
  }
);

export const createLead = createAsyncThunk(
  "serviceDetails/createLead",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/leads", {
        planId: planId,
      });
      if (response) {
        window.location.href = response.data.paymentUrl;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create lead."
      );
    }
  }
);

// Initial state
const initialState = {
  transactions: null,
  recentServices: null,
  latestLead: null,
  serviceDetailsData: [],
  uploadLeadDocumentData: null,
  leadByIdData: null,
  timeline: null,
  myLeadData: [],
  myServicesData: [],
  createdLeadData: null, // New state for created lead
  loading: false,
  error: null,
};

// ServiceDetails slice
const serviceDetailsSlice = createSlice({
  name: "serviceDetails",
  initialState,
  reducers: {
    emptyCreatedLeadData: (state) => {
      state.createdLeadData = null;
    },
    emptyLeadData: (state) => {
      state.myLeadData = [];
    },
    emptyPaymentData : (state) => {
      state.transactions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload lead document by ID
      .addCase(uploadLeadDocumentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadLeadDocumentId.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadLeadDocumentData = action.payload;
      })
      .addCase(uploadLeadDocumentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get lead by ID
      .addCase(getLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.leadByIdData = action.payload;
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get my leads
      .addCase(getMyLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.myLeadData = action.payload;
      })
      .addCase(getMyLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get my services
      .addCase(getMyServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyServices.fulfilled, (state, action) => {
        state.loading = false;
        state.myServicesData = action.payload;
      })
      .addCase(getMyServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.createdLeadData = action.payload; // Store in new state
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get timeline by lead ID
      .addCase(GetLeadTimeLineById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetLeadTimeLineById.fulfilled, (state, action) => {
        state.loading = false;
        state.timeline = action.payload;
      })
      .addCase(GetLeadTimeLineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLatestLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestLead.fulfilled, (state, action) => {
        state.loading = false;
        state.latestLead = action.payload;
      })
      .addCase(fetchLatestLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentLead.fulfilled, (state, action) => {
        state.loading = false;
        state.recentServices = action.payload;
      })
      .addCase(fetchRecentLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPastTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchPastTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { emptyCreatedLeadData, emptyLeadData, emptyPaymentData } = serviceDetailsSlice.actions;
export default serviceDetailsSlice.reducer;
