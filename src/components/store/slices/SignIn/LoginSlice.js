import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";
import { resetAlertSliceState } from "../AlertSlice";
import { resetCareerSliceState } from "../CareerSlice";
import { resetCompanySliceState } from "../CompanySlice";
import { resetContactSliceState } from "../ContactSlice";
import { resetCountrySliceState } from "../CountrySlice";
import { resetInternRequestSliceState } from "../InternRequestSlice";
import { resetPersonSliceState } from "../PersonSlice";
import { resetUserrSliceState } from "../UserrSlice";
//AUTHORIZATION
const initialAuthState = {
  isAuthenticated: true,
};
/**
 * Initial state of loginSlice
 * @returns
 */
const initialState = () => ({
  initialAuthState,
  user: {
    userEmail: "",
    userName: "",
  },
  responseUserLogin: {},
  isLogin: false,
  rolee: "",
  userCompanyId: "",
  userPersonId: "",
});

export const LoginSlice = createSlice({
  name: "userlogin",
  initialState: initialState(),
  reducers: {
    resetLoginState: (state) => initialState(),
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
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
    setUserPersonId: (state, action) => {
      state.userPersonId = action.payload;
    },
    setUserCompanyId: (state, action) => {
      state.userCompanyId = action.payload;
    },
  },
});

/**
 * This middleware allow save the all information of the saved in the store in the local storage.
 * @param {*} getState correspond in the current state of application
 * @returns return the result
 */
export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

/**
 * This function allow us refresh the information when the windows is reload
 * @returns the information saved in the store for reload it
 */
export const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
  }
};

export const logOut = () => async (dispatch) => {
  if (localStorage.getItem("applicationState") !== null) {
    try {
      localStorage.clear();
      resetAllState(dispatch);
    } catch (e) {
      console.log(
        "removeStorage: Error removing key [aplicationSate] from localStorage: " +
          JSON.stringify(e)
      );
      return false;
    }
  }
  if (localStorage.getItem("applicationState") !== null) {
    console.log("Existe");
  } else {
    console.log("No existe");
  }
  return true;
};

const resetAllState = (dispatch) => {
  dispatch(resetLoginState());
  dispatch(resetAlertSliceState());
  dispatch(resetCareerSliceState());
  dispatch(resetCompanySliceState());
  dispatch(resetContactSliceState());
  dispatch(resetCountrySliceState());
  dispatch(resetInternRequestSliceState());
  dispatch(resetPersonSliceState());
  dispatch(resetUserrSliceState());
};

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
      dispatch(setUserCompanyId(response.data.userCompanyId));
      dispatch(setUserPersonId(response.data.userPersonId));
    })
    .catch((err) => {
      console.log(err.toJSON());
      dispatch(setResponseUserLogin({}));
      dispatch(setIsLogin(false));
    });
};

//Export the action to reducer of userLogin
export const {
  logout,
  setUserr,
  resetLoginState,
  reset,
  setResponseUserLogin,
  setIsLogin,
  setRolee,
  setUserCompanyId,
  setUserPersonId,
} = LoginSlice.actions;
export default LoginSlice.reducer;
