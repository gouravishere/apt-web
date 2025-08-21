import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

let deviceData;

async function fetchBrowserData() {
  // Device type
  const deviceType = /Mobi|Android/i.test(navigator.userAgent)
    ? "mobile"
    : "desktop";

  // User agent
  const userAgent = navigator.userAgent;

  // Basic browser detection from userAgent
  const browser = (() => {
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
      return "Chrome";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "Safari";
    if (userAgent.includes("Edg")) return "Edge";
    if (userAgent.includes("Opera") || userAgent.includes("OPR"))
      return "Opera";
    return "Unknown";
  })();

  // IP address
  let ipAddress;

  try {
    ipAddress = await fetch("https://api.ipify.org?format=json")
      .then((res) => {
        if (!res.ok) {
          console.error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => data.ip);
  } catch (error) {
    // console.error("Error fetching IP address:", error.message);
    ipAddress = "Error retrieving IP"; // Fallback value or handle appropriately
  }

  // Location (requires user consent)
  const location = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => {
        // console.error("Error fetching location:", error);
        resolve(null); // Return null if location access is denied
      }
    );
  });

  // Consolidate all data
  return {
    deviceType,
    userAgent,
    ipAddress,
    browser,
    location,
  };
}

fetchBrowserData().then((data) => (deviceData = data));

// Async Thunk for Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
        ...deviceData,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// get user details
export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users");
      localStorage.setItem("userDetails", response.data.data?.user?.fullName);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);

// Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    authUpdater: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (accessToken) {
        state.isAuthenticated = true;
      }
    },
    setAccessRefreshToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (accessToken) {
        state.isAuthenticated = true;
      }
      // Persist tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    emptyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isAuthenticated = true;
        state.loading = false;

        // Persist tokens in localStorage
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, authUpdater, emptyError, setAccessRefreshToken } = authSlice.actions;
export default authSlice.reducer;
