import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice containt all related with the state of application.
 */
export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    // object alert that contains the info that have one career
    alert:{
        alertTitle: "",
        alertDescription: "",
    },
    isShowAlert: false,
    isAcceptedAlert: false
  },
  reducers: {
    /**
     * 
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setAlert: (state, action) => {
      state.alertTitle = action.payload;
    },

    setAcceptedAlert: (state, action) =>{
        state.isAcceptedAlert = action.payload;
    },

    setShowAlert: (state, action) => {
      state.isShowAlert = action.payload;
    },
  },
  
});
//Export the action to reducer of alert
export const { setAcceptedAlert, setShowAlert } = alertSlice.actions;
export default alertSlice.reducer;