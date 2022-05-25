import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Button, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getCitiesAssociatedToCountry } from "../../store/slices/CountrySlice";
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
  curriculumLastName: yup
    .string("Escribe tus apellidos")
    .required("Campo requerido"),
  curriculumID: yup
    .string("Escribe tu número de identificación")
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
  const [getDate, setDate] = useState(new Date());

  const [getGenre, setGenre] = useState("");
  const [getCivilStatus, setCivilStatus] = useState("");
  const [getCountry, setCountry] = useState({});
  const [getCity, setCity] = useState("");

  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */

  // Allow to send the elements of store
  const dispatch = useDispatch();

  // Get person saved of the store
  const currentPerson = useSelector((state) => state.PersonSlice.person);

  //Correspond of list of countries saved in the store.
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  //Correspond of list of cities saved in the store.
  const listCities = useSelector((state) => state.CountrySlice.listCities);
  const formik = useFormik({
    initialValues: {
      curriculumName: currentPerson.persFirstName,
      curriculumLastName: currentPerson.persLastName,
      curriculumID: currentPerson.persDocument,
      curriculumGenre: currentPerson.persGenre,
      curriculumCountry: currentPerson.persCountryName,
      curriculumCity: currentPerson.persCityName,
      curriculumPhone: "",
      curriculumEmail: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const curriculum = values;
      curriculum.curriculumTypeDocument = getTypeDocument;
      curriculum.curriculumBirth = getDate;
      curriculum.curriculumGenre = (curriculum.curriculumGenre !== "")?curriculum.curriculumGenre:getGenre;
      curriculum.curriculumCivilStatus = getCivilStatus;
      curriculum.curriculumCountry = (curriculum.curriculumCountry !== "")?curriculum.curriculumCountry:getCountry.name;
      curriculum.curriculumCity = (curriculum.curriculumCity !== "")?curriculum.curriculumCity:getCity;

      alert(JSON.stringify(values, null, 2));
    },
  });

  /**
   * ---------------------------useEffect-----------------------------
   */
  /**
   * This used effect allow display the list of countries associated a country particular
   */
  useEffect(() => {
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCountry.name));
    }
  }, [getCountry]);

  /**
   * ---------------------------End useEffect-----------------------------
   */
  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mr={4}>
          <Grid item xs={6}>
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
              name="curriculumLastName"
              label="Apellidos"
              value={formik.values.curriculumLastName}
              onChange={formik.handleChange}
              error={
                formik.touched.curriculumLastName &&
                Boolean(formik.errors.curriculumLastName)
              }
              helperText={
                formik.touched.curriculumLastName &&
                formik.errors.curriculumLastName
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
              label="Número documento"
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              type="date"
              label="Fecha de nacimiento"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              defaultValue={formik.values.curriculumGenre}
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
              id="free-solo-curriculumCountry"
              disableClearable
              defaultValue={{ name: formik.values.curriculumCountry }}
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
              id="free-solo-curriculumCity"
              defaultValue={formik.values.curriculumCity}
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

          <Grid item xs={12}>
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
            Siguiente.
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoGR;
