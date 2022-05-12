import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAccordinRegisterPanelValue } from "../../../store/slices/CompanySlice";
import { registerUser } from "../../../store/slices/UserrSlice";

const validationSchema = yup.object({
  userEmail: yup
    .string("Ingresa el correo electrónico del usuario")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),

  userEmailR: yup.string().when("userEmail", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("userEmail")], "Los correos electrónicos no coinciden"),
  }),

  userPassword: yup.string().required("Campo requerido"),

  userPasswordR: yup.string().when("userPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("userPassword")], "Las contraseñas no coinciden"),
  }),
});

const RegistrationUserCompany = () => {
  /**
   * ---------------------------------------------------------
   * -------------------------REDUX-----------------------
   * ---------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  const companyStore = useSelector((state) => state.CompanySlice.company);
  const [getCompany, setCompany] = useState({});
  const [getEmail, setEmail] = useState("");

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

  useEffect(() => {
    setCompany(companyStore);
    setEmail(companyStore.compEmail);
  }, [companyStore]);

  // Use to styles of the view
  const classes = useStyles();
  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a register
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
    userEmail: " ",
    userEmailR: "",
    userPassword: "",
    userPasswordR: "",
  });

  /*
   * ***************************************************
   * **********************Function*********************
   * ***************************************************
  /**
   * This function assigns the information completed by the user with its respective attribute.
   * attributes like: persName, persDocument, persEmail, persPhone,persPassword and persRPassword
   * @param {*} e
   */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * This method allow print to console the result of the form
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      userName: data.userEmail,
      userPassword: data.userPassword,
      company: getCompany,
      isEnable: true,
      rolee: {
        roleId: 5,
      },
    };
    dispatch(registerUser(user));
    dispatch(setAccordinRegisterPanelValue("panel3"));
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#F2F6FE" }} />
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              defaultValue={getCompany.compEmail}
              label="Correo electrónico de inicio de sesión"
              variant="outlined"
              required
              type="email"
              name="userEmail"
              onChange={handleChange}
            />
            <TextField
              label="Repetir correo electrónico"
              variant="outlined"
              type="email"
              name="userEmailR"
              required
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              name="userPassword"
              label="Contraseña"
              type="password"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="userPasswordR"
              label="Confirmar contraseña"
              type="password"
              onChange={handleChange}
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

export default RegistrationUserCompany;
