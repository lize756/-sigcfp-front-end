import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    // List the interns request of the database
    list_interRequestsCompany: [],
    
  },
  reducers: {
    setListInternsRequests: (state, action) => {
        state.list_interRequestsCompany = action.payload;
      },

  },
});
