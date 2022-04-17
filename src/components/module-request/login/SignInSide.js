import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import banner_cedep from "../../../assets/img_login.png";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { sendToken } from "../../../components/store/slices/SignIn/LoginSlice";
import { LoadingLogin} from "./LoadingLogin";

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

const theme = createTheme();

export default function SignInSide() {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  // This element allow change between the original component of login to the circular progress
  const [isChangeViewLoading, setIsChangeViewLoading] = React.useState(false);

  // Allow navigate between roots
  let navigate = useNavigate();

  /***
   * Handle Submit
   * Get the form data.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsChangeViewLoading(true);
    const data = new FormData(event.currentTarget);
    //UserToLogin
    const user = {
      userName: data.get("userName"),
      userPassword: data.get("userPassword"),
    };
    dispatch(sendToken(user));
  };

  function viewLogin() {
    return (
      <>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Dirección de correo electrónico"
          name="userName"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="userPassword"
          label="Contraseña"
          type="password"
          id="userPassword"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </Button>
      </>
    );
  }

  function viewLoading() {
    return (
      <Box sx={{ display: "flex" }} alignItems="center" justifyContent="center">
        <CircularProgress
          size={"100px"}
          sx={{ marginTop: "10%", marginBottom: "10%" }}
        />
      </Box>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(" + banner_cedep + ")",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ borderRadius: "0%" }}
          >
            <Box
              sx={{
                my: 20,
                mx: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "Blue" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ m: 2 }}>
                Iniciar sesión
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {/**isChangeViewLoading ? viewLoading() : viewLogin()*/}
                {isChangeViewLoading ? <LoadingLogin /> : viewLogin()}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {"¿Olvidó su contraseña?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signIn/typeRegister" variant="body2">
                      {"¿No tienes una cuenta?  Cree una."}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
