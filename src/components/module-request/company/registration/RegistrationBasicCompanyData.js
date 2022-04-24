import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../../config/axios";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../../store/slices/CountrySlice";
import { addCompany, setCompany } from "../../../store/slices/CompanySlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: theme.spacing(2),

    "& .MuiAutocomplete-root": {
      width: "100%",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
    "&  .MuiFormLabel-root": {
      alignItems: "left",
    },
  },
}));
/**
 *
 * @param {*} propsWithAccordion Represent the property that the component called accordion has.
 * @param {*} isRendered Represent
 * @returns
 */
const RegistrationBasicCompanyData = () => {
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

  /**
   * ---------------------------------------------------------
   * -------------------------CONSTANTS-----------------------
   * ---------------------------------------------------------
   */
  const classes = useStyles();
  // create state variables for each input
  const [getCompName, setCompName] = useState("");
  const [getCompNit, setCompNit] = useState("");
  const [getCompAddress, setCompAddress] = useState("");
  const [getCompCountry, setCompCountry] = useState("");
  const [getCompCity, setCompCity] = useState("");
  const [getCompEcoActiv, setCompEcoActiv] = useState("");
  const [getCompType, setCompType] = useState("");
  const [getCompUrlAddress, setCompUrlAddress] = useState("");
  const [getCompIcesiStud, setCompIcesiStud] = useState("F");
  const [getCompEmail, setCompEmail] = useState("");
  const [getCompTelephone, setCompTelephone] = useState("");
  //Create data
  const [values, setValues] = React.useState([]);

  /**
   * ----------------------------------------------------------
   * --------------------------Functions-----------------------
   * ----------------------------------------------------------
   */

  /**
   * Constructor of the company
   * @param {*} compName  Name of the company
   * @param {*} compNit Nit of the company
   * @param {*} compCity  City where the company is
   * @param {*} compAddress Address where the company is
   * @param {*} compEcoActiv  Economy activity where the company is
   * @param {*} compUrlAddress Url Address of the company
   * @param {*} compType Type of company
   * @param {*} compIcesiStud Verify if the company recuitred colleged students
   */
  // GET request using axios inside useEffect React hook
  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCompCountry.name));
    }
  }, [getCompCountry]);

  /**
   * Send information of the front-end until back-end
   * @param {*} e event of the button
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const company = {
      compAddress: getCompAddress,
      compEcoActiv: getCompEcoActiv,
      compIcesiStud: getCompIcesiStud,
      compEmail: getCompEmail,
      compName: getCompName,
      compNit: getCompNit,
      compTelephone: getCompTelephone,
      compType: getCompType,
      compUrlAddress: getCompUrlAddress,
      compCountry: getCompCountry.name,
      compCity: getCompCity,
    };
    console.log(company);

    dispatch(addCompany(company));

    /*
    axios({
        method: "POST",
        URL: "companies/add",
        data: {
          compAddress: getCompAddress,
          compEcoActiv: getCompEcoActiv,
          compIcesiStud: getCompIcesiStud,
          compName: getCompName,
          compNit: getCompNit,
          compType: getCompType,
          compUrlAddress: getCompUrlAddress,
          compCity: getCompCity
        }
      }).then(res => console.log(res.data)).catch(error => console.log(error))
    */
  };

  /**
   * -----------------------------------------------------
   * ---------------Return of the component --------------
   * -----------------------------------------------------
   */
  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Empresa"
          variant="outlined"
          required
          value={getCompName}
          onChange={(e) => setCompName(e.target.value)}
        />
        <TextField
          label="NIT"
          variant="outlined"
          required
          value={getCompNit}
          onChange={(e) => setCompNit(e.target.value)}
        />
        <TextField
          label="Dirección de la Empresa"
          variant="outlined"
          required
          value={getCompAddress}
          onChange={(e) => setCompAddress(e.target.value)}
        />

        <TextField
          label="Actividad Económica"
          variant="outlined"
          required
          value={getCompEcoActiv}
          onChange={(e) => setCompEcoActiv(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          required
          value={getCompEmail}
          onChange={(e) => setCompEmail(e.target.value)}
        />

        <TextField
          label="Tipo de Empresa"
          variant="outlined"
          required
          value={getCompType}
          onChange={(e) => setCompType(e.target.value)}
        />

        <TextField
          label="Número telefonico"
          variant="outlined"
          required
          value={getCompTelephone}
          onChange={(e) => setCompTelephone(e.target.value)}
        />
        <TextField
          label="Dirección URL de pagina Web"
          variant="outlined"
          required
          value={getCompUrlAddress}
          onChange={(e) => setCompUrlAddress(e.target.value)}
        />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          /**
           * List of cities
           */
          options={listCountries}
          /**
           * This property allows to show in the user's view the property that we want to take from the object.
           * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
           */
          getOptionLabel={(option) => option.name + ", " + option.capital}
          /**
           * Allows send the select object to variable CompCity that correspond the element select
           */
          onChange={(event, value) => setCompCountry(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione su país"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              //={(e,value) => setCompCity()}
            />
          )}
        />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          /**
           * List of cities
           */
          options={listCities}
          /**
           * This property allows to show in the user's view the property that we want to take from the object.
           * Such as: If we need show the name of the city then we ask the property of the object that correspond the name
           */
          getOptionLabel={(option) => option}
          /**
           * Allows send the select object to variable CompCity that correspond the element select
           */
          onChange={(event, value) => setCompCity(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione la ciudad"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(e) => setCompCity(e.target.value)}
              //={(e,value) => setCompCity()}
            />
          )}
        />
        <FormControl required="true">
          <FormLabel id="demo-row-radio-buttons-group-label">
            {" "}
            ¿La empresa ha vinculado estudiantes en práctica de Icesi?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="T"
              control={<Radio required="true" />}
              label="Si"
              onChange={(e) => setCompIcesiStud(e.target.value)}
            />
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="No"
              onChange={(e) => setCompIcesiStud(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Guardar información.
          </Button>
        </div>
      </form>
    </>
    // Get request.
  );
};

export default RegistrationBasicCompanyData;
