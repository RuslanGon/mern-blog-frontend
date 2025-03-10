import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
  },
});

export default authSlice.reducer;
