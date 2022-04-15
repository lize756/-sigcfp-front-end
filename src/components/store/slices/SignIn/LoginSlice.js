import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

export const LoginSlice = createSlice({
  name: "userlogin",
  initialState: {
    user: {
      userEmail: "",
      userName:"",
    },
    responseUserLogin:"Entre"
  },
  reducers:{
      setUserr: (state,action) =>{
          state.user = {
              userEmail: action.payload.userEmail,
              userName: action.payload.userName,
          }
      },
      setResponseUserLogin:(state,action) => {
          state.token = action.payload
      }

  },
});


/**
 * Allow us send the token to back 
 * @param {*} data 
 * @returns 
 */
 export const sendToken = (data) => async (dispatch) => {
    try {
      const response = await axios.post("api/auth/login", data);
      dispatch(setResponseUserLogin(response.data.token));
      //console.log(response.data.token);
    } catch (err) {
      throw new Error(err);
    }
  };

//Export the action to reducer of userLogin
export const {setUserr,setResponseUserLogin} = LoginSlice.actions;
export default LoginSlice.reducer;

