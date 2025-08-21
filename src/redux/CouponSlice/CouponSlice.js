import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const GetDiscount = createAsyncThunk(
  "coupon/GetDiscount",
  async ({ planId, couponCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `services/discounted-price?planId=${planId}&couponCode=${couponCode}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    discountData: null,
    loading: false,
    error: null,
    appliedCoupon: null
  },
  reducers: {
    clearCoupon: (state) => {
      state.discountData = null;
      state.appliedCoupon = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discountData = action.payload;
        state.appliedCoupon = action.payload?.couponCode;
      })
      .addCase(GetDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to apply coupon";
        state.appliedCoupon = null;
      });
  }
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
