import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/post.js";
import { authReducer } from "./slices/auth.js";

const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer
    }
})

export default store