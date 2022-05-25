import React, { useState } from "react";
import {
  Paper,
  FormControlLabel,
  Checkbox,
  Chip,
  Grid,
  Typography,
  Button,
  Stack,
} from "@mui/material";

const genreCount = [
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Femenino",
  "Masculino",
  "No Binario",
];

const GenderFilters = () => {
  const [state, setState] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the Genders that the user selected
   */
  const filterGenre = [
    {
      name: "Femenino",
      value: state.first,
    },
    {
      name: "Masculino",
      value: state.second,
    },
    {
      name: "No Binario",
      value: state.third,
    },
    {
      name: "No Binario",
      value: state.fourth,
    },
  ].filter((genre) => genre.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    alert(JSON.stringify(filterGenre, null, 2));
  };
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          align="left"
          color="primary"
        >
          Género
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.first}
                  onChange={handleChange}
                  name="first"
                />
              }
              label="Femenino"
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={genreCount.filter((obj) => obj === "Femenino").length}
              color="warning"
            />
          </Grid>
          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.second}
                  onChange={handleChange}
                  name="second"
                />
              }
              label={"Masculino"}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={genreCount.filter((obj) => obj === "Masculino").length}
              color="warning"
            />
          </Grid>
          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.third}
                  onChange={handleChange}
                  name="third"
                />
              }
              label={"No Binario"}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={genreCount.filter((obj) => obj === "No Binario").length}
              color="warning"
            />
          </Grid>
          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.fourth}
                  onChange={handleChange}
                  name="fourth"
                />
              }
              label={"Otro"}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={genreCount.filter((obj) => obj === "Otro").length}
              color="warning"
            />
          </Grid>
        </Grid>

        <Stack mt={2} alignItems="center">
          <Button variant="contained" component="span" onClick={handleClick}>
            Buscar
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default GenderFilters;
