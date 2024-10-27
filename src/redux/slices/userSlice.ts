import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axiosInstance from "../../api/axiosInstance";

// Define a type for the user slice state
interface UserState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: UserState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// Async action for signing in the user
export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    userCredentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/account/login/",
        userCredentials
      );
      return { data: response.data, status: 200 };
    } catch (error: any) {
      // Use `rejectWithValue` to pass the error message and status
      return rejectWithValue({
        message: error.response?.data?.message || "Sign-in failed",
        status: error.response?.status || 500,
      });
    }
  }
);

// // Async action for refreshing tokens
// export const refreshTokens = createAsyncThunk(
//   "user/refreshTokens",
//   async (refreshToken: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/auth/refresh", { refreshToken });
//       return response.data; // { token: '...', refreshToken: '...' }
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response.data.message || "Token refresh failed"
//       );
//     }
//   }
// );

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signIn
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signIn.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; refreshToken: string }>
        ) => {
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // Handle refreshTokens
    //   .addCase(
    //     refreshTokens.fulfilled,
    //     (
    //       state,
    //       action: PayloadAction<{ token: string; refreshToken: string }>
    //     ) => {
    //       state.token = action.payload.token;
    //       state.refreshToken = action.payload.refreshToken;
    //     }
    //   );
  },
});

export const { signOut } = userSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.users.isAuthenticated;
export const selectToken = (state: RootState) => state.users.token;
export const selectUserStatus = (state: RootState) => state.users.status;
export const selectUserError = (state: RootState) => state.users.error;

export default userSlice.reducer;
