//import personRegister from "../store/slices/coordinator/PersonSlice";
//import coordinatorSlice from "./slices/coordinator/CoordinatorSlice";

// Represent the index to store of all application
import { configureStore } from "@reduxjs/toolkit";
// Login
import userLogin from "../store/slices/SignIn/LoginSlice";

//Other slice
import CareerSlice from "./slices/CareerSlice";
import CompanySlice from "./slices/CompanySlice";
import ContactSlice from "./slices/ContactSlice";
import InternRequestSlice from "./slices/InternRequestSlice";
import PersonSlice from "./slices/PersonSlice";

export default configureStore({
  reducer: {
    //personRegister,
    //coordinatorSlice,

    CareerSlice,
    CompanySlice,
    ContactSlice,
    InternRequestSlice,
    PersonSlice,
  },
});
