import React, { useEffect, useState } from "react";
import {
  Paper,
  Stack,
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Input,
  InputAdornment,
  Grid,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import { MenuItem } from "@material-ui/core";

/**
 * REDUX
 */
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCitiesAssociatedToCountry,
} from "../../store/slices/CountrySlice";
import { updatePartiallyPerson } from "../../store/slices/PersonSlice";
const ProfilePerson = () => {
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

  // Get person id of the store
  const personStore = useSelector((state) => state.PersonSlice.person);
  //Correspond to list of gender that a person
  const listGender = ["MASCULINO", "FEMENINO", "OTRO"];

  const [person, setPerson] = useState({
    persFirstName: personStore.persFirstName,
    persGenre: personStore.persGenre,
    persLastName: personStore.persLastName,
    persDocument: personStore.persDocument,
    persEmail: personStore.persEmail,
    persAddress: personStore.persAddress,
    persCountryName: personStore.persCountryName,
    persCityName: personStore.persCityName,
  });

  /**
   * --------------------------------------------------
   * -------------------Functions ---------------------
   * --------------------------------------------------
   */
  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const savePerson = (e) => {
    e.preventDefault();

    const personData = {
      persId: personStore.persId,
      persFirstName: person.persFirstName,
      persLastName: person.persLastName,
      persDocument: person.persDocument,
      persEmail: person.persEmail,
      persGenre: getPersGenre === "" ? person.persGenre : getPersGenre,
      persAddress: person.persAddress,
      persCityName: getPersonCity === "" ? person.persCityName : getPersonCity,
      persCountryName:
        Object.keys(getPersonCountry).length === 0
          ? person.persCountryName
          : getPersonCountry.name,
    };
    //console.log(personData)
    dispatch(
      updatePartiallyPerson(ACCESS_TOKEN, personData.persId, personData)
    );
  };
  const [getPersonCountry, setPersonCountry] = useState({});
  const [getPersonCity, setPersonCity] = useState("");
  const [getPersGenre, setPersGenre] = useState("");
  //================================================= UseEffect ===================================================

  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getPersonCountry.name));
    }
  }, [getPersonCountry]);

  //=================================================Password State===================================================

  const [currentPassword, setCurrentPassword] = useState({
    password: "",
    showPassword: false,
  });

  const [newPassword, setNewPassword] = useState({
    password: "",
    showPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = useState({
    password: "",
    showPassword: false,
  });

  //===============================================Show Password HandleChanges=====================================

  const handleClickShowPassword = () => {
    setCurrentPassword({
      ...currentPassword,
      showPassword: !currentPassword.showPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setNewPassword({
      ...newPassword,
      showPassword: !newPassword.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPassword({
      ...confirmPassword,
      showPassword: !confirmPassword.showPassword,
    });
  };

  //===============================================Password HandleChanges=====================================
  const handleCurrentPassword = (e) => {
    setCurrentPassword({
      ...currentPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewPassword = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword({
      ...confirmPassword,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = (e) => {
    e.preventDefault();

    const passwords = {
      newPasswords: newPassword.password,
      confirmPasswords: confirmPassword.password,
    };
  };

  return (
    <div>
      <Paper sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{
              mt: 2,
              ml: 7,
              mb: 2,
              bgcolor: green[500],
              width: 65,
              height: 65,
            }}
          >
            <BadgeIcon />
          </Avatar>

          <Box md={6}>
            <Typography
              mt={2}
              ml={2}
              variant="h6"
              sx={{ fontWeight: "medium", color: "#072079" }}
            >
              {person.persFirstName + " " + person.persLastName}
            </Typography>
            <Typography
              ml={2}
              mb={2}
              variant="subtitle2"
              sx={{ color: "#072079" }}
            >
              Editar Perfil
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Grid container spacing={3} mt={2} mx={1}>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "85%" }}
              label="Nombres"
              name="persFirstName"
              defaultValue={person.persFirstName}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>{" "}
          <Grid item xs={6}>
            <TextField
              label="Apellidos"
              sx={{ width: "85%" }}
              name="persLastName"
              defaultValue={person.persLastName}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "85%" }}
              label="Documento de identidad"
              name="persDocument"
              defaultValue={person.persDocument}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "85%" }}
              type="email"
              label="Correo electrónico"
              name="persEmail"
              defaultValue={person.persEmail}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              sx={{ width: "85%" }}
              id="combo-box-persGenre"
              disablePortal
              defaultValue={person.persGenre}
              options={listGender}
              onChange={(event, value) => setPersGenre(value)}
              renderInput={(params) => (
                <TextField {...params} label="Género" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              sx={{ width: "85%" }}
              freeSolo
              disableClearable
              id="free-solo-2-demo"
              defaultValue={{ name: personStore.persCountryName }}
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
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              sx={{ width: "85%" }}
              freeSolo
              disableClearable
              id="free-solo-2-demo"
              //List of cities
              options={listCities}
              defaultValue={personStore.persCityName}
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
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={(e) => setPersonCity(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "85%" }}
              label="Dirección"
              name="persAddress"
              defaultValue={person.persAddress}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box>
          <Button
            sx={{ my: 4, ml: 4 }}
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={(e) => {
              savePerson(e);
            }}
          >
            Guardar
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Typography
          mt={2}
          ml={2}
          variant="h6"
          sx={{ fontWeight: "medium", color: "#072079" }}
        >
          Cambiar contraseña
        </Typography>

        <Grid container spacing={3} mt={2} ml={1.5}>
          <Grid item xs={4}>
            <FormControl sx={{ m: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña actual
              </InputLabel>
              <Input
                type={currentPassword.showPassword ? "text" : "password"}
                value={currentPassword.password}
                name="password"
                onChange={handleCurrentPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {currentPassword.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ m: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Nueva contraseña
              </InputLabel>
              <Input
                type={newPassword.showPassword ? "text" : "password"}
                value={newPassword.password}
                name="password"
                onChange={handleNewPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                    >
                      {newPassword.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ m: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <Input
                type={confirmPassword.showPassword ? "text" : "password"}
                value={confirmPassword.password}
                name="password"
                onChange={handleConfirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {confirmPassword.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box>
          <Button
            sx={{ my: 4, ml: 4 }}
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={(e) => {
              savePassword(e);
            }}
          >
            Cambiar contraseña
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default ProfilePerson;
