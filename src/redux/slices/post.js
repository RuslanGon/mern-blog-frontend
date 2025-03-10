import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = 'loading'; 
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload; 
        state.posts.status = 'succeeded'; 
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = []
        state.posts.status = 'error'; 
      });
  },
});

export const postReducer = postSlice.reducer;
