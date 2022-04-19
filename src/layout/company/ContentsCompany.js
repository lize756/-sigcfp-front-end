import React from "react";
import Modules from "./CardsModule";
import TableHome from "./TableContact";
import { Container, Grid, Paper } from "@mui/material";

const ContentsCompany = () => {
  return (
    <div>
      {" "}
      <Modules />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableHome />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContentsCompany;
