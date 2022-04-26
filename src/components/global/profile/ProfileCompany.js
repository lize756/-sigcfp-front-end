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
import Autocomplete from "@mui/material/Autocomplete";

/**
 * REDUX
 */
import { useDispatch, useSelector } from "react-redux";
import {updateCompany } from "../../store/slices/CompanySlice";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../store/slices/CountrySlice";

const ProfileCompany = () => {
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
  const companyStore = useSelector((state) => state.CompanySlice.company);

  const [company, setCompany] = useState({
    compId: companyStore.compId,
    compAddress: companyStore.compAddress,
    compEcoActiv: companyStore.compEcoActiv,
    compEmail: companyStore.compEmail,
    compIcesiStud: companyStore.compIcesiStud,
    compName: companyStore.compName,
    compNit: companyStore.compNit,
    compTelephone: companyStore.compTelephone,
    compType: companyStore.compType,
    compUrlAddress: companyStore.compAddress,
    compCityName: companyStore.compCityName,
    compCountryName: companyStore.compCountryName,
  });
  const [getCompCountry, setCompCountry] = useState({});
  const [getCompCity, setCompCity] = useState("");

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

  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCompCountry.name));
    }
  }, [getCompCountry]);

  /**
   * --------------------------------
   * ---------Function---------------
   * --------------------------------
   */
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

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

  const saveProfile = (e) => {
    e.preventDefault();
    const profile = {
      compId: company.compId,
      compAddress: company.compAddress,
      compEcoActiv: company.compEcoActiv,
      compEmail: company.compEmail,
      compName: company.compName,
      compNit: company.compNit,
      compTelephone: company.compTelephone,
      compType: company.compType,
      compUrlAddress: company.compAddress,
      compCityName: (getCompCity === "" ? company.compCityName : getCompCity),
      compCountryName: (Object.keys(getCompCountry).length === 0?  company.compCountryName : getCompCountry.name)
    };
    //Update company profile
    dispatch(updateCompany(ACCESS_TOKEN, profile.compId, profile));
  };
  return (
    <div>
      <Paper sx={{ mt: 2, ml: 5, mr: 5, bgcolor: "#F2F6FE" }}>
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
              {company.compName}
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

      <Paper container sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Box md={6}>
          <Stack spacing={3} sx={{ m: 4 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ mt: 4 }}
            >
              <TextField
                sx={{ width: "95%" }}
                label="Nombre compañÍa"
                name="compName"
                defaultValue={company.compName}
                variant="standard"
                onChange={handleChange}
              />

              <TextField
                label="Nit de la  compañÍa"
                sx={{ width: "95%" }}
                name="compNit"
                defaultValue={company.compNit}
                variant="standard"
                onChange={handleChange}
              />

              <TextField
                sx={{ width: "95%" }}
                type="email"
                label="Correo electrónico"
                name="compEmail"
                defaultValue={company.compEmail}
                variant="standard"
                onChange={handleChange}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                sx={{ width: "95%" }}
                label="Dirección"
                name="compAddress"
                defaultValue={company.compAddress}
                variant="standard"
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "95%" }}
                type="tel"
                label="Teléfono"
                name="compTelephone"
                defaultValue={company.compTelephone}
                variant="standard"
                onChange={handleChange}
              />
              <Autocomplete
                sx={{ width: "95%" }}
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                defaultValue={{ name: company.compCountryName }}
                // List of countries
                options={listCountries}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setCompCountry(value)}
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
                defaultValue={company.compCityName}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option}
                /**
                 * Allows send the select object to variable CompCity that correspond the element select
                 */
                onChange={(event, value) => setCompCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setCompCity(e.target.value)}
                  />
                )}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                sx={{ width: "95%" }}
                label="Actividad económica de la compañía"
                multiline
                rows={2}
                name="compEcoActiv"
                defaultValue={company.compEcoActiv}
                variant="standard"
                onChange={handleChange}
              />

              <TextField
                sx={{ width: "95%" }}
                type="tel"
                label="Tipo de compañía"
                multiline
                rows={2}
                name="compType"
                defaultValue={company.compType}
                variant="standard"
                onChange={handleChange}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                sx={{ width: "50%" }}
                label="Dirección URL"
                type="url"
                name="compUrlAddress"
                defaultValue={company.compUrlAddress}
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
                saveProfile(e);
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper container sx={{ mt: 3, ml: 5, mr: 5 }}>
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
                      onMouseDown={handleMouseDownPassword}
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
                      onMouseDown={handleMouseDownPassword}
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
                      onMouseDown={handleMouseDownPassword}
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

export default ProfileCompany;
