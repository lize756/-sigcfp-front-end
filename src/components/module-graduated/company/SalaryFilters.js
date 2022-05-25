import React from "react";
import {
  Paper,
  FormControlLabel,
  Checkbox,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

const wage = [
  "Menos de $1",
  "$1,5 a $2",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$5,5 a $6",
  "$6 a $8",
  "$8 a $10",
  "$10 a $12,5",
  "$12,5 a $15",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
];

const wageCount = [
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "$1,5 a $2",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$5,5 a $6",
  "$6 a $8",
  "Menos de $1",
  "Menos de $1",
  "$8 a $10",
  "$1,5 a $2",
  "$2,5 a $3",
  "$10 a $12,5",
  "$12,5 a $15",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$6 a $8",
  "$5,5 a $6",
  "$4,5 a $5",
  "$5,5 a $6",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$2,5 a $3",
  "$3,5 a $4",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$4,5 a $5",
  "$5,5 a $6",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
];

const SalaryFilters = () => {
  return (
    <>
      <Paper sx={{ width: 280, p: 2 }}>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          align="left"
          color="primary"
        >
          Salario (en millones de pesos)
        </Typography>

        {wage.map((data) => {
          return (
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={data}
                />
              </Grid>
              <Grid item xs={3}>
                <Chip
                  label={wageCount.filter((obj) => obj === data).length}
                  color="success"
                />
              </Grid>
            </Grid>
          );
        })}
      </Paper>
    </>
  );
};

export default SalaryFilters;
