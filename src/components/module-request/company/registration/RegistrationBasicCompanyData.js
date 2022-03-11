import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { InputLabel, Select, MenuItem } from "@mui/material";
import axios from "../../../../config/axios";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

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
  },
}));
const RegistrationBasicCompanyData = () => {
  const classes = useStyles();
  // create state variables for each input
  const [compName, setCompName] = useState("");
  const [compNit, setCompNit] = useState("");
  const [compAddress, setCompAddress] = useState("");
  const [compCity, setCompCity] = useState("");
  const [compEcoActiv, setCompEcoActiv] = useState("");
  const [compType, setCompType] = useState("");
  const [compUrlAddress, setCompUrlAddress] = useState("");
  const [compIcesiStud, setCompIcesiStud] = useState("F");

  function Company(compName, compNit, compCity, compAddress,compEcoActiv,compUrlAddress,compType,compIcesiStud) { 
    this.compAddress = compAddress;
    this.compName = compName;
    this.compNit = compNit;
    this.compEcoActiv = compEcoActiv;
    this.compUrlAddress = compUrlAddress;
    this.compCity = compCity; 
    this.compType = compType;
    this.compIcesiStud = compIcesiStud;
    this.compIcesiStud = compIcesiStud;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
     console.log(compName,
      compNit,
      compAddress,
      compCity,
      compEcoActiv,
      compUrlAddress,
      compType,
      compIcesiStud
    );
    */
    let company = new Company(compName, compNit, compCity, compAddress,compEcoActiv,compUrlAddress,compType,compIcesiStud);
      
    axios.post("companies/add/",company).then(response =>{
      if(response.data != null){
        this.setState(this.initialState)
        console.log(company)
      }
    })

  };
  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Empresa"
          variant="outlined"
          required
          value={compName}
          onChange={(e) => setCompName(e.target.value)}
        />
        <TextField
          label="NIT"
          variant="outlined"
          required
          value={compNit}
          onChange={(e) => setCompNit(e.target.value)}
        />
        <TextField
          label="Dirección de la Empresa"
          variant="outlined"
          required
          value={compAddress}
          onChange={(e) => setCompAddress(e.target.value)}
        />

        <TextField
          label="Ciudad"
          variant="outlined"
          required
          value={compCity}
          onChange={(e) => setCompCity(e.target.value)}
        />

        <TextField
          label="Actividad Económica"
          variant="outlined"
          required
          value={compEcoActiv}
          onChange={(e) => setCompEcoActiv(e.target.value)}
        />

        <TextField
          label="Tipo de Empresa"
          variant="outlined"
          required
          value={compType}
          onChange={(e) => setCompType(e.target.value)}
        />
        <TextField
          label="Dirección URL de pagina Web"
          variant="outlined"
          required
          value={compUrlAddress}
          onChange={(e) => setCompUrlAddress(e.target.value)}
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
  );
};

export default RegistrationBasicCompanyData;
