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
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green } from "@mui/material/colors";
/**
 * REDUX
 */
 import { useDispatch, useSelector } from "react-redux";

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
  // Get person id of the store
  const personStore = useSelector((state) => state.PersonSlice.person);



  
  const [person, setPerson] = useState({
    persFirstName: personStore.persFirstName,
    persGenre: personStore.persGenre,
    persLastName: personStore.persLastName,
    persDocument: personStore.persDocument,
    persEmail: personStore.persEmail,
    persAddress: personStore.persAddress,
  });

  useEffect(()=>{
    console.log(personStore)
  },[])

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const savePerson = (e) => {
    e.preventDefault();

    const personData = {
      persFirstName: person.persFirstName,
      persLastName: person.persLastName,
      persDocument: person.persDocument,
      persEmail: person.persEmail,
      persGenre: person.persGenre,
      persAddress: person.persAddress,
    };
    
    const returnedTarget = Object.assign(personStore,personData);
    console.log(returnedTarget)
  };

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
          <Box>
            <Button
              sx={{ mb: 4, ml: 4 }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={(e) => {
                savePerson(e);
              }}
            >
              Guardar
            </Button>
          </Box>
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
        <Stack spacing={3} sx={{ m: 4 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <FormControl sx={{ width: "40ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña Actual
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
            <FormControl sx={{ m: 2, width: "40ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Nueva Contraseña
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
            <FormControl sx={{ m: 2, width: "40ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirmar Nueva Contraseña
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
          </Stack>
        </Stack>
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
    </div>
  );
};

export default ProfilePerson;
