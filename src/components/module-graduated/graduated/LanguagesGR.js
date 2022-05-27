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

const language = [
  "Mandarin",
  "Frances",
  "Portugues",
  "Japones",
  "Italiano",
  "Griego",
  "Romano",
];

const level = ["Basico", "Intermedio", "Avanzado"];

const LanguagesGR = () => {
  const classes = useStyles();
  const [studies, setStudies] = useState([
    {
      id: uuidv4(),
      languName: "",
      languLevel: "",
      languEndDate: "",
      languInstitutionName: "",
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
        languId: uuidv4(),
        languName: "",
        languLevel: "",
        languEndDate: "",
        languInstitutionName: "",
      },
    ]);
  };

  /**
   * This function allows to delete a new form
   * @param {*} languId of study
   */
  const handleRemoveStudy = (languId) => {
    const values = [...studies];
    values.splice(
      values.findIndex((value) => value.languId === languId),
      1
    );
    setStudies(values);
  };

  /**
   * This function allows you to save changes to studies details
   * @param {*} languId of studies
   * @param {*} e is a event
   */
  const handleChange = (languId, e) => {
    const newStudy = studies.map((i) => {
      if (languId === i.languId) {
        i[e.target.name] = e.target.value;
        console.log(e.target.name);
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
            <div key={study.languId}>
              <Autocomplete
                fullWidth
                disablePortal
                name="languName"
                id="combo-box-demo"
                options={language}
                onChange={(e, value) => {
                  handleChange(study.languId, {
                    target: { value: value, name: "languName" },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Idioma Estudiado" />
                )}
              />

              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={level}
                onChange={(e, value) => {
                  handleChange(study.languId, {
                    target: { value: value, name: "languLevel" },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Nivel del idioma estudiado"
                  />
                )}
              />

              <TextField
                name="languEndDate"
                label="Fecha de finalización"
                variant="outlined"
                value={study.languEndDate}
                placeholder="MM/AAAA"
                onChange={(e) => handleChange(study.languId, e)}
              />

              <TextField
                name="languInstitutionName"
                label="Institución en la que estudio"
                variant="outlined"
                value={study.languInstitutionName}
                placeholder="Universidad ICESI"
                onChange={(e) => handleChange(study.languId, e)}
              />

              <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={handleAddStudy}>
                    <AddIcon color="primary" />
                  </IconButton>
                  <IconButton
                    disabled={studies.length === 1}
                    onClick={() => handleRemoveStudy(study.languId)}
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

export default LanguagesGR;
