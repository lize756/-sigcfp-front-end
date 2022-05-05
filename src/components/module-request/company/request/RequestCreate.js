import React, { useState } from "react";
import { Autocomplete, TextField, Button, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
  addInternRequest,
  getInternRequests,
} from "../../../store/slices/InternRequestSlice";
/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "90%",
    },
    "& .MuiAutocomplete-root": {
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(1),
      width: "105%",
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

  // Allow to send the elements of store
  const dispatch = useDispatch();

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

  const [careers, setCareers] = useState("");
  const [inteRequFunctions, setInteRequFunctions] = useState();
  const [inteRequCompetencies, setInteRequCompetencies] = useState();

  /**
   * Redux
   */
  const list_carreers = useSelector((state) => state.CareerSlice.listCareers);

  // Get company of the store
  const company = useSelector((state) => state.CompanySlice.company);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
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
    const myJSON = JSON.stringify(value);
    setCareers(value);
    const listCrs = [];
    for (let i = 0; i < value.length; i++) {
      listCrs.push(value[i]);
      setCareers(listCrs);
    }
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
  const onSubmit = (e) => {
    e.preventDefault();

    const functions = inteRequFunctions.functions.substring(
      0,
      inteRequFunctions.functions.length - 1
    );

    const competencies = inteRequCompetencies.competencies.substring(
      0,
      inteRequCompetencies.competencies.length - 1
    );

    //  let currentDate = new Date().toLocaleDateString('en-ca')
    const currentDate = new Date().toLocaleDateString();
    const [year, month, day] = data.inteRequStDate.split("-");
    const stDate = day + "/" + month + "/" + year;
    console.log(currentDate, stDate);
    const request = {
      inteRequCreate: currentDate,
      inteRequDuration: data.inteRequDuration,
      inteRequName: data.inteRequName,
      inteRequNumber: data.inteRequNumber,
      inteRequSalary: data.inteRequSalary,
      inteRequDepartment: data.inteRequDepartment,
      inteRequStDate: stDate,
      inteRequFunctions: functions,
      inteRequCompetencies: competencies,
      inteRequBondingType: data.inteRequBondingType,
      inteRequOtherBenefits: data.inteRequOtherBenefits,
      careers: careers,
      company: company,
    };
    console.log(request);

    dispatch(addInternRequest(ACCESS_TOKEN, request));
    navigate("/company/request");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                name="inteRequName"
                placeholder="Smith-Lynch"
                label="Nombre de la solicitud"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                placeholder="Smith-Lynch"
                label="Nombre del creador"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={list_carreers}
                getOptionLabel={(option) => option.careName}
                name="careers"
                onChange={(e, value) => handleSelect(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Carreras de Interés"
                    required
                    placeholder="Carreras de Interés"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="inteRequDepartment"
                placeholder="Recursos humanos\n"
                label="Area o Departamento"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="inteRequNumber"
                placeholder="5"
                label="Número de Estudiantes"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="inteRequStDate"
                label="Fecha de Inicio"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
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
                    required
                    label="Funciones Principales"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
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
                    required
                    label="Competencias Claves del Éxito"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                multiline
                required
                name="inteRequDuration"
                label="Duración de la Practica"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="inteRequSalary"
                label="Valor de Bonificación"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                required
                name="inteRequBondingType"
                label="Tipo de Vinculación"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                required
                name="inteRequOtherBenefits"
                label="Otros Beneficios"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button sx={{ mt: 5, pr: 3 }} variant="contained" type="submit">
            Crear Solicitud
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestCreate;
