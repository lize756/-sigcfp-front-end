import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";
import { useSelector } from "react-redux";
// This slice allow realice to relation with the person.
export const personRegisterSlice = createSlice({
  name: "personRegister",
  initialState: {
    person: {

    },
    listPerson: []
  },
  reducers: {
    setPerson: (state, action) => {
      //This line allow add new person to list
      state.person = {
        persAddress: action.payload.persAddress,
        persDocument: action.payload.persDocument,
        persEmail: action.payload.persEmail,
        persFirstName: action.payload.persFirstName,
        persGenre: action.payload.persGenre,
        persLastName: action.payload.persLastName,
        curriculums: action.payload.curriculums,
        ethnicgroups: action.payload.ethnicgroups,
        city: action.payload.city,
        languages: action.payload.languages,
        userr: action.payload.userr,
      }
    },
    setPersonList: (state, action) =>{
      state.listPerson = action.payload
    }
  },
});


//Function
export const fetchAllPerson = () => (dispatch)=>{
  axios.get("persons").then((res) => {
    dispatch(setPersonList(res.data));
  });
}

export const postPerson = () => ()=>{
  const personToAdd = setPerson
  console.log(personToAdd)
}

//Export the action to reducer of personRegisterSlice
export const { setPerson,setPersonList } = personRegisterSlice.actions;
export default personRegisterSlice.reducer;
