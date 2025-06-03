import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  userRequest,
} from "../../api/userApi";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
};

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginRequest(payload);
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "user/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutRequest();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userRequest();
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await registerRequest(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;

export default userSlice.reducer;
