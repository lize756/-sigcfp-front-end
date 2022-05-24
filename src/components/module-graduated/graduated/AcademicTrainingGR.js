import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  CssBaseline,
} from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

import { useNavigate } from "react-router";
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

const AcademicTrainingGR = () => {
  const classes = useStyles();
  const [studies, setStudies] = useState([
    {
      id: uuidv4(),
      levelStudy: "",
      studyStatus: "",
      startDate: "",
      endDate: "",
      degree: "",
      institutionName: "",
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
        levelStudy: "",
        studyStatus: "",
        startDate: "",
        endDate: "",
        degree: "",
        institutionName: "",
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
              <TextField
                name="levelStudy"
                label="Nivel del estudio"
                variant="outlined"
                placeholder="Bachiller, Tecnólogo, Universitaria, Especialización, Maestría ..."
                required
                value={study.levelStudy}
                onChange={(e) => handleChange(study.id, e)}
              />
              <TextField
                name="studyStatus"
                label="Estado del estudio"
                variant="outlined"
                placeholder="Culminado, En proceso, Aplazado ..."
                required
                value={study.studyStatus}
                onChange={(e) => handleChange(study.id, e)}
              />
              <TextField
                name="startDate"
                label="Fecha de inicio del estudio"
                variant="outlined"
                required
                value={study.startDate}
                placeholder="MM/AAAA"
                onChange={(e) => handleChange(study.id, e)}
              />
              <TextField
                name="endDate"
                label="Fecha de finalización"
                variant="outlined"
                value={study.endDate}
                placeholder="MM/AAAA"
                onChange={(e) => handleChange(study.id, e)}
              />

              <TextField
                name="degree"
                label="Título otorgado"
                variant="outlined"
                required
                value={study.degree}
                placeholder="Ingeniero de sistemas"
                onChange={(e) => handleChange(study.id, e)}
              />

              <TextField
                name="institutionName"
                label="Institución en la que estudio"
                variant="outlined"
                required
                value={study.institutionName}
                placeholder="Universidad ICESI"
                onChange={(e) => handleChange(study.id, e)}
              />

              <div>
                <IconButton onClick={handleAddStudy}>
                  <AddIcon color="primary" />
                </IconButton>
                <IconButton
                  disabled={studies.length === 1}
                  onClick={() => handleRemoveStudy(study.id)}
                >
                  <RemoveIcon color="error" />
                </IconButton>
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
