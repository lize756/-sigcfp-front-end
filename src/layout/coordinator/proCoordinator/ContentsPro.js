import React from "react";
import Modules from "../CardsCoordinators";
import TableHome from "../../director/TableCompanies";
import CardContact from "../../director/CardContacts";
import { Container, Grid } from "@mui/material";

const ContentsPro = () => {
  return (
    <div>
      {" "}
      <Modules />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <TableHome />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CardContact />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default ContentsPro;
