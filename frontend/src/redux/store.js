import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { accReducer } from "./slices/accounts";

const store = configureStore({
    reducer: {
        accounts: accReducer,
        posts: postReducer,
        auth: authReducer,
    }
})

export default store;