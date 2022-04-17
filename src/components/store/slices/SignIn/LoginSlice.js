import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

export const LoginSlice = createSlice({
  name: "userlogin",
  initialState: {
    user: {
      userEmail: "",
      userName: "",
    },
    responseUserLogin: {},
    isLogin: false,
    rolee: "",
  },
  reducers: {
    setUserr: (state, action) => {
      state.user = {
        userEmail: action.payload.userEmail,
        userName: action.payload.userName,
      };
    },
    setResponseUserLogin: (state, action) => {
      state.responseUserLogin = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setRolee: (state, action) => {
      state.rolee = action.payload;
    },
  },
});

/**
 * Allow us send the token to back
 * @param {*} data
 * @returns
 */
export const sendToken = (data) => async (dispatch) => {
  await axios
    .post("api/auth/login", data)
    .then((response) => {
      dispatch(setResponseUserLogin(response.data));
      //Update this rol in the initial state
      dispatch(setRolee(response.data.user.authorities[0].authority));
      dispatch(setIsLogin(true));
    })
    .catch((err) => {
      console.log(err.toJSON());
      dispatch(setResponseUserLogin({}));
      dispatch(setIsLogin(false));
    });
};



//Export the action to reducer of userLogin
export const {
  setUserr,
  setResponseUserLogin,
  setIsLogin,
  setRolee,  
} = LoginSlice.actions;
export default LoginSlice.reducer;
