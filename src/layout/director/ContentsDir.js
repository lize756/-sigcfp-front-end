import React from "react";
import Modules from "../company/CardsModule";
import TableHome from "./TableCompanies";
import CardContact from "./CardContacts";
import { Container, Grid } from "@mui/material";

const ContentsCompany = () => {
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
export default ContentsCompany;
