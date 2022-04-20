import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

let headers
export const companySlice = createSlice({
  name: "company",
  initialState: {
    // List the interns request of the database
    list_interRequestsOfCompany: [],
    company:{},
    list_carreers: []
  },
  reducers: {
    setListInternsRequests: (state, action) => {
      state.list_interRequestsOfCompany = action.payload;
    },

    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setListContactOfCompany:(state, action)=>{
      state.listContactOfCompany = action.payload;
    },
    setCarreers:(state,action)=>{
      state.list_carreers = action.payload;
    }

  },
});

/**
 * Async functions
 */
export const fetchtInternsRequests = (ACCESS_TOKEN, companyId) => (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  //axios.defaults.headers.common = { Authorization: `${ACCESS_TOKEN}` };
  axios
    .get("/api/internRequests/comp/" + companyId, { headers })
    .then((res) => {
      dispatch(setListInternsRequests(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

export const fetchCompany = (ACCESS_TOKEN, companyId) =>(dispatch)=> {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  
  axios
    .get("/api/companies/" + companyId, { headers })
    .then((res) => {
      dispatch(setCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allow us add new person to the database
 * @param {*} data 
 * @returns 
 */
 export const addInternRequestOfCompany = (ACCESS_TOKEN,data) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  
  axios
    .post("/api/careers", { headers,data})
    .then((res) => {
     // dispatch(setCarreers(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};



export const fetchCareers= (ACCESS_TOKEN) =>(dispatch)=> {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  
  axios
    .get("/api/careers", { headers })
    .then((res) => {
      dispatch(setCarreers(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of coordinator
export const { setListInternsRequests, setCompany, setCarreers,setListContactOfCompany} = companySlice.actions;
export default companySlice.reducer;
