import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";


export const fetchAuth = createAsyncThunk("auth/fetchUserData", async (params) => {
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
  reducers: {
    logOut: (state) => {state.data = null}
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAuth.pending, (state) => {
      state.status = "loading";  
    })
    .addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = "succeeded"; 
      state.data = action.payload; 
    })
    .addCase(fetchAuth.rejected, (state) => {
      state.status = "error"; 
    });
  },
});

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const {logOut} = authSlice.actions