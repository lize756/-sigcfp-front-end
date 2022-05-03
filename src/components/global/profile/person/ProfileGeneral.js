import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Paper,
  TextField,
  Button,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/PersonPin";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";

const validationSchema = yup.object({
  persFirstName: yup.string("Ingresa tu nombre ").required("Campo obligatorio"),
  persLastName: yup
    .string("Ingresa tus apellidos ")
    .required("Campo obligatorio"),
  persDocument: yup
    .string("Ingresa tu número documento de identidad ")
    .required("Campo obligatorio"),
  persEmail: yup
    .string("Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),
  persAddress: yup
    .string("Ingresa tu dirección ")
    .required("Campo obligatorio"),
});
const ProfileGeneral = () => {
  const listGender = ["MASCULINO", "FEMENINO", "OTRO"];
  const listCities = ["Bogota", "Cali", "Medellin"];
  const listCountries = [
    { id: 1, name: "Colombia" },
    { id: 2, name: "Paraguay" },
    { id: 3, name: "Argentina" },
  ];

  const [getPersGenre, setPersGenre] = useState("MASCULINO");
  const [getPersonCountry, setPersonCountry] = useState({
    id: 1,
    name: "Colombia",
  });
  const [getPersonCity, setPersonCity] = useState("Cali");
  const formik = useFormik({
    initialValues: {
      persFirstName: "Oscar",
      persLastName: "Riascos",
      persDocument: "1234556",
      persEmail: "riascos@gmail.com",
      persAddress: "norte 1234",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      values.persGenre = getPersGenre;
      values.persCityName = getPersonCity;
      values.persCountryName = getPersonCountry;
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Paper sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <PersonIcon
            sx={{ color: green[500], width: 65, height: 65, ml: 5, mt: 1 }}
          />

          <Box md={6}>
            <Typography
              mt={2}
              ml={2}
              variant="h6"
              sx={{ fontWeight: "medium", color: "#072079" }}
            >
              {formik.values.persFirstName + " " + formik.values.persLastName}
            </Typography>
            <Typography
              ml={2}
              mb={2}
              variant="subtitle2"
              sx={{ color: "#072079" }}
            >
              Editar Perfil
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2} mx={1}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Nombres"
                name="persFirstName"
                variant="standard"
                value={formik.values.persFirstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.persFirstName &&
                  Boolean(formik.errors.persFirstName)
                }
                helperText={
                  formik.touched.persFirstName && formik.errors.persFirstName
                }
              />
            </Grid>{" "}
            <Grid item xs={6}>
              <TextField
                label="Apellidos"
                sx={{ width: "85%" }}
                name="persLastName"
                variant="standard"
                value={formik.values.persLastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.persLastName &&
                  Boolean(formik.errors.persLastName)
                }
                helperText={
                  formik.touched.persLastName && formik.errors.persLastName
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Documento de identidad"
                name="persDocument"
                variant="standard"
                value={formik.values.persDocument}
                onChange={formik.handleChange}
                error={
                  formik.touched.persDocument &&
                  Boolean(formik.errors.persDocument)
                }
                helperText={
                  formik.touched.persDocument && formik.errors.persDocument
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                type="email"
                label="Correo electrónico"
                name="persEmail"
                variant="standard"
                value={formik.values.persEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.persEmail && Boolean(formik.errors.persEmail)
                }
                helperText={formik.touched.persEmail && formik.errors.persEmail}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                id="combo-box-persGenre"
                disablePortal
                value={getPersGenre}
                options={listGender}
                onChange={(event, value) => setPersGenre(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Género"
                    variant="standard"
                    error={getPersGenre === null}
                    helperText={
                      getPersGenre === null ? "Elemento requerido" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                defaultValue={{ name: getPersonCountry.name }}
                // List of countries
                options={listCountries}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setPersonCountry(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su país"
                    variant="standard"
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
                sx={{ width: "85%" }}
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                //List of cities
                options={listCities}
                value={getPersonCity}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option}
                /**
                 * Allows send the select object to variable CompCity that correspond the element select
                 */
                onChange={(event, value) => setPersonCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
                    variant="standard"
                    required
                    error={getPersonCity === ""}
                    helperText={
                      getPersonCity === "" ? "Elemento requerido" : ""
                    }
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setPersonCity(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ my: 4, ml: 4 }}
            variant="contained"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Guardar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ProfileGeneral;
