import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";
import { useSelector } from "react-redux";
// This slice allow realice to relation with the person.
export const personRegisterSlice = createSlice({
  name: "personRegister",
  initialState: {
    person: {
      persAddress: "",
      persDocument: "",
      persEmail: "",
      persFirstName: "",
      persGenre: "",
      persLastName: "",
      curriculums: [],
      ethnicgroups: [],
      city: null,
      languages: [],
      userr: null,
    },
    userr: {},
    listPerson: [],
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
      };
    },

    setUserr: (state, action) => {
      state.userr = action.payload;
    },

    setPersonList: (state, action) => {
      state.listPerson = action.payload;
    },
  },
});

//Function
export const fetchAllPerson = () => (dispatch) => {
  axios.get("persons").then((res) => {
    dispatch(setPersonList(res.data));
  });
};

export const postPerson = () => () => {
  const personToAdd = setPerson;
  console.log(personToAdd);
};

export const addUserr = (data) => async (dispatch) => {
  try {
    // console.log(data);
    const response = await axios.post("add", data);
    // console.log(response);
    dispatch(setUserr(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

//Export the action to reducer of personRegisterSlice
export const { setPerson, setPersonList, setUserr } =
  personRegisterSlice.actions;
export default personRegisterSlice.reducer;
