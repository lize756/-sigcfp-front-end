import React, { useState } from "react";
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

const listCareers = [
  {
    careId: 1,
    careName: "Diseño Industrial",
    faculty: { facuId: 1, facuName: "Ingeniería" },
  },
  {
    careId: 2,
    careName: "Ingeniería de Sistemas",
    faculty: { facuId: 1, facuName: "Ingeniería" },
  },
  {
    careId: 3,
    careName: "Medicina",
    faculty: { facuId: 2, facuName: "Ciencias de la Salud" },
  },
  {
    careId: 4,
    careName: "Derecho",
    faculty: { facuId: 3, facuName: "Derecho y ciencias sociales" },
  },
  {
    careId: 5,
    careName: "Psicología",
    faculty: { facuId: 3, facuName: "Derecho y ciencias sociales" },
  },
];

const RequestCreate = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [data, setData] = useState({
    inteRequDepartment: "",
    inteRequNumber: 0,
    inteRequDateStart: "",
    inteRequFunctions: "",
    inteRequcompetence: "",
    inteRequBondingType: "",
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequBenefits: "",
  });

  const [careers, setCareers] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    let arrayCareers = careers;
    arrayCareers[arrayCareers.length] = value;
    setCareers(arrayCareers);
    const car1 = careers[0];
    console.log(car1);
  };

  //Metodo add
  const addRequest = (e) => {
    e.preventDefault();

    const request = {
      id: Math.floor(Math.random() * 10000),
      //faculty: careers.faculty.facuName,
      //careers: careers,
      faculty: "Facultad",
      careers: careers[0].careName,
      inteRequDepartment: data.inteRequDepartment,
      inteRequNumber: data.inteRequNumber,
      inteRequDateStart: data.inteRequDateStart,
      inteRequFunctions: data.inteRequFunctions,
      inteRequcompetence: data.inteRequcompetence,
      inteRequBondingType: data.inteRequBondingType,
      inteRequDuration: data.inteRequDuration,
      inteRequSalary: data.inteRequSalary,
      inteRequBenefits: data.inteRequBenefits,
    };

    axios
      .post("requests/", request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //navigate("/company/request");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root} onSubmit={addRequest}>
          <Autocomplete
            multiple
            fullWidth
            options={listCareers}
            getOptionLabel={(option) => option.careName}
            name="careers"
            onChange={(e, value) => handleSelect(value)}
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
            name="inteRequDepartment"
            label="Area o Departamento"
            onChange={handleChange}
          />

          <TextField
            name="inteRequNumber"
            placeholder="5"
            label="Número de Estudiantes"
            type="number"
            onChange={handleChange}
          />
          <TextField
            name="inteRequDateStart"
            placeholder="yyyy-mm-dd"
            label="Fecha de Inicio"
            onChange={handleChange}
          />
          <TextField
            name="inteRequFunctions"
            multiline
            label="Funciones Principales"
            rows={8}
            onChange={handleChange}
          />
          <TextField
            name="inteRequcompetence"
            multiline
            label="Competencias Claves del Éxito"
            rows={8}
            onChange={handleChange}
          />
          <TextField
            name="inteRequBondingType"
            multiline
            label="Tipo de Vinculación"
            onChange={handleChange}
          />
          <TextField
            name="inteRequBenefits"
            label="Duración de la Practica"
            multiline
            onChange={handleChange}
          />
          <TextField
            name="inteRequSalary"
            label="Valor de Bonificación"
            type="number"
            onChange={handleChange}
          />
          <TextField
            name="inteRequBenefits"
            label="Otros Beneficios"
            multiline
            onChange={handleChange}
          />
          <Button sx={{ mt: 5, pr: 3 }} variant="contained" type="submit">
            Crear Solicitud
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestCreate;
