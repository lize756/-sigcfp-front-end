import React, { useState } from "react";
import { Autocomplete, TextField, Button, Chip } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import axios from "../../../config/axios";

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

/**
 * This component is responsible for the creation of a new request for interns by a company
 * @returns
 */
const RequestCreate = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a request
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
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
  const [listCareers, setlistCareers] = useState([]);
  const [inteRequFunctions, setInteRequFunctions] = useState();
  const [inteRequCompetencies, setInteRequCompetencies] = useState();

  // GET request using axios inside useEffect React hook
  useEffect(() => {
    axios.get("careers").then((res) => {
      setlistCareers(res.data);
    });
  }, []);

  //------------Handlechange functions-------------------------------

  /**
   * This function assigns the information completed by the user with its respective attribute.
   * attributes like: inteRequName, inteRequDepartment, inteRequNumber, inteRequStDate,
   * inteRequBondingType. inteRequDuration, inteRequSalary, inteRequOtherBenefits.
   * @param {*} e
   */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    let arrayCareers = careers;
    arrayCareers[arrayCareers.length] = value;
    setCareers(arrayCareers);
  };

  /**
   * This function is responsible for saving the functionalities entered by the user in the attribute inteRequFunctions
   * @param {*} value
   */
  const handleFunctions = (value) => {
    const functions = value + ",";
    setInteRequFunctions({ ...inteRequFunctions, functions });
  };

  /**
   * This function is responsible for saving the Competencies entered by the user in the attribute inteRequCompetencies
   * @param {*} value
   */
  const handleCompetencies = (value) => {
    const competencies = value + ",";
    setInteRequCompetencies({ ...inteRequCompetencies, competencies });
  };

  /**
   * This function is responsible for relaying the information of the new intern request with the
   * model through the use of axios
   * @param {*} e represents an event
   */
  const addRequest = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString();

    console.log(inteRequFunctions.functions);
    console.log(inteRequCompetencies.competencies);

    const request = {
      inteRequCreate: today,
      inteRequDuration: data.inteRequDuration,
      inteRequName: data.inteRequName,
      inteRequNumber: data.inteRequNumber,
      inteRequSalary: data.inteRequSalary,
      inteRequDepartament: data.inteRequDepartment,
      inteRequStDate: data.inteRequStDate,
      inteRequFunctions: inteRequFunctions.functions,
      inteRequCompetencies: inteRequCompetencies.competencies,
      inteRequBondingType: data.inteRequBondingType,
      inteRequOtherBenefits: data.inteRequOtherBenefits,
      careers: careers,
    };

    axios
      .post("internRequests/add", request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/company/request");
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

          <Autocomplete
            multiple
            fullWidth
            options={[]}
            rows={4}
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
            onChange={(e, value) => handleFunctions(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Funciones Principales"
              />
            )}
          />

          <Autocomplete
            multiple
            fullWidth
            options={[]}
            rows={4}
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
            onChange={(e, value) => handleCompetencies(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Competencias Claves del Éxito"
              />
            )}
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
