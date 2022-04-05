import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Chip, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import axios from "../../../config/axios";
import moment from "moment";

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
      width: "90%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

/**
 * This Component is responsible for displaying the request information
 * @param {*} param0 request to display and the edit function that sends the component to update the entire request
 * @returns
 */
const RequestLocView = ({ request }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [currentRequest, setCurrentRequest] = useState({
    inteRequName: " ",
    inteRequDepartment: "",
    inteRequNumber: 0,
    inteRequStDate: "",
    inteRequBondingType: "",
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequOtherBenefits: "",
  });
  const [careers, setCareers] = useState([]);
  const [inteRequFunctions, setInteRequFunctions] = useState();
  const [inteRequCompetencies, setInteRequCompetencies] = useState();

  useEffect(() => {
    setCurrentRequest(request);
    setCareers(request.careers);
    setInteRequFunctions(request.setInteRequFunctions);
    setInteRequCompetencies(request.inteRequCompetencies);
  }, [request]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root}>
          <TextField
            name="inteRequName"
            value={currentRequest.inteRequName}
            label="Nombre de la solicitud"
            disabled
          />

          <Box
            sx={{
              bgcolor: "#F2F6FE",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {careers.map((career) => {
              return (
                <ListItem key={career.careId}>
                  <Chip label={career.careName} />
                </ListItem>
              );
            })}
          </Box>

          <TextField
            id="outlined-textarea"
            name="inteRequDepartment"
            value={currentRequest.inteRequDepartment}
            disabled
            label="Area o Departamento"
          />

          <TextField
            name="inteRequNumber"
            label="Número de Estudiantes"
            value={currentRequest.inteRequNumber}
            type="number"
            disabled
          />
          <TextField
            name="inteRequStDate"
            label="Fecha de Inicio"
            value={currentRequest.inteRequStDate}
            disabled
          />

          <TextField
            id="outlined-textarea"
            name="inteRequFunctions"
            label="Funciones Principales"
            disabled
          />
          <TextField
            id="outlined-textarea"
            name="inteRequCompetencies"
            label="Competencias Claves del Éxito"
            disabled
          />

          <TextField
            name="inteRequBondingType"
            multiline
            label="Tipo de Vinculación"
            value={currentRequest.inteRequBondingType}
            disabled
          />
          <TextField
            name="inteRequDuration"
            label="Duración de la Practica"
            value={currentRequest.inteRequDuration}
            disabled
          />
          <TextField
            name="inteRequSalary"
            label="Valor de Bonificación"
            type="number"
            value={currentRequest.inteRequSalary}
            disabled
          />
          <TextField
            name="inteRequOtherBenefits"
            label="Otros Beneficios"
            multiline
            value={currentRequest.inteRequOtherBenefits}
            disabled
          />
        </form>
      </Box>
    </Container>
  );
};

export default RequestLocView;
