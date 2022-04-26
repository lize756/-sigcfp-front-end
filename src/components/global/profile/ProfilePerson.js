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
  Container,
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
  const [getPersGenre,setPersGenre] = useState("");
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
      <Container maxWidth="lg" sx={{ m: 4 }}>
        <Paper sx={{ mt: 2 }}>
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
              <BadgeIcon sx={{ width: 40, height: 40 }} />
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

        <Paper sx={{ mt: 3 }}>
          <Box md={6}>
            <Stack spacing={3} sx={{ m: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ mt: 4 }}
              >
                <TextField
                  sx={{ width: "95%" }}
                  label="Nombres"
                  name="persFirstName"
                  defaultValue={person.persFirstName}
                  variant="standard"
                  onChange={handleChange}
                />

                <TextField
                  label="Apellidos"
                  sx={{ width: "95%" }}
                  name="persLastName"
                  defaultValue={person.persLastName}
                  variant="standard"
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <TextField
                  sx={{ width: "95%" }}
                  label="Documento de identidad"
                  name="persDocument"
                  defaultValue={person.persDocument}
                  variant="standard"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "95%" }}
                  type="email"
                  label="Correo electrónico"
                  name="persEmail"
                  defaultValue={person.persEmail}
                  variant="standard"
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <TextField
                  sx={{ width: "95%" }}
                  label="Dirección"
                  name="persAddress"
                  defaultValue={person.persAddress}
                  variant="standard"
                  onChange={handleChange}
                />

                <TextField
                  sx={{ width: "95%" }}
                  label="Generó"
                  name="persGenre"
                  defaultValue={person.persGenre}
                  variant="standard"
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                sx={{ width: "95%" }}
                label="Documento de identidad"
                name="persDocument"
                defaultValue={person.persDocument}
                variant="standard"
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "95%" }}
                type="email"
                label="Correo electrónico"
                name="persEmail"
                defaultValue={person.persEmail}
                variant="standard"
                onChange={handleChange}
              />
              <Autocomplete
                sx={{ width: "95%" }}
                id="combo-box-persGenre"
                disablePortal
                defaultValue={person.persGenre}
                options={listGender}
                onChange={(event, value) => setPersGenre(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Género" variant="standard" />
                )}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Autocomplete
                sx={{ width: "95%" }}
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
              <Autocomplete
                sx={{ width: "95%" }}
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
              <TextField
                sx={{ width: "95%" }}
                label="Dirección"
                name="persAddress"
                defaultValue={person.persAddress}
                variant="standard"
                onChange={handleChange}
              />
            </Stack>
          </Box>
          <Box>
            <Button
              sx={{ mb: 4, ml: 4 }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={(e) => {
                savePassword(e);
              }}
            >
              Guardar
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ProfilePerson;
