import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

/**
 * Import to redux
 */
import { useDispatch, useSelector } from "react-redux";
import { addperson, setPerson } from "../../store/slices/PersonSlice";
import {
  getCountries,
  getCitiesAssociatedToCountry,
} from "../../store/slices/CountrySlice";

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
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  //Correspond of list of countries saved in the store.
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  //Correspond of list of cities saved in the store.
  const listCities = useSelector((state) => state.CountrySlice.listCities);

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a register
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
    persFirstName: "",
    persLastName: "",
    persGenre: "",
    persDocument: "",
    persEmail: "",
    persAddress: "",
  });

  const [getPersonCountry, setPersonCountry] = useState({});
  const [getPersonCity, setPersonCity] = useState("");
  //Correspond to list of gender that a person
  const listGender = ["MASCULINO", "FEMENINO", "OTRO"];

  //================================================= UseEffect ===================================================

  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getPersonCountry.name));
    }
  }, [getPersonCountry]);

  //=================================================Functions===================================================

  /*
   * ***************************************************
   * **********************Functions*********************
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
    const persontoAdd = {
      persFirstName: data.persFirstName,
      persLastName: data.persLastName,
      persGenre: data.persGenre,
      persDocument: data.persDocument,
      persEmail: data.persEmail,
      persAddress: data.persAddress,
      persCountryName: getPersonCountry.name,
      persCityName: getPersonCity,
    };
    console.log(persontoAdd)
    dispatch(addperson(persontoAdd))
    navigate("/cedep/register/user_register");
  };

  return (
    <Container component="main" maxWidth="sm">
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Cédula"
                name="persDocument"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                  value={data.persGenre}
                  label="Género"
                  name="persGenre"
                  onChange={handleChange}
                >
                  {listGender.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                label="Correo electrónico"
                name="persEmail"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                onChange={(event, value) => setPersonCountry(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su país"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                onChange={(event, value) => setPersonCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setPersonCity(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Dirección"
                name="persAddress"
                onChange={handleChange}
                helperText="Dirección: Calle Da Vinci # 7 - 41092"
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
