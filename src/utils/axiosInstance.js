import axios from "axios";
import CryptoJS from "crypto-js";

const isProduction =   process.env.REACT_APP_NODE_ENV === "production" || false;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => localStorage.getItem("accessToken");

// AES Key
const keyString = process.env.REACT_APP_AES_KEY;
const aesKey = CryptoJS.SHA256(keyString);

// Token Refresh
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken: refreshToken,
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data.data;

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    if (error?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    console.error("Error refreshing access token", error);
    return null;
  }
};

// Encrypt
function encrypt(data) {
  if (!isProduction) return data;

  if(typeof data === "string" && data?.includes("encrypted")){
    return data
  }

  try {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), aesKey, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const payload = {
      data: encrypted.toString(),
      iv: CryptoJS.enc.Base64.stringify(iv),
    };

    return { encrypted: btoa(JSON.stringify(payload)) };
  } catch (error) {
    console.error("Encryption Error:", error);
    return null;
  }
}

// Decrypt
function decrypt(encryptedString) {
  if (!isProduction) return encryptedString;

  try {
    const decodedPayload = atob(encryptedString);
    const payload = JSON.parse(decodedPayload);

    const ivWordArray = CryptoJS.enc.Base64.parse(payload.iv);
    const encryptedData = payload.data;

    const decrypted = CryptoJS.AES.decrypt(encryptedData, aesKey, {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption Error:", { error, encryptedString });
    return null;
  }
}

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const isFormData = config.data instanceof FormData;
    const isJson = config.headers["Content-Type"]?.includes("application/json");

    if (isJson && config.data && !isFormData) {
      const payload = encrypt(config.data);
      if (isProduction && payload) config.data = payload;
    }

    return config;
  },
  (error) => {
    console.error("Request setup error:", error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    const contentType = response.headers["content-type"] || "";

    if (
      isProduction &&
      response.data?.encrypted &&
      contentType.includes("application/json")
    ) {
      const decrypted = decrypt(response.data.encrypted);
      if (decrypted) response.data = decrypted;
      else console.error("Failed to decrypt response.");
    }

    return response;
  },
  async (error) => {
    const status = error?.response?.status;

    if (
      isProduction &&
      error?.response?.data?.encrypted &&
      error.response.headers["content-type"]?.includes("application/json")
    ) {
      const decrypted = decrypt(error.response.data.encrypted);
      if (decrypted) error.response.data = decrypted;
      else console.error("Failed to decrypt error response.");
    }

    if (status === 511) {
      const tokens = await refreshAccessToken();
      if (tokens) {
        localStorage.setItem("accessToken", tokens.newAccessToken);
        localStorage.setItem("refreshToken", tokens.newRefreshToken);

        error.config.headers.Authorization = `Bearer ${tokens.newAccessToken}`;
        return axiosInstance(error.config);
      }
    }

    // if (status === 401) {
    //   console.error("Unauthorized, redirecting to login...");
    // } else if (status === 403) {
    //   console.error("Forbidden access, redirecting...");
    //   window.location.href = "/unauthorized";
    // } else if (status === 500) {
    //   console.error("Server Error...");
    //   window.location.href = "/error";
    // } else if (status === 404) {
    //   console.error("Not found.");
    // } else if (error.request) {
    //   console.error("Network error.");
    // } 
    else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
