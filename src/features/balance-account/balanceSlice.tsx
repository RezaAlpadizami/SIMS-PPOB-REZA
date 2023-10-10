import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import balanceService from "./balanceService";

type Balance = {
  data: {
    balance: number;
  };
};

type InitialState = {
  balance: Balance | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  balance: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getBalance = createAsyncThunk(
  "balance/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const tokenString = localStorage.getItem("user");
      const tokenObject = tokenString ? JSON.parse(tokenString) : null;
      const token = tokenObject?.data.token;
      if (!token) {
        throw new Error("Token not found");
      }

      return await balanceService.getBalance(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getBalance.fulfilled,
        (state, action: PayloadAction<Balance>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.balance = action.payload;
        }
      )
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = balanceSlice.actions;
export default balanceSlice.reducer;
