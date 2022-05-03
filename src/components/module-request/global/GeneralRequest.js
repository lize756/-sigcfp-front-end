import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Chip,
  ListItem,
  Button,
} from "@mui/material";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TimeIcon from "@mui/icons-material/AccessTimeFilled";
import SchoolIcon from "@mui/icons-material/School";
//redux
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const GeneralRequest = () => {
  //Redux
  const currentIntReq = useSelector((state) => state.InternRequestSlice.intReq);
  //Correspond to info that it have the current intern request.
  const request = {
    inteRequName: currentIntReq.inteRequName,
    companyName: currentIntReq.company.compName,
    contactName: "",
    inteRequNumber: currentIntReq.inteRequNumber,
    inteRequStDate: currentIntReq.inteRequStDate,
    inteRequDuration: currentIntReq.inteRequDuration,
    inteRequSalary: currentIntReq.inteRequSalary,
    inteRequDepartment: currentIntReq.inteRequDepartment,
    inteRequBondingType: currentIntReq.inteRequBondingType,
    inteRequFunctions: currentIntReq.inteRequFunctions,
    inteRequCompetencies: currentIntReq.inteRequCompetencies,
    inteRequOtherBenefits: currentIntReq.inteRequOtherBenefits,
    careers: currentIntReq.careers,
  };

  return (
    <>
      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          align="center"
          color="primary"
        >
          {request.inteRequName}
        </Typography>

        <Box sx={{ mx: 4, mt: 2 }}>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <HomeIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.companyName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <PersonIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.contactName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <MoneyIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequSalary}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <EventIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequStDate}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} mb={2}>
              <Stack direction="row" spacing={2}>
                <TimeIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequDuration}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} mb={2}>
              <Stack direction="row" spacing={2}>
                <SchoolIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequNumber === 1
                    ? request.inteRequNumber + " Estudiante"
                    : request.inteRequNumber + " Estudiantes"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          ml={1}
          color="primary"
        >
          Información General
        </Typography>

        <Box ml={3} mt={2}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Area o departamento de la solicitud:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
              ml: 2,
              mt: 1,
            }}
          >
            <Chip
              label={request.inteRequDepartment}
              color="error"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Carreras:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.careers.map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data.careId}>
                    <Chip
                      label={data.careName}
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Funciones principales:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.inteRequFunctions.split(",").map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data}>
                    <Chip label={data} color="success" variant="outlined" />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Competencias claves:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.inteRequCompetencies.split(",").map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data}>
                    <Chip label={data} color="warning" variant="outlined" />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          ml={1}
          mt={1}
          color="primary"
        >
          Información específica
        </Typography>
        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Tipo de vinculación:
          </Typography>
          <Typography
            variant="subtitle2"
            ml={2}
            mt={1}
            sx={{ fontWeight: "medium" }}
          >
            {request.inteRequBondingType}
          </Typography>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Otros beneficios:
          </Typography>
          <Typography
            variant="subtitle2"
            ml={2}
            mt={1}
            sx={{ fontWeight: "medium" }}
          >
            {request.inteRequOtherBenefits}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default GeneralRequest;
