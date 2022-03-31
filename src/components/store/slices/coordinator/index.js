import {createSlice} from '@reduxjs/toolkit'

export const coordBasicDataSlice = createSlice({
  name: "coordBasicData",
  initialState: {
    person: {},
  },
  reducers: {
      getPerson: (state,action)=>{
          state.person = action.payload
      }
  },
});



//Export the action to reducer of coordBasicDataSlice
export const {getPerson} = coordBasicDataSlice.actions
export default coordBasicDataSlice.reducer
