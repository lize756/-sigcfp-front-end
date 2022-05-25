import React from "react";

import { Typography, Paper, Card, Grid, CardActionArea } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import GraduatedIcon from "@mui/icons-material/School";
import ReportIcon from "@mui/icons-material/Assessment";
import { lightBlue } from "@mui/material/colors";
import { purple } from "@mui/material/colors";

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

/**
 * Main class of Talents A1
 * @returns
 */
const ContentsTalents = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Paper sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ opacity: 1, color: "#072079", textAlign: "center" }}
        >
          ¡BIENVENIDOS/AS!
        </Typography>

        <Grid
          container
          spacing={5}
          p={4}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs="auto">
            <Card
              sx={{
                width: 210,
                height: 220,
                textAlign: "center",
                py: 5,
                boxShadow: 2,
                bgcolor: lightBlue[50],
              }}
            >
              <CardActionArea
                onClick={() => {
                  navigate("/promotion/request");
                }}
              >
                <IconWrapperStyle
                  sx={{
                    color: (theme) => theme.palette["primary"].dark,
                    backgroundImage: (theme) =>
                      `linear-gradient(135deg, ${alpha(
                        theme.palette["primary"].dark,
                        0
                      )} 0%, ${alpha(
                        theme.palette["primary"].dark,
                        0.24
                      )} 100%)`,
                  }}
                >
                  <GraduatedIcon color="primary" />
                </IconWrapperStyle>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.72, color: "#072079" }}
                >
                  Modulo
                </Typography>

                <Typography variant="h5" sx={{ color: "#072079" }}>
                  Egresados
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs="auto">
            <Card
              sx={{
                width: 210,
                height: 220,
                textAlign: "center",
                py: 5,
                boxShadow: 2,
                bgcolor: purple[50],
              }}
            >
              <CardActionArea
                onClick={() => {
                  navigate("/promotion/report");
                }}
              >
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
                  <ReportIcon color="secondary" />
                </IconWrapperStyle>

                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.72, color: "#072079" }}
                >
                  Modulo
                </Typography>

                <Typography variant="h5" sx={{ color: "#072079", opacity: 1 }}>
                  Reportes
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContentsTalents;
