import {createSlice} from '@reduxjs/toolkit'

export const coordBasicDataSlice = createSlice({
  name: "coordBasicData",
  initialState: {
    person: {},
    value:""
  },
  reducers: {
      setPerson: (state,action)=>{
          state.person = {
            persFirstName: action.payload.persFirstName,
            persLastName: action.payload.persLastName,
            persDocument: action.payload.persDocument,
            persEmail: action.payload.persEmail,
          } 
      },
      setHttp:(state,action)=>{
        state.value = action.payload
      }
  },
});
//Export the action to reducer of coordBasicDataSlice
export const {setHttp} = coordBasicDataSlice.actions
export const {setPerson} = coordBasicDataSlice.actions
export default coordBasicDataSlice.reducer
