// Represent the index to store of all application
import { configureStore } from "@reduxjs/toolkit";
import personRegister  from "../store/slices/coordinator/PersonSlice"
import userLogin from "../store/slices/SignIn/LoginSlice"
export default configureStore({
    reducer:{
        personRegister,
        userLogin,
    }
})