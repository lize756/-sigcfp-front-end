import React, { useEffect, useState } from "react";
import Contacts from "./Contacts";
import axios from "../../../config/axios";
import { Grid } from "@mui/material";

const ContactList = () => {
  const [contactList, setContactList] = useState();

  useEffect(() => {
    axios.get("/contacts").then((res) => setContactList(res.data));
  }, []);

  const renderContact = () => {
    return contactList.map((contact) => <Contacts contact={contact} />);
  };

  return (
    <>
      <Grid container spacing={{ xs: 5, md: 4 }} justifyContent="center">
        {contactList?.map((contact) => {
          return <Contacts key={contact.contId} contact={contact} />;
        })}
      </Grid>
    </>
  );
};

export default ContactList;
