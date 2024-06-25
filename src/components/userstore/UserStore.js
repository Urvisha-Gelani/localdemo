import { configureStore } from "@reduxjs/toolkit";
import  userSlice from "../userfeatures/UserSlice";


export const UserStore = configureStore({
    reducer : {
        Users : userSlice
    }
})
