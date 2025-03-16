import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "idle", 
  },
  tags: {
    items: [],
    status: "idle", 
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = "error";
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "succeeded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = "error";
      })

      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
      })
  
  },
});

export const postReducer = postSlice.reducer;
