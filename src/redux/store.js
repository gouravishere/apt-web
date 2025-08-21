
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/authSlice/authSlice';
import pricingReducer from "../redux/priceSlice/priceSlice"
import pricePlanSlice from "../redux/pricePlansSlice/pricePlansSlice"
import LeadsSlice from "../redux/ServiceDetailsSlice/ServiceDetailsSlice"
import uploadSlice from "../redux/uploadRequest/uploadRequest"
import createTicket from "../redux/CreateTicket/CreateTicket"
import couponSlice from "../redux/CouponSlice/CouponSlice"
import charBotSlice from "../redux/chatBotSlice/chatBotSlice"
import notificationSlice from "../redux/NotificationSlice/NotificationSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    pricing: pricingReducer,
    pricePlan:pricePlanSlice,
    Leads: LeadsSlice,
    upload: uploadSlice,
    ticket:createTicket,
    coupon: couponSlice,
    chatbot: charBotSlice,
    notifications: notificationSlice,
  },
});

export default store;
