import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router";
/**
 * Import to redux
 */
import { useDispatch } from "react-redux";
import { setPerson, addPerson} from "../../../store/slices/coordinator/PersonSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CoordBasicRegister = () => {
  const classes = useStyles();
  // Allow navigate between roots
  let navigate = useNavigate();
  // Allow to send the elements of store
  const dispatch = useDispatch();
 /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a register
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
    persFirstName: " ",
    persLastName: "",
    persEmail: "",
    persEmailR:"",
    persDocument: "",
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

  //On Action of the button
  const submit = (e) => {
    e.preventDefault();
    //Correspond to information of the promotion coodinator
    const promotionCoordinator = {
      persFirstName: data.persFirstName,
      persLastName: data.persLastName,
      persDocument: data.persDocument,
      persEmail: data.persEmail,
    };
    
    dispatch(setPerson(promotionCoordinator));
    navigate("/coordinator/register/user_register");
  };

 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="persFirstName"
                variant="outlined"
                required
                fullWidth
                label="Nombres"
                autoFocus
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Apellidos"
                name="persLastName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Correo electrónico"
                name="persEmail"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirmar correo electrónico"
                name="persEmailR"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Cédula"
                name="persDocument"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Siguiente
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default CoordBasicRegister;
