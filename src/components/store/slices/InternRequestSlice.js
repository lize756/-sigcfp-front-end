import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

let headers;
/**
 * This slice containt all related to the requests of the intern request.
 */
export const internRequestSlice = createSlice({
  name: "internRequest",
  initialState: {
    // List the intern request of the database
    listInteReqs: [],
    // Inter request
    intReq: {},
    // List the intern rquests associated a one company
    listIntReqsOfCompany: [],
  },
  reducers: {
    /**
     * Allows you to get data from a intern request
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setIntReq: (state, action) => {
      state.intReq = action.payload;
    },

    setListIntReqs: (state, action) => {
      state.listInteReqs = action.payload;
    },
    setListIntReqsOfCompany: (state, action) => {
      state.listIntReqsOfCompany = action.payload;
    },
    extraReducers: {
      // async reducers here
      // eslint-disable-next-line no-use-before-define
    },
  },
});

/**
 * --------------------------------------------------------------------
 * Async functions
 * --------------------------------------------------------------------
 */

/**
 *  Allow us add new intern request to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} internRequest Correspond of element to add.
 * @returns
 */
export const addInternRequest = (ACCESS_TOKEN, internRequest) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .post("/api/internRequests/add", internRequest, { headers })
    .then((res) => {
      dispatch(setIntReq(res.data));
      dispatch(getInternRequests(ACCESS_TOKEN));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a intern request.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} inteRequId inteRequId id of the intern request to update.
 * @param {*} internRequest new intern request to update.
 * @returns
 */
export const updateInternRequest = (
  ACCESS_TOKEN,
  inteRequId,
  internRequest
) => async (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/internRequests/update/" + inteRequId,{headers},internRequest)
    .then((res) => {
      dispatch(setIntReq(res.data));
    })
    .catch((err,trace) => {
      console.log(err.toJSON());
      console.log(trace);

    });
};

/**
 * Allows delete a intern request through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} inteRequId id of the intern request that you want to delete
 * @returns
 */
export const deleteInternRequest = (ACCESS_TOKEN, inteRequId) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/internRequests/" + inteRequId, { headers })
    .then((res) => {
      dispatch(setIntReq(res.data));
      dispatch(setListIntReqs(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a intern request with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} inteRequId inteRequId id to search a one intern request
 * @returns
 */
export const getInternRequest = (ACCESS_TOKEN, inteRequId) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/internRequests/" + inteRequId, { headers })
    .then((res) => {
      dispatch(setIntReq(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of intern requests saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getInternRequests = (ACCESS_TOKEN) => async (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/internRequests", { headers })
    .then((res) => {
      dispatch(setListIntReqs(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of intern requests associated to company.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} companyId id of the company from which its want obtain the list of internt request.
 * @returns
 */
export const getInternRequestsAssociatedCompany = (ACCESS_TOKEN, companyId) => (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("/api/internRequests/comp/" + companyId, { headers })
    .then((res) => {
      dispatch(setListIntReqsOfCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of internRequest
export const {
  setIntReq,
  setListIntReqs,
  setListIntReqsOfCompany,
} = internRequestSlice.actions;
export default internRequestSlice.reducer;
