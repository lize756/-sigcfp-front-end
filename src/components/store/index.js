// Represent the index to store of all application
import { configureStore } from "@reduxjs/toolkit";
import personRegister from "../store/slices/coordinator/PersonSlice";
import userLogin from "../store/slices/SignIn/LoginSlice";
import coordinatorSlice from "./slices/coordinator/CoordinatorSlice";
import companySlice from "./slices/company/CompanySlice";
export default configureStore({
  reducer: {
    personRegister,
    userLogin,
    coordinatorSlice,
    companySlice,    
  },
});
