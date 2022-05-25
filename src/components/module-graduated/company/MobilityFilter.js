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

const mobilityCount = [
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "Si",
  "Si",
  "Si",
  "Si",
];

const MobilityFilter = () => {
  const [state, setState] = useState({
    first: false,
    second: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the mobility that the user selected
   */
  const filterMobility = [
    {
      name: "Si",
      value: state.first,
    },
    {
      name: "No",
      value: state.second,
    },
  ].filter((mobility) => mobility.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    alert(JSON.stringify(filterMobility, null, 2));
  };

  return (
    <>
      {" "}
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          align="left"
          color="primary"
        >
          ¿Puede mudarse a otra ciudad o país?
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
              label="Si"
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={mobilityCount.filter((obj) => obj === "Si").length}
              color="secondary"
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
              label={"No"}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label={mobilityCount.filter((obj) => obj === "No").length}
              color="secondary"
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

export default MobilityFilter;
