import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Button, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import NumberFormat from "react-number-format";
/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { addInternRequest } from "../../../store/slices/InternRequestSlice";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../../store/slices/CountrySlice";

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
    },

    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));
/**
 * This method allow change the custom format a element of texfield
 * @param {} props
 * @returns
 */
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      // isNumericString
    />
  );
}
/**
 * This component is responsible for the creation of a new request for interns by a company
 * @returns
 */
const RequestCreate = () => {
  const classes = useStyles();

  /**
   * ---------------------------------------------------------
   * -------------------------REDUX-----------------------
   * ---------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  const listCities = useSelector((state) => state.CountrySlice.listCities);

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
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequOtherBenefits: "",
  });

  //List of countries and cities
  const [getCountry, setCountry] = useState("");
  const [getCity, setCity] = useState("");

  const [careers, setCareers] = useState("");
  const [inteRequFunctions, setInteRequFunctions] = useState();
  const [inteRequCompetencies, setInteRequCompetencies] = useState();
  const [inteRequBondingType, setInteRequBondingType] = useState();
  /**
   * ---------------------------------------------------------------------------
   * ----------------------------------Lists------------------------------------
   * ---------------------------------------------------------------------------
   */
  //Its represents the type of practice.
  const listIntRequLocation = ["Nacional", "Internacional"];
  // Its represents the different bonding types that one company has.
  const listInteRequBondingType = [
    "Contrato a Término Fijo",
    "Contrato a Término Indefinido",
    "Contrato de Obra o Labor",
    "Contrato civil por prestación de servicios",
    "Contrato de Aprendizaje",
    "Contrato ocasional de trabajo",
  ];

  /**
   * ---------------------------------------------------------------------------
   * ----------------------------------End lists--------------------------------
   * ---------------------------------------------------------------------------
   */
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

  //================================================= UseEffect ===================================================

  // GET request using axios inside useEffect React hook
  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCountry.name));
    }
  }, [getCountry]);

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
      inteRequBondingType: inteRequBondingType,
      inteRequOtherBenefits: data.inteRequOtherBenefits,
      careers: careers,
      company: company,
      inteRequCountryName: getCountry.name,
      inteRequCityName: getCity,
      inteRequStatus: "Nuevo",
    };
    dispatch(addInternRequest(ACCESS_TOKEN, request));
    navigate("/company/request");
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root} onSubmit={onSubmit}>
          <Grid container spacing={2} mr={4}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="inteRequName"
                placeholder="Solicitud de practicantes de ingeniería"
                label="Nombre de la solicitud"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                fullWidth
                options={list_carreers}
                getOptionLabel={(option) => option.careName}
                name="careers"
                onChange={(e, value) => handleSelect(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Carreras de Interés"
                    required={careers.length === 0}
                    placeholder="Carreras de Interés"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="inteRequDepartment"
                placeholder="Recursos humanos\n"
                label="Area o Departamento"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
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
                fullWidth
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
                    required={
                      inteRequFunctions !== undefined
                        ? inteRequFunctions.length === 0
                        : true
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
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
                    required={
                      inteRequCompetencies !== undefined
                        ? inteRequCompetencies.length === 0
                        : true
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                multiline
                fullWidth
                required
                name="inteRequDuration"
                label="Duración de la Practica"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                multiline
                required
                fullWidth
                name="inteRequSalary"
                label="Valor de Bonificación"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-inteRequBondingType"
                disablePortal
                options={listInteRequBondingType}
                onChange={(event, value) => setInteRequBondingType(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Tipo de vinculación"
                    error={inteRequBondingType === null}
                    helperText={
                      inteRequBondingType === null ? "Elemento requerido" : ""
                    }
                    onChange={(event, value) => setInteRequBondingType(value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                // List of countries
                options={listCountries}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setCountry(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su país"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",

                      required: getCountry === {},
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                //List of cities
                options={listCities}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option}
                /**
                 * Allows send the select object to variable CompCity that correspond the element select
                 */
                onChange={(event, value) => setCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
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
            <Grid item xs={12}>
              <TextField
                multiline
                required
                fullWidth
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
