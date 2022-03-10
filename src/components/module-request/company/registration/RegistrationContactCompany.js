import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const RegistrationContactCompany = () => {
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

  const classes = useStyles();
  const [contName, setContName] = useState("");
  const [contPosition, setContPosition] = useState("");
  const [contEmail, setContEmail] = useState("");
  const [contPhone, setContPhone] = useState("");

  
  /**
   * This method allow print to console the result of the form
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contName,contPosition,contEmail,contPhone);
  };


  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#F2F6FE"}} />
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              label="Nombre contacto directo"
              variant="outlined"
              required
              value={contName}
              onChange={(e) => setContName(e.target.value)}
            />
            <TextField
              label="Cargo"
              variant="outlined"
              required
              value={contPosition}
              onChange={(e) => setContPosition(e.target.value)}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              required
              value={contEmail}
              onChange={(e) => setContEmail(e.target.value)}
            />

            <TextField
              label="Teléfono - Ext-"
              variant="outlined"
              required
              value={contPhone}
              onChange={(e) => setContPhone(e.target.value)}
            />
            <div>
              <Button type="submit" variant="contained" color="primary">
                Guardar información.
              </Button>
            </div>
          </form>
        </Container>
      </React.Fragment>
    </>
  );
};

export default RegistrationContactCompany;
