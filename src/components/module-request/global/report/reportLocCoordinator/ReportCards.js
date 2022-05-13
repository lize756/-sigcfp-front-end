import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Typography, Grid, Card } from "@mui/material";

import { lightBlue } from "@mui/material/colors";
import { purple } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

import ContactsIcon from "@mui/icons-material/Contacts";
import RequestIcon from "@mui/icons-material/Feed";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

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

const ReportCards = () => {
  return (
    <div>
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
              bgcolor: lightBlue[50],
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
              <ContactsIcon color="primary" />
            </IconWrapperStyle>
            <Typography
              variant="subtitle1"
              sx={{ opacity: 0.72, color: "#072079" }}
            >
              Información de
            </Typography>

            <Typography variant="h5" sx={{ color: "#072079" }}>
              Contacto de las Empresas
            </Typography>
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
              bgcolor: pink[50],
            }}
          >
            <IconWrapperStyle
              sx={{
                color: (theme) => theme.palette["error"].dark,
                backgroundImage: (theme) =>
                  `linear-gradient(135deg, ${alpha(
                    theme.palette["error"].dark,
                    0
                  )} 0%, ${alpha(theme.palette["error"].dark, 0.24)} 100%)`,
              }}
            >
              <RequestIcon color="error" />
            </IconWrapperStyle>

            <Typography
              variant="subtitle1"
              sx={{ opacity: 0.72, color: "#ab003c" }}
            >
              Todas las
            </Typography>

            <Typography variant="h5" sx={{ color: "#ab003c", opacity: 1 }}>
              Solicitudes de Practicantes
            </Typography>
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
              bgcolor: purple[50],
            }}
          >
            <IconWrapperStyle
              sx={{
                color: (theme) => theme.palette["secondary"].dark,
                backgroundImage: (theme) =>
                  `linear-gradient(135deg, ${alpha(
                    theme.palette["secondary"].dark,
                    0
                  )} 0%, ${alpha(theme.palette["secondary"].dark, 0.24)} 100%)`,
              }}
            >
              <FolderSpecialIcon color="secondary" />
            </IconWrapperStyle>

            <Typography
              variant="subtitle1"
              sx={{ opacity: 0.72, color: "#072079" }}
            >
              Solicitudes
            </Typography>

            <Typography variant="h5" sx={{ color: "#072079", opacity: 1 }}>
              Relacionadas por Carreras
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportCards;
