import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userLoginAuth';

export default configureStore({
    reducer: {
        user: userReducer,
    }
})