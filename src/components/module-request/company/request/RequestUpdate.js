import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Chip, Checkbox } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container, Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import NumberFormat from "react-number-format";
/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { updateInternRequest } from "../../../store/slices/InternRequestSlice";
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
    maxWidth: "95%",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
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

//forma de enviar: 1. el nombre del objeto que se recibe = {el nombre que se envia}
/**
 * This component is responsible for the update of a request for interns by a company
 * @params the intern request to update
 * @returns
 */
const RequestUpdate = () => {
  /**
   * ---------------------------------------------------------
   * -------------------------REDUX---------------------------
   * ---------------------------------------------------------
   */
  const list_carreers = useSelector((state) => state.CareerSlice.listCareers);
  const request = useSelector((state) => state.InternRequestSlice.intReq);
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  const listCities = useSelector((state) => state.CountrySlice.listCities);
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  const classes = useStyles();
  let navigate = useNavigate();

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a request
   * -------------------------------------------------------------
   */
  //const [listCareers, setlistCareers] = useState([]);
  const [careers, setCareers] = useState([]);
  /**
   * Careers states
   */
  const [defaultCareers, setDefaultCareers] = useState([]);

  /**
   * Inter request functions states
   */
  const [defaultInteRequFunctions, setDefaultInteRequFunctions] = useState([]);
  const [inteRequFunctions, setInteRequFunctions] = useState([]);

  /**
   * Inter request competencies states.
   */
  const [inteRequCompetencies, setInteRequCompetencies] = useState([]);
  const [
    defaultInteRequCompetencies,
    setDefaultInteRequCompetencies,
  ] = useState([]);
  const [editRequest, setEditRequest] = useState({
    inteRequName: " ",
    inteRequDepartment: "",
    inteRequNumber: 0,
    inteRequStDate: "",
    inteRequBondingType: "",
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequOtherBenefits: "",
    inteRequStatus: "",
    inteRequPracticeModality: "",
    inteRequCountryName: "",
    inteRequCityName: "",
  });
  const [isRender, setIsRender] = useState(false);
  const [inteRequBondingType, setInteRequBondingType] = useState();
  const [inteRequPracticeModality, setInteRequPracticeModality] = useState();
  //List of countries and cities
  const [getCountry, setCountry] = useState("");
  const [getCity, setCity] = useState("");
  //================================================= UseEffect ===================================================
  // GET request using axios inside useEffect React hook
  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCountry.name));
    }
  }, [getCountry]);
  // GET request using axios inside useEffect React hook
  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCountry.name));
    }
  }, [getCountry]);

  useEffect(() => {
    setEditRequest(request);
    setIsRender(true);

    /**
     * Carreers
     */
    setDefaultCareers(request.careers);
    //setCareers(list_carreers);
    /**
     * Intern request functions
     */
    if (request.inteRequFunctions !== "") {
      const arrayDefaults = request.inteRequFunctions.split(",");
      setDefaultInteRequFunctions(arrayDefaults);
      setInteRequFunctions(arrayDefaults);
    }

    /**
     * Intern request competencies
     */
    if (request.inteRequCompetencies !== "") {
      const arrayDefaults = request.inteRequCompetencies.split(",");
      setDefaultInteRequCompetencies(arrayDefaults);
      setInteRequCompetencies(arrayDefaults);
    }
  }, [request]);

  //================================================= End useEffect ===================================================

  /**
   * This function is responsible for converting the
   * date loaded from the database to the format needed by textfield date
   * @returns  date in correct format
   */
  const getDate = () => {
    const [day, month, year] = editRequest.inteRequStDate.split("/");
    return year + "-" + month + "-" + day;
  };
  //------------Handlechange functions-----------------------------------
  const handleChange = (e) => {
    setEditRequest({ ...editRequest, [e.target.name]: e.target.value });
  };

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    console.log(value);
    setCareers(value);
  };

  /**
   * This function is responsible for saving the functionalities entered by the user in the attribute inteRequFunctions
   * @param {*} value
   */
  const handleFunctions = (value) => {
    const functions = value;
    setInteRequFunctions(functions);
  };

  /**
   * This function is responsible for saving the Competencies entered by the user in the attribute inteRequCompetencies
   * @param {*} value
   */
  const handleCompetencies = (value) => {
    //const competencies = [...new Set([...defaultInteRequCompetencies, ...value]),];
    const competencies = value;
    console.log(competencies);
    setInteRequCompetencies(competencies);
  };

  //Metodo put aacomodar toda esta clase
  const putRequest = (e) => {
    e.preventDefault();
    /**
     * This line allow formatter of elements that the user write in the user interface
     * for the format to be accepted by the database
     */
    /**
     * Formatted dates
     */
    const [year, month, day] = editRequest.inteRequStDate.split("-");
    // Verified that date have the size of default
    const formattedStDate =
      editRequest.inteRequStDate === request.inteRequStDate
        ? request.inteRequStDate
        : day + "/" + month + "/" + year;
    /**
     * Formatted arrays
     */
    const formattedFunctions = inteRequFunctions.toString();
    const formattedCompetencies = inteRequCompetencies.toString();
    const formattedCareers =
      careers.length > 0 ? [...new Set([...careers])] : defaultCareers;

    const requesUpdate = {
      inteRequId: editRequest.inteRequId,
      inteRequDuration: editRequest.inteRequDuration,
      inteRequName: editRequest.inteRequName,
      inteRequNumber: editRequest.inteRequNumber,
      inteRequSalary: editRequest.inteRequSalary,
      inteRequDepartment: editRequest.inteRequDepartment,
      inteRequStDate: formattedStDate,
      inteRequCreate: request.inteRequCreate,
      inteRequFunctions: formattedFunctions,
      inteRequCompetencies: formattedCompetencies,
      inteRequBondingType:
        inteRequBondingType === undefined
          ? editRequest.inteRequBondingType
          : inteRequBondingType,
      inteRequPracticeModality:
        inteRequPracticeModality === undefined
          ? editRequest.inteRequPracticeModality
          : inteRequPracticeModality,
      inteRequCountryName:
        getCountry === undefined
          ? editRequest.inteRequCountryName
          : getCountry.name,
      inteRequCityName:
        getCity === undefined ? editRequest.inteRequCityName : getCity,
      inteRequOtherBenefits: editRequest.inteRequOtherBenefits,
      company: editRequest.company,
      careers: formattedCareers,
      inteRequStatus: editRequest.inteRequStatus,
    };

    //console.log(requesUpdate);

    dispatch(
      updateInternRequest(ACCESS_TOKEN, requesUpdate.inteRequId, requesUpdate)
    );
    navigate("/company/request");
  };
  /**
   * ---------------------------------------------------------------------------
   * ----------------------------------Lists------------------------------------
   * ---------------------------------------------------------------------------
   */
  // Its represents the different bonding types that one company has.
  const listInteRequBondingType = [
    "Contrato a Término Fijo",
    "Contrato a Término Indefinido",
    "Contrato de Obra o Labor",
    "Contrato civil por prestación de servicios",
    "Contrato de Aprendizaje",
    "Contrato ocasional de trabajo",
  ];

  // Its represents the practice modality that offers a company
  const listPracticeModality = ["Presencial", "Virtual", "Mixta"];

  /**
   * ---------------------------------------------------------------------------
   * ----------------------------------End lists--------------------------------
   * ---------------------------------------------------------------------------
   */

  if (isRender) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#F2F6FE" }}>
          <form className={classes.root} onSubmit={putRequest}>
            <Grid container spacing={2} mr={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="inteRequName"
                  value={editRequest.inteRequName}
                  label="Nombre de la solicitud"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  fullWidth
                  defaultValue={defaultCareers}
                  options={list_carreers}
                  freeSolo
                  getOptionLabel={(option) => option.careName}
                  getOptionSelected={(option, value) =>
                    option.careId === value.careId
                  }
                  name="careers"
                  onChange={(e, value) => handleSelect(value)}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Carreras de Interés"
                      placeholder="Carreras de Interés"
                      required={
                        (careers.length === 0) & (defaultCareers.length === 0)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="inteRequDepartment"
                  value={editRequest.inteRequDepartment}
                  label="Area o Departamento"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="inteRequNumber"
                  value={editRequest.inteRequNumber}
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
                  defaultValue={getDate()}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  fullWidth
                  defaultValue={defaultInteRequFunctions}
                  options={inteRequFunctions}
                  freeSolo
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => option === value}
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
                  defaultValue={defaultInteRequCompetencies}
                  options={inteRequCompetencies}
                  freeSolo
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => option === value}
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
                  required
                  fullWidth
                  name="inteRequDuration"
                  label="Duración de la Practica"
                  multiline
                  value={editRequest.inteRequDuration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="inteRequSalary"
                  label="Valor de Bonificación"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={editRequest.inteRequSalary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-inteRequBondingType"
                  disablePortal
                  defaultValue={editRequest.inteRequBondingType}
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
                  id="combo-box-InteRequPracticeModality"
                  defaultValue={editRequest.inteRequPracticeModality}
                  disablePortal
                  options={listPracticeModality}
                  onChange={(event, value) =>
                    setInteRequPracticeModality(value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Modalidad de práctica"
                      error={inteRequPracticeModality === null}
                      helperText={
                        inteRequPracticeModality === null
                          ? "Elemento requerido"
                          : ""
                      }
                      onChange={(event, value) =>
                        setInteRequPracticeModality(value)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  disableClearable
                  id="free-solo-countries"
                  defaultValue={{ name: editRequest.inteRequCountryName }}
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
                  id="free-solo-cities"
                  defaultValue={editRequest.inteRequCityName}
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
                  required
                  fullWidth
                  name="inteRequOtherBenefits"
                  label="Otros Beneficios"
                  value={editRequest.inteRequOtherBenefits}
                  multiline
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button sx={{ mt: 5, pr: 3 }} variant="contained" type="submit">
              Editar Solicitud
            </Button>
          </form>
        </Box>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default RequestUpdate;
