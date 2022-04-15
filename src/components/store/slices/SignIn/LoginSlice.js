import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

export const LoginSlice = createSlice({
  name: "userlogin",
  initialState: {
    user: {
      userEmail: "",
      userName:"",
    },
    responseUserLogin:{},
    isLogin: false
  },
  reducers:{
      setUserr: (state,action) =>{
          state.user = {
              userEmail: action.payload.userEmail,
              userName: action.payload.userName,
          }
      },
      setResponseUserLogin:(state,action) => {
          state.responseUserLogin = action.payload
      },
      setIsLogin:(state,action) =>{
        state.isLogin = action.payload
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
      dispatch(setResponseUserLogin(response.data));
      dispatch(setIsLogin(true));

      //console.log(response.data);
    } catch (err) {
      dispatch(setResponseUserLogin({}));
      dispatch(setIsLogin(false));
      throw new Error(err);
    }
  };

//Export the action to reducer of userLogin
export const {setUserr,setResponseUserLogin,setIsLogin} = LoginSlice.actions;
export default LoginSlice.reducer;

