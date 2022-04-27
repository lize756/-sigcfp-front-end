//import personRegister from "../store/slices/coordinator/PersonSlice";
//import coordinatorSlice from "./slices/coordinator/CoordinatorSlice";

// Represent the index to store of all application
import { configureStore } from "@reduxjs/toolkit";
// Login
import userLogin, { localStorageMiddleware, reHydrateStore } from "./slices/SignIn/LoginSlice";

//Other slice
import CareerSlice from "./slices/CareerSlice";
import CompanySlice from "./slices/CompanySlice";
import ContactSlice from "./slices/ContactSlice";
import InternRequestSlice from "./slices/InternRequestSlice";
import PersonSlice from "./slices/PersonSlice";
import CountrySlice from "./slices/CountrySlice";
import UserrSlice from "./slices/UserrSlice";
/**
 * Store of all application
 */
export default configureStore({
  reducer: {
    //personRegister,
    //coordinatorSlice,
    UserrSlice,
    CountrySlice,
    userLogin,
    CareerSlice,
    CompanySlice,
    ContactSlice,
    InternRequestSlice,
    PersonSlice,
  },
  // This line allow preload the state the application when the window is reload it
  preloadedState: reHydrateStore(),
  // Correspond a the middleware that allow saved the information the global application
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
