import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Chatbot is initially closed
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    toggleChatbot: (state) => {
      state.isOpen = !state.isOpen; // Toggle chatbot state
    },
  },
});

export const { toggleChatbot } = chatbotSlice.actions;
export default chatbotSlice.reducer;
