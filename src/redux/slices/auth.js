import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";


export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
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
    })

    .addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";  
    })
    .addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = "succeeded"; 
      state.data = action.payload; 
    })
    .addCase(fetchAuthMe.rejected, (state) => {
      state.status = "error"; 
    });
  },
});

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const {logOut} = authSlice.actions