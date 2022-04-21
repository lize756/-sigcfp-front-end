import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";

/**
 * This slice containt all related to the requests of the contact.
 */
export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    // List the contact of the database
    listContacts: [],
    // Inter request
    contact: {},
    // List the intern rquests z a one company
    listContactsOfCompany: [],
  },
  reducers: {
    /**
     * Allows you to get data from a contact
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setContact: (state, action) => {
      state.contact = action.payload;
    },

    setListcontacts: (state, action) => {
      state.listContacts = action.payload;
    },
    setListContactsOfCompany: (state, action) => {
      state.contact = action.payload;
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
 *  Allow us add new contact to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contact Correspond of element to add.
 * @returns
 */
export const addcontact = (ACCESS_TOKEN, contact) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .post("/api/contacts", { headers }, contact)
    .then((res) => {
      dispatch(setContact(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a contact.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId contId id of the contact to update.
 * @param {*} contact new contact to update.
 * @returns
 */
export const updatecontact = (
  ACCESS_TOKEN,
  contId,
  contact
) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/contacts/update/" + contId, { headers }, contact)
    .then((res) => {
      dispatch(setContact(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows delete a contact through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId id of the contact that you want to delete
 * @returns
 */
export const deletecontact = (ACCESS_TOKEN, contId) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/contacts/" + contId, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a contact with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId contId id to search a one contact
 * @returns
 */
export const getcontact = (ACCESS_TOKEN, contId) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/contacts/" + contId, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of contacts saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getcontacts = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/contacts", { headers })
    .then((res) => {
      dispatch(setListcontacts(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of contacts associated to company.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} companyId id of the company from which its want obtain the list of contacts.
 * @returns
 */
export const getContactsAssociatedCompany = (ACCESS_TOKEN, companyId) => (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("/api/contacts/comp/" + companyId, { headers })
    .then((res) => {
      dispatch(setListContactsOfCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of contact
export const {
  setContact,
  setListcontacts,
  setListContactsOfCompany
} = contactSlice.actions;
export default contactSlice.reducer;
