import React, { useEffect, useState } from "react";
import Contacts from "./Contacts";
import { Grid } from "@mui/material";

const ContactList = ({ contacts }) => {
  const [contactList, setContactList] = useState();

  useEffect(() => {
    //axios.get("/contacts").then((res) => setContactList(res.data));
    setContactList(contacts);
  }, []);

  return (
    <>
      <Grid container spacing={{ xs: 5, md: 4 }} justifyContent="center">
        {contactList?contactList.map((contact) => {
          return <Contacts key={contact.contId} contact={contact} />;
        }):""}
      </Grid>
    </>
  );
};

export default ContactList;
