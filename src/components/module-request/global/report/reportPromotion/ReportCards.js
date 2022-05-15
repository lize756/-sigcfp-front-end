import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Typography, Grid, Card, CardActionArea } from "@mui/material";

import { lightBlue } from "@mui/material/colors";
import { purple } from "@mui/material/colors";

import ContactsIcon from "@mui/icons-material/Contacts";
import RequestIcon from "@mui/icons-material/Feed";

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
  const reportOfContacts = (e) => {
    e.preventDefault();
    const report = {
      type: "PDF",
    };
    console.log("PRESIONE CONTACTOS");
  };

  const reportOfInternsRequests = (e) => {
    e.preventDefault();

    const report = {
      type: "PDF",
    };
    console.log("PRESIONE TODAS LAS SOLICITUDES");
  };

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
            <CardActionArea onClick={reportOfContacts}>
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
              bgcolor: purple[50],
            }}
          >
            <CardActionArea onClick={reportOfInternsRequests}>
              <IconWrapperStyle
                sx={{
                  color: (theme) => theme.palette["secondary"].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                      theme.palette["secondary"].dark,
                      0
                    )} 0%, ${alpha(
                      theme.palette["secondary"].dark,
                      0.24
                    )} 100%)`,
                }}
              >
                <RequestIcon color="secondary" />
              </IconWrapperStyle>

              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.72, color: "#072079" }}
              >
                Todas las
              </Typography>

              <Typography variant="h5" sx={{ color: "#072079", opacity: 1 }}>
                Solicitudes de Practicantes
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportCards;
