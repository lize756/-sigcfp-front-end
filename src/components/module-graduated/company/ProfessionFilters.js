import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

const careerList = [
  {
    id: 1,
    name: "Sistemas",
  },
  {
    id: 2,
    name: "Telematica",
  },
  {
    id: 3,
    name: "Industrial",
  },
  {
    id: 4,
    name: "Derecho",
  },
  {
    id: 5,
    name: "Musica",
  },
  {
    id: 6,
    name: "Contabilidad",
  },
];
const ProfessionFilters = () => {
  const [careers, setCareers] = useState("");

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    setCareers(value);
    const listCrs = [];
    for (let i = 0; i < value.length; i++) {
      listCrs.push(value[i]);
      setCareers(listCrs);
    }
  };

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    alert(JSON.stringify(careers, null, 2));
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
          Carreras de interés
        </Typography>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={careerList}
              getOptionLabel={(option) => option.name}
              name="careers"
              onChange={(e, value) => handleSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Carreras"
                  placeholder="Carreras de Interés"
                />
              )}
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

export default ProfessionFilters;
