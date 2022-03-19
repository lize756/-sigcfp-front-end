import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import axios from "../../../config/axios";

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

const careers = [
  { title: "Diseño Industrial", label: "Diseño Industrial" },
  { title: "Ingeniería de Sistemas", label: "Ingeniería de Sistemas" },
  { title: "Derecho", label: "Derecho" },
  { title: "Psicología", label: "Psicología" },
  { title: "Química Farmacéutica", label: "Química Farmacéutica" },
  { title: "Medicina", label: "Medicina" },
];

//forma de enviar: 1. el nombre del objeto que se recibe = {el nombre que se envia}
const RequestUpdate = ({ request }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [editRequest, setEditRequest] = useState({
    area: "",
    studnumber: 0,
    fechaInicio: "",
    funciones: "",
    compentenciasClaves: "",
    tipoVinculacion: "",
    duracion: "",
    bonificacion: "",
    beneficios: "",
  });

  useEffect(() => {
    setEditRequest(request);
  }, [request]);

  const handleChange = (e) => {
    setEditRequest({ ...editRequest, [e.target.name]: e.target.value });
  };

  //Metodo put aacomodar toda esta clase
  const putRequest = (e) => {
    e.preventDefault();
    const request = {
      id: editRequest.id,
      faculty: "Ingenieria de Sistema",
      career: "Sistemas",
      studnumber: editRequest.studnumber,
      fechaInicio: editRequest.fechaInicio,
      area: editRequest.area,
      funciones: editRequest.funciones,
      competencias: editRequest.competencias,
      tipoVinculacion: editRequest.tipoVinculacion,
      duracion: editRequest.duracion,
      bonificacion: editRequest.bonificacion,
      beneficios: editRequest.beneficios,
    };

    axios
      .put("requests/" + request.id, request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/company/request");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root} onSubmit={putRequest}>
          <Autocomplete
            multiple
            fullWidth
            options={careers}
            getOptionLabel={(option) => option.title}
            name="carreras"
            value={undefined}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Carreras de Interés"
                placeholder="Carreras de Interés"
              />
            )}
          />

          <TextField
            id="outlined-textarea"
            name="area"
            label="Area o Departamento"
            value={editRequest.area}
            multiline
            onChange={handleChange}
          />

          <TextField
            name="studnumber"
            placeholder="12"
            label="Número de Estudiantes"
            multiline
            value={editRequest.studnumber}
            onChange={handleChange}
          />
          <TextField
            name="fechaInicio"
            placeholder="yyyy-mm-dd"
            label="Fecha de Inicio"
            value={editRequest.fechaInicio}
            multiline
            onChange={handleChange}
          />
          <TextField
            name="funciones"
            multiline
            label="Funciones Principales"
            value={editRequest.funciones}
            rows={8}
            onChange={handleChange}
          />
          <TextField
            name="competencias"
            multiline
            label="Competencias Claves del Éxito"
            value={editRequest.competencias}
            rows={8}
            onChange={handleChange}
          />
          <TextField
            name="tipoVinculacion"
            multiline
            label="Tipo de Vinculación"
            value={editRequest.tipoVinculacion}
            onChange={handleChange}
          />
          <TextField
            name="duracion"
            label="Duración de la Practica"
            value={editRequest.duracion}
            multiline
            onChange={handleChange}
          />
          <TextField
            name="bonificacion"
            label="Valor de Bonificación"
            value={editRequest.bonificacion}
            multiline
            onChange={handleChange}
          />
          <TextField
            name="beneficios"
            label="Otros Beneficios"
            value={editRequest.beneficios}
            multiline
            onChange={handleChange}
          />
          <Button sx={{ mt: 5, pr: 3 }} variant="contained" type="submit">
            Editar Solicitud
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestUpdate;
