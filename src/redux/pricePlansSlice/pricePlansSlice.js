import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { pricePlans } from "../../api/endpoints";

const initialState = {
    plans: [
      {
        id: 1,
        title: "Income < 50L",
        features: [
          "Computation of Income will be provided",
          "Selection of Most Suitable Tax Regime (Old vs New)",
          "Expert assisted Return Filing",
          "Covers F&O Trading, Intra-day Trading or Trading in Crypto",
        ],
        price: 999,
      },
      {
        id: 2,
        title: "Income > 50L",
        features: [
          "Computation of Income will be provided",
          "Selection of Most Suitable Tax Regime (Old vs New)",
          "Expert assisted Return Filing",
          "Covers F&O Trading, Intra-day Trading or Trading in Crypto",
        ],
        price: 1999,
      },
      {
        id: 3,
        title: "Freelancer Plan",
        features: [
          "Tailored Tax Advice for Freelancers",
          "Access to Tax Saving Investment Options",
          "Income Computation and Filing",
          "One-on-One Consultation with Tax Expert",
        ],
        price: 1499,
      },
      {
        id: 4,
        title: "Business Plan",
        features: [
          "Comprehensive Business Tax Filing",
          "GST Filing Assistance",
          "Quarterly Financial Reports",
          "Dedicated Tax Advisor Support",
        ],
        price: 2999,
      },
      {
        id: 5,
        title: "Startup Plan",
        features: [
          "Tax Planning for Startups",
          "Compliance Assistance (ROC Filing & GST)",
          "Funding and Investment Guidance",
          "Expert Tax Support for Startups",
        ],
        price: 4999,
      },
      {
        id: 6,
        title: "Corporate Plan",
        features: [
          "End-to-End Corporate Tax Management",
          "Dedicated Corporate Tax Expert",
          "Compliance for Multi-State Operations",
          "Tax Savings Strategies for Corporates",
        ],
        price: 9999,
      },
    ],
    loading:false
  };
  

const pricePlansSlice=createSlice({
    name:"pricePlans",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder.addCase(fetchPricePlans.pending,(state)=>{
        state.loading=true
      }).addCase(fetchPricePlans.fulfilled,(state,action)=>{
        state.loading=false
        state.plans=action.payload
      }).addCase(fetchPricePlans.rejected,(state)=>{
        state.loading=false
      })
    }
})

export const fetchPricePlans = createAsyncThunk(
  "price/plans", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(pricePlans);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch pricing");
    }
  }
);


export default pricePlansSlice.reducer;