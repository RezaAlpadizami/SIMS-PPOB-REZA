import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import profileService from "./profileService";

type Profile = {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
};

type InitialState = {
  profile: Profile | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const tokenString = localStorage.getItem("user");
      const tokenObject = tokenString ? JSON.parse(tokenString) : null;
      const token = tokenObject?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      return await profileService.getProfile(token);
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

export const profileSlice = createSlice({
  name: "profile",
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
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
