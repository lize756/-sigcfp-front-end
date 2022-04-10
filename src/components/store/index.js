// Represent the index to store of all application
import { configureStore } from "@reduxjs/toolkit";
import personRegister  from "../store/slices/coordinator/PersonSlice"

export default configureStore({
    reducer:{
        personRegister,
    }
})