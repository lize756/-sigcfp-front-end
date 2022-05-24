import React from "react";

import {
  Typography,
  Paper,
  Card,
  Grid,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";

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

const ContentsGraduated = () => {
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
                    )} 0%, ${alpha(
                      theme.palette["secondary"].dark,
                      0.24
                    )} 100%)`,
                }}
              >
                <FeedIcon color="secondary" />
              </IconWrapperStyle>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.72, color: "#072079" }}
              >
                Hoja de
              </Typography>

              <Typography variant="h5" sx={{ color: "#072079" }}>
                Vida
              </Typography>

              <CardActions sx={{ mx: 6 }}>
                <IconButton aria-label="editar" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="eliminar" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContentsGraduated;
