import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import balanceReducer from "../features/balance-account/balanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
