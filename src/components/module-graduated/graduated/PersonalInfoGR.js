import React, { useState } from "react";
import { Autocomplete, TextField, Button, Grid } from "@mui/material";
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
  curriculumName: yup.string("Escribe tu nombre").required("Campo requerido"),
  curriculumSurname: yup
    .string("Escribe tu primer apellido")
    .required("Campo requerido"),
  curriculumSecondSurname: yup
    .string("Escribe tu segundo apellido")
    .required("Campo requerido"),
  curriculumID: yup
    .string("Escribe tu número de identificación")
    .required("Campo requerido"),
  curriculumDayBirth: yup
    .number("Escribe tu día de nacimiento")
    .required("Campo requerido"),
  curriculumYearBirth: yup
    .number("Escribe tu año de nacimiento")
    .required("Campo requerido"),
  curriculumAddress: yup
    .string("Escribe tu dirección de residencia")
    .required("Campo requerido"),
  curriculumPhone: yup
    .string("Escribe tu teléfono principal")
    .required("Campo requerido"),
  curriculumEmail: yup
    .string("Escribe tu correo electrónico")
    .email("Ingresa un correo electrónico valido")
    .required("Campo requerido"),
});

/**
 * =============================================== Start of lists===========================================
 * */
const typeDocument = [
  "Cédula",
  "Cédula de Extranjería",
  "Pasaporte",
  "Tarjeta de Identidad",
  "Sin definir",
];

const month = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const genre = ["Femenino", "Masculino", "No Binario", "Otro"];
const civilStatus = [
  "Casado(a)",
  "Soltero(a)",
  "Unión Libre",
  "Divorciado(a)",
  "Viudo(a)",
];

const listCountries = [
  { id: 1, name: "Colombia" },
  { id: 2, name: "Argentina" },
  { id: 3, name: "Brasil" },
  { id: 4, name: "España" },
];

const listCities = ["Cali", "Buenos Aires", "Bogota", "Madrid"];

/**
 * =============================================== End lists===========================================
 * */

const PersonalInfoGR = () => {
  const classes = useStyles();
  const [getTypeDocument, setTypeDocument] = useState("");
  const [getMonth, setMonth] = useState("");
  const [getGenre, setGenre] = useState("");
  const [getCivilStatus, setCivilStatus] = useState("");
  const [getCountry, setCountry] = useState("");
  const [getCity, setCity] = useState("");

  const formik = useFormik({
    initialValues: {
      curriculumName: "",
      curriculumSurname: "",
      curriculumSecondSurname: "",
      curriculumID: "",
      curriculumDayBirth: 0,
      curriculumYearBirth: 2000,
      curriculumAddress: "",
      curriculumPhone: "",
      curriculumEmail: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      values.curriculumCountryName = getCountry.name;
      values.curriculumCityName = getCity;
      values.curriculumTypeDocument = getTypeDocument;
      values.curriculumMonth = getMonth;
      values.curriculumGenre = getGenre;
      values.curriculumCivilStatus = getCivilStatus;
      console.log(values);

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
              name="curriculumName"
              label="Nombres"
              value={formik.values.curriculumName}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumName &&
                Boolean(formik.errors.curriculumName)
              }
              helperText={
                formik.touched.curriculumName && formik.errors.curriculumName
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="curriculumSurname"
              label="Primer Apellido"
              value={formik.values.curriculumSurname}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumSurname &&
                Boolean(formik.errors.curriculumSurname)
              }
              helperText={
                formik.touched.curriculumSurname &&
                formik.errors.curriculumSurname
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="curriculumSecondSurname"
              label="Segundo Apellido"
              value={formik.values.curriculumSecondSurname}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumSecondSurname &&
                Boolean(formik.errors.curriculumSecondSurname)
              }
              helperText={
                formik.touched.curriculumSecondSurname &&
                formik.errors.curriculumSecondSurname
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={typeDocument}
              onChange={(e, value) => setTypeDocument(value)}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de Documento" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="curriculumID"
              label="Número ducumento"
              value={formik.values.curriculumID}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumID &&
                Boolean(formik.errors.curriculumID)
              }
              helperText={
                formik.touched.curriculumID && formik.errors.curriculumID
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              name="curriculumDayBirth"
              type="number"
              label="Día de nacimiento"
              value={formik.values.curriculumDayBirth}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumDayBirth &&
                Boolean(formik.errors.curriculumDayBirth)
              }
              helperText={
                formik.touched.curriculumDayBirth &&
                formik.errors.curriculumDayBirth
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={month}
              onChange={(e, value) => setMonth(value)}
              renderInput={(params) => (
                <TextField {...params} label="Mes de Nacimiento" required />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name="curriculumYearBirth"
              type="number"
              label="Año de nacimiento"
              value={formik.values.curriculumYearBirth}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumYearBirth &&
                Boolean(formik.errors.curriculumYearBirth)
              }
              helperText={
                formik.touched.curriculumYearBirth &&
                formik.errors.curriculumYearBirth
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={genre}
              onChange={(e, value) => setGenre(value)}
              renderInput={(params) => (
                <TextField {...params} label="Género" required />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={civilStatus}
              onChange={(e, value) => setCivilStatus(value)}
              renderInput={(params) => (
                <TextField {...params} label="Estado civil" required />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              /**
               * List of cities
               */
              options={listCountries}
              /**
               * This property allows to show in the user's view the property that we want to take from the object.
               * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
               */
              getOptionLabel={(option) => option.name}
              /**
               * Allows send the select object to variable CompCity that correspond the element select
               */
              onChange={(event, value) => setCountry(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccione su país"
                  variant="outlined"
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              /**
               * List of cities
               */
              options={listCities}
              /**
               * This property allows to show in the user's view the property that we want to take from the object.
               * Such as: If we need show the name of the city then we ask the property of the object that correspond the name
               */
              getOptionLabel={(option) => option}
              /**
               * Allows send the select object to variable City that correspond the element select
               */
              onChange={(event, value) => setCity(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccione la ciudad"
                  variant="outlined"
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="curriculumPhone"
              label="Número de Teléfono"
              value={formik.values.curriculumPhone}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumPhone &&
                Boolean(formik.errors.curriculumPhone)
              }
              helperText={
                formik.touched.curriculumPhone && formik.errors.curriculumPhone
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="curriculumEmail"
              label="Correo Electrónico"
              type="email"
              value={formik.values.curriculumEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumEmail &&
                Boolean(formik.errors.curriculumEmail)
              }
              helperText={
                formik.touched.curriculumEmail && formik.errors.curriculumEmail
              }
            />
          </Grid>
        </Grid>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Guardar información.
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoGR;
