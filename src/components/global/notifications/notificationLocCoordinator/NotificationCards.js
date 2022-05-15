import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Typography, Grid, Card, CardActionArea } from "@mui/material";

import { teal } from "@mui/material/colors";
import { yellow } from "@mui/material/colors";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router";

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const NotificationCards = () => {
  let navigate = useNavigate();
  return (
    <div>
      {" "}
      <Grid
        container
        spacing={5}
        p={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs="auto">
          <Card
            sx={{
              width: 230,
              height: 240,
              textAlign: "center",
              py: 5,
              boxShadow: 2,
              bgcolor: teal[100],
            }}
          >
            <CardActionArea
              onClick={() => {
                navigate("/location/messageone");
              }}
            >
              <IconWrapperStyle
                sx={{
                  color: (theme) => theme.palette["primary"].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                      theme.palette["primary"].dark,
                      0
                    )} 0%, ${alpha(theme.palette["primary"].dark, 0.24)} 100%)`,
                }}
              >
                <PersonIcon color="primary" />
              </IconWrapperStyle>
              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.72, color: "#1a237e" }}
              >
                Enviar correo a
              </Typography>

              <Typography variant="h5" sx={{ color: "#1a237e" }}>
                Un Contacto Empresarial
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs="auto">
          <Card
            sx={{
              width: 230,
              height: 240,
              textAlign: "center",
              py: 5,
              boxShadow: 2,
              bgcolor: yellow[200],
            }}
          >
            <CardActionArea
              onClick={() => {
                navigate("/location/messagemany");
              }}
            >
              <IconWrapperStyle
                sx={{
                  color: (theme) => theme.palette["warning"].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                      theme.palette["warning"].dark,
                      0
                    )} 0%, ${alpha(theme.palette["warning"].dark, 0.24)} 100%)`,
                }}
              >
                <PeopleAltIcon color="warning" />
              </IconWrapperStyle>

              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.72, color: "#e65100" }}
              >
                Enviar correo a
              </Typography>

              <Typography
                variant="h5"
                sx={{ color: "#e65100", opacity: 1, px: 2 }}
              >
                Todos Los Contactos
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationCards;
