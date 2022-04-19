import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import RequestIcon from "@mui/icons-material/PostAdd";

import ReportIcon from "@mui/icons-material/Assessment";
import Stack from "@mui/material/Stack";
import { lightBlue } from "@mui/material/colors";
import { purple } from "@mui/material/colors";

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

const CardsCoordinators = () => {
  return (
    <Stack direction="row" spacing={10} justifyContent="center">
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
          <RequestIcon color="primary" />
        </IconWrapperStyle>
        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.72, color: "#072079" }}
        >
          Modulo
        </Typography>

        <Typography variant="h5" sx={{ color: "#072079" }}>
          Practicantes
        </Typography>
      </Card>

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
      </Card>
    </Stack>
  );
};

export default CardsCoordinators;
