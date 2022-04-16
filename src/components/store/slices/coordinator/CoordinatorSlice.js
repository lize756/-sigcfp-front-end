import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

export const coordinatorSlice = createSlice({
  name: "coordinator",
  initialState: {
    // List the interns request of the database
    list_interns_requests: [],
    // Inter request
    intern_request: {},
  },
  reducers: {
    /**
     * Allows you to get data from a intern request
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setInternRequest: (state, action) => {
      state.intern_request = action.payload;
    },

    setListInternsRequests: (state, action) => {
      state.list_interns_requests = action.payload;
    },
    extraReducers: {
      // async reducers here
      // eslint-disable-next-line no-use-before-define
    },
  },
});

//Function

/**
 * Async functions
 */
export const fetchtInternsRequests = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  //axios.defaults.headers.common = { Authorization: `${ACCESS_TOKEN}` };
  axios
    .get("api/internRequests", { headers })
    .then((res) => {
      console.log(res.data)
      dispatch(setListInternsRequests(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of coordinator
export const {
  setInternRequest,
  setListInternsRequests,
} = coordinatorSlice.actions;
export default coordinatorSlice.reducer;
