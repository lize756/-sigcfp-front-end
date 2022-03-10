import React from "react";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { Grid } from "@mui/material";

const RegistrationBasicCompanyData = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid container item xs={5} spacing={3}>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="nit-company" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>{" "}
        </Grid>
        <Grid container item xs={5} spacing={3}>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="nit-company" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>{" "}
        </Grid>
        <Grid container item xs={5} spacing={3}>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="nit-company" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationBasicCompanyData;
