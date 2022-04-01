import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "../../../../config/axios";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setPerson,
  fetchAllPerson,
  postPerson,
} from "../../../store/slices/coordinator/PersonSlice";

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

const CoordinatorRegisterRedux = () => {
  const classes = useStyles();
  //const person = useSelector((state) => state.personRegister).person;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPerson());
  }, []);

  /**
   * This function assigns the information completed by the user with its respective attribute.
   * attributes like: persName, persDocument, persEmail, persPhone,persPassword and persRPassword
   * @param {*} e
   */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a register
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
    persFirstName: " ",
    persLastName: "",
    persDocument: "",
    persEmail: "",
    persPassword: "",
    persRPassword: "",
  });

  /**
   * This function is responsible for relaying the information of the promotion coordinator with the
   * model through the use of axios
   * @param {*} e represents an event
   */
  const addRequest = (e) => {
    e.preventDefault();
    //Correspond to information of the promotion coodinator
    dispatch(
      setPerson({
        persFirstName: data.persFirstName,
        persLastName: data.persLastName,
        persDocument: data.persDocument,      
        
      })
    );
  };

  const p = useSelector(state => state.personRegister).person;
  function sayHello() {

    dispatch(
      setPerson({
        ...p,
        persGenre: "Entre",
        persAddress: "entre",
      })
    );
  }
console.log("entre",p)
return (
    <form className={classes.root} onSubmit={addRequest}>
      <TextField
        label="Nombres"
        name="persFirstName"
        variant="outlined"
        required
        onChange={handleChange}
      />
      <TextField
        label="Apellidos"
        name="persLastName"
        variant="outlined"
        required
        onChange={handleChange}
      />
      <TextField
        label="Cédula"
        name="persDocument"
        variant="outlined"
        required
        onChange={handleChange}
      />
      <TextField
        label="Correo electrónico"
        variant="outlined"
        name="persEmail"
        required
        onChange={handleChange}
      />
      <TextField
        label="Nombre de usuario"
        variant="outlined"
        name="userUserName"
        required
        onChange={handleChange}
      />
      <TextField
        label="Constraseña"
        variant="outlined"
        type="user_password"
        required
        onChange={handleChange}
      />
      <TextField
        label="Confirmar Contraseña"
        variant="outlined"
        type="user_password"
        required
        onChange={handleChange}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Guardar información.
        </Button>
        <button onClick={sayHello}>Default</button>;
      </div>
    </form>
  );
};

export default CoordinatorRegisterRedux;
