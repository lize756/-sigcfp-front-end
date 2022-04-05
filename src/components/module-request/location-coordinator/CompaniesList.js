import React, { useState, useEffect } from "react";
import Company from "./Company";
import axios from "../../../config/axios";
import { Grid } from "@mui/material";

const CompaniesList = ({ listContacts }) => {
  const [companiesList, setCompaniesList] = useState();

  useEffect(() => {
    axios.get("/companies").then((res) => setCompaniesList(res.data));
  }, []);

  /**
   * This is a function that allows you to obtain the contact list of the company.
   * @param {*} contacts
   */
  const contacts = (contacts) => {
    listContacts(contacts);
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 5, md: 4, gridColumn: "1 / 3" }}
        justifyContent="center"
      >
        {companiesList?.map((company) => {
          return (
            <Company
              key={company.compId}
              company={company}
              contacts={contacts}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default CompaniesList;
