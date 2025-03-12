import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

// Асинхронный экшен для получения данных пользователя
export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
});

const initialState = {
  data: null,
  status: 'loading',  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserData.pending, (state) => {
      state.status = "loading";  
    })
    .addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "succeeded"; 
      state.data = action.payload; 
    })
    .addCase(fetchUserData.rejected, (state) => {
      state.status = "error"; 
    });
  },
});

export const authReducer = authSlice.reducer;
