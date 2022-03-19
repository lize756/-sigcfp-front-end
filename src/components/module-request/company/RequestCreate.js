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
    inteRequName: " ",
    inteRequDepartment: "",
    inteRequNumber: 0,
    inteRequStDate: "",
    inteRequFunctions: "",
    inteRequCompetencies: "",
    inteRequBondingType: "",
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequOtherBenefits: "",
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
    console.log("car" + car1.careName);
  };

  //Metodo add
  const addRequest = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString();
    console.log(today);

    const request = {
      id: Math.floor(Math.random() * 10000),
      inteRequCreate: today,
      inteRequDuration: data.inteRequDuration,
      inteRequName: "",
      inteRequNumber: data.inteRequNumber,
      inteRequSalary: data.inteRequSalary,
      inteRequDepartament: data.inteRequDepartment,
      inteRequStDate: data.inteRequStDate,
      inteRequFunctions: data.inteRequFunctions,
      inteRequCompetencies: data.inteRequCompetencies,
      inteRequBondingType: data.inteRequBondingType,
      inteRequOtherBenefits: data.inteRequOtherBenefits,

      //faculty: careers.faculty.facuName,
      //careers: careers,
      faculty: "Facultad",
      careers: careers[0].careName,
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
          <TextField
            name="inteRequName"
            placeholder="Smith-Lynch"
            label="Nombre de la solicitud"
            onChange={handleChange}
          />

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
            placeholder="Recursos humanos\n"
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
            name="inteRequStDate"
            label="Fecha de Inicio"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            onChange={handleChange}
          />
          <TextField
            name="inteRequFunctions"
            multiline
            label="Funciones Principales"
            rows={8}
            onChange={handleChange}
          />

          <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="freeSolo"
                placeholder="Favorites"
              />
            )}
          />

          <TextField
            name="inteRequCompetencies"
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
            name="inteRequDuration"
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
            name="inteRequOtherBenefits"
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
