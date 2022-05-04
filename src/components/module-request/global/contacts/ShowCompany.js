import React, { useState } from "react";
import { Paper, Stack, Box, Typography, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";

const ShowCompany = () => {
  const [company, setCompany] = useState({
    compName: "Rempel, Hackett and Macejkovic",
    compNit: "3566461110394479",
    compAddress: "2328 Cascade Pass",
    city: "Cali",
    compEmail: "dbitterton0@accuweather.com",
    compTelephone: "549-176-8430",
    compIcesiStud: "X",
    compEcoActiv: "Capital Goods",
    compType:
      "praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut",
    compUrlAddress:
      "https://sfgate.com/aliquam/convallis/nunc/proin/at/turpis.html",
  });
  return (
    <div>
      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Grid container spacing={2} mt={2} mx={1}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              {" "}
              <AccountCircleIcon
                sx={{ width: 65, height: 65, ml: 5, mt: 1, color: "#072079" }}
              />
              <Box>
                <Typography
                  mt={2}
                  variant="h4"
                  component="h5"
                  sx={{ fontWeight: "medium", color: "#072079" }}
                >
                  {company.compName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "medium", color: "#072079" }}
                >
                  {company.compNit}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Grid container spacing={2} mt={2} mx={1}>
          <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
              <EmailIcon color="warning" sx={{ width: 45, height: 45 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Email
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {company.compEmail}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
              <LocalPhoneIcon color="warning" sx={{ width: 45, height: 45 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Teléfono
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {company.compTelephone}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
              <FmdGoodIcon color="success" sx={{ width: 45, height: 45 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Dirección
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {company.compAddress}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
              <LocationCityIcon
                color="success"
                sx={{ width: 45, height: 45 }}
              />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Ciudad
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {company.city}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
              <MoneyIcon color="warning" sx={{ width: 45, height: 45 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Actividad económica
                </Typography>

                <Typography
                  variant="body1"
                  mr={1}
                  sx={{ fontWeight: "medium" }}
                >
                  {company.compEcoActiv}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={5}>
            <Stack direction="row" spacing={2}>
              <BusinessIcon color="warning" sx={{ width: 45, height: 45 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  Tipo de empresa
                </Typography>

                <Typography
                  variant="body1"
                  mr={1}
                  sx={{ fontWeight: "medium" }}
                >
                  {company.compType}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <SchoolIcon sx={{ color: "#072079", width: 45, height: 45 }} />

              <Typography
                variant="body1"
                mt={2}
                sx={{ fontWeight: "medium", color: "#072079" }}
              >
                {company.compIcesiStud === "X"
                  ? "LA EMPRESA HA SOLICITADO PRACTICANTES DE LA UNIVERSIDAD ICESI"
                  : "LA EMPRESA NO HA SOLICITADO PRACTICANTES DE LA UNIVERSIDAD ICESI"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ShowCompany;
