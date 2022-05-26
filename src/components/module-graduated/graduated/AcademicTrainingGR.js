import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  CssBaseline,
  Stack,
  Autocomplete,
} from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

import { makeStyles } from "@material-ui/core";

import { v4 as uuidv4 } from "uuid";

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
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },

    "& ..MuiIconButton-root": {
      margin: theme.spacing(2),
    },
  },
}));

const status = ["Culminado", "En curso", "Abandonado", "Aplazado"];
const level = [
  "Preescolar",
  "Básica Primaria (1° - 5°)",
  "Básica Secundaria (6° - 9°)",
  "Media (10° - 13°)",
  "Técnico Laboral",
  "Formación Técnica Profesional",
  "Tecnológica",
  "Universitaria",
  "Especialización",
  "Maestría",
  "Doctorado",
];

const AcademicTrainingGR = () => {
  const classes = useStyles();
  const [studies, setStudies] = useState([
    {
      id: uuidv4(),
      acadStudLevel: "",
      acadStudStatus: "",
      acadStudStartDate: "",
      acadStudEndDate: "",
      acadStudTitule: "",
      acadStudInsti: "",
      acadCountryName: "",
      acadCityName: "",
    },
  ]);

  /**
   * This method allow print to console the result of the form
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(studies);
  };

  /**
   * This function allows to draw a new form
   */
  const handleAddStudy = () => {
    setStudies([
      ...studies,
      {
        id: uuidv4(),
        acadStudLevel: "",
        studyStatus: "",
        acadStudStartDate: "",
        acadStudEndDate: "",
        acadStudTitule: "",
        acadStudInsti: "",
      },
    ]);
  };

  /**
   * This function allows to delete a new form
   * @param {*} id of study
   */
  const handleRemoveStudy = (id) => {
    const values = [...studies];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setStudies(values);
  };

  /**
   * This function allows you to save changes to studies details
   * @param {*} id of studies
   * @param {*} e is a event
   */
  const handleChange = (id, e) => {
    const newStudy = studies.map((i) => {
      if (id === i.id) {
        i[e.target.name] = e.target.value;
      }
      return i;
    });

    setStudies(newStudy);
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#F2F6FE" }} />

        <form className={classes.root} onSubmit={handleSubmit}>
          {studies.map((study) => (
            <div key={study.id}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={level}
                onChange={(e, value) => {
                  handleChange(study.id, {
                    target: { value: value, name: "acadStudLevel" },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Nivel del estudio" />
                )}
              />

              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={status}
                onChange={(e, value) => {
                  handleChange(study.id, {
                    target: { value: value, name: "studyStatus" },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Estado del estudio" />
                )}
              />

              <TextField
                name="acadStudStartDate"
                label="Fecha de inicio del estudio"
                variant="outlined"
                required
                value={study.acadStudStartDate}
                placeholder="MM/AAAA"
                onChange={(e) => handleChange(study.id, e)}
              />
              <TextField
                name="acadStudEndDate"
                label="Fecha de finalización"
                variant="outlined"
                value={study.acadStudEndDate}
                placeholder="MM/AAAA"
                onChange={(e) => handleChange(study.id, e)}
              />

              <TextField
                name="acadStudTitule"
                label="Título otorgado"
                variant="outlined"
                required
                value={study.acadStudTitule}
                placeholder="Ingeniero de sistemas"
                onChange={(e) => handleChange(study.id, e)}
              />

              <TextField
                name="acadStudInsti"
                label="Institución en la que estudio"
                variant="outlined"
                required
                value={study.acadStudInsti}
                placeholder="Universidad ICESI"
                onChange={(e) => handleChange(study.id, e)}
              />
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="free-solo-persCountryName"
                  disableClearable
                  defaultValue={{ name: formik.values.persCountryName }}
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
                  id="free-solo-persCityName"
                  defaultValue={formik.values.persCityName}
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

              <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={handleAddStudy}>
                    <AddIcon color="primary" />
                  </IconButton>
                  <IconButton
                    disabled={studies.length === 1}
                    onClick={() => handleRemoveStudy(study.id)}
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                </Stack>
              </div>
            </div>
          ))}
          <div>
            <Button type="submit" variant="contained" color="primary">
              Guardar información.
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AcademicTrainingGR;
