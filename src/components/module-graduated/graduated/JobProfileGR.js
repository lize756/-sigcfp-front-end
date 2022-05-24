import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },

    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const validationSchema = yup.object({
  curriculumProfession: yup
    .string("Escribe tu profesión")
    .required("Campo requerido"),
  curriculumDescription: yup
    .string("Escribe una descripción de tu perfil")
    .required("Campo requerido"),
});

const experience = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

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

const JobProfileGR = () => {
  const classes = useStyles();
  const [getYearsExperience, setYearsExperience] = useState("");
  const [getWage, setWage] = useState("");
  const [getLaborMobility, setLaborMobility] = useState(false);

  const formik = useFormik({
    initialValues: {
      curriculumProfession: "",
      curriculumDescription: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      values.curriculumWage = getWage;
      values.curriculumYearExperience = getYearsExperience;
      values.curriculumLaborMobility = getLaborMobility;

      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mr={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="curriculumProfession"
              label="Profesión"
              value={formik.values.curriculumProfession}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumProfession &&
                Boolean(formik.errors.curriculumProfession)
              }
              helperText={
                formik.touched.curriculumProfession &&
                formik.errors.curriculumProfession
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="curriculumDescription"
              label="Descripción de tu perfil"
              value={formik.values.curriculumDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumDescription &&
                Boolean(formik.errors.curriculumDescription)
              }
              helperText={
                formik.touched.curriculumDescription &&
                formik.errors.curriculumDescription
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={experience}
              onChange={(e, value) => setYearsExperience(value)}
              renderInput={(params) => (
                <TextField {...params} label="Años de Experiencia" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={wage}
              onChange={(e, value) => setWage(value)}
              renderInput={(params) => (
                <TextField {...params} label="Aspiración salarial" required />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getLaborMobility}
                  onChange={(event) => {
                    setLaborMobility(event.target.checked);
                  }}
                />
              }
              label="Puede mudarse a otra ciudad o país"
            />
          </Grid>
        </Grid>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Siguiente.
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobProfileGR;
