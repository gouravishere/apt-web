import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  pricing: [],
  planGroups: [],
  plans: [], // Plans from evaluate-plans API
  plansByService: [], // Plans from getPlansByService API
  payPlan: {},
  loading: false,
  loadingByService: false, // Loading state for getPlansByService API
  error: null,
  errorByService: null, // Error state for getPlansByService API
};

// Existing Thunks
export const fetchAllPricing = createAsyncThunk(
  "pricing/getAll",
  async ({ country }, { rejectWithValue }) => {
    try {
      let url = "/services";
      if (country.toLowerCase() !== "india") {
        url = `/services/${country}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pricing"
      );
    }
  }
);

export const getPlanGroups = createAsyncThunk(
  "pricing/getPlanGroups",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/services/plan-groups/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plan groups"
      );
    }
  }
);

export const fetchPlans = createAsyncThunk(
  "pricing/fetchPlans",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/services/evaluate-plans", {
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);

// New Thunk: Get Plans by Service
export const getPlansByService = createAsyncThunk(
  "pricing/getPlansByService",
  async (service, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/services/${service}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plans by service"
      );
    }
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    emptyPlans: (state) => {
      state.plans = [];
      state.plansdata = [];
      state.planGroups = [];
    },
    emptyServices: (state) => {
      state.pricing = [];
    },
    hanldePayPlan: (state, action) => {
      state.payPlan = action.payload;
    },
    emptyPlansByService: (state) => {
      state.plansByService = [];
      state.loadingByService = false;
      state.errorByService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPricing.fulfilled, (state, action) => {
        state.loading = false;
        state.pricing = action.payload;
      })
      .addCase(fetchAllPricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlanGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.planGroups = action.payload;
      })
      .addCase(getPlanGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling getPlansByService
      .addCase(getPlansByService.pending, (state) => {
        state.loadingByService = true;
        state.errorByService = null;
      })
      .addCase(getPlansByService.fulfilled, (state, action) => {
        state.loadingByService = false;
        state.plansByService = action.payload; // Store the response in the `plansByService` state
      })
      .addCase(getPlansByService.rejected, (state, action) => {
        state.loadingByService = false;
        state.errorByService = action.payload;
      });
  },
});

export const { emptyPlans, hanldePayPlan, emptyPlansByService, emptyServices } =
  pricingSlice.actions;
export default pricingSlice.reducer;
