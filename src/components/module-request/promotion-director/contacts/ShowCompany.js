import React, { useState } from "react";
import { Paper, Stack, Avatar, Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import { purple, red, orange, pink } from "@mui/material/colors";

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
      <Paper sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{
              mt: 2,
              ml: 7,
              mb: 2,
              bgcolor: "#072079",
              width: 65,
              height: 65,
            }}
          >
            {" "}
            <AccountCircleIcon sx={{ width: 65, height: 65 }} />
          </Avatar>
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
              mb={2}
              variant="subtitle2"
              sx={{ fontWeight: "medium", color: "#072079" }}
            >
              {company.compNit}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={3} sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <EmailIcon sx={{ color: red[200], width: 45, height: 45 }} />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: red[200] }}
              >
                Email
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: red[400] }}
              >
                {company.compEmail}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <LocalPhoneIcon sx={{ color: red[200], width: 45, height: 45 }} />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: red[200] }}
              >
                Teléfono
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: red[500] }}
              >
                {company.compTelephone}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <FmdGoodIcon sx={{ color: orange[300], width: 45, height: 45 }} />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: orange[300] }}
              >
                Dirección
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: orange[400] }}
              >
                {company.compAddress}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <LocationCityIcon
                sx={{ color: orange[300], width: 45, height: 45 }}
              />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: orange[300] }}
              >
                Ciudad
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: orange[500] }}
              >
                {company.city}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <MoneyIcon sx={{ color: pink[200], width: 45, height: 45 }} />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: pink[200] }}
              >
                Actividad económica
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: pink[400] }}
              >
                {company.compEcoActiv}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                ml: 8,
                mt: 1,
                mb: 1,
                bgcolor: "#FFFFFF",
                width: 45,
                height: 45,
              }}
            >
              <BusinessIcon sx={{ color: pink[200], width: 45, height: 45 }} />
            </Avatar>
            <Box>
              <Typography
                mt={1}
                variant="subtitle2"
                sx={{ fontWeight: "medium", color: pink[200] }}
              >
                Tipo de empresa
              </Typography>

              <Typography
                variant="body1"
                mb={1}
                sx={{ fontWeight: "medium", color: pink[400] }}
              >
                {company.compType}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      <Paper sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{
              ml: 8,
              mt: 1,
              mb: 1,
              bgcolor: "#FFFFFF",
              width: 45,
              height: 45,
            }}
          >
            <SchoolIcon sx={{ color: "#072079", width: 45, height: 45 }} />
          </Avatar>
          <Typography
            mt={2}
            variant="body1"
            sx={{ fontWeight: "medium", color: "#072079" }}
          >
            {company.compIcesiStud === "X"
              ? "LA EMPRESA HA SOLICITADO PRACTICANTES DE LA UNIVERSIDAD ICESI"
              : "LA EMPRESA NO HA SOLICITADO PRACTICANTES DE LA UNIVERSIDAD ICESI"}
          </Typography>
        </Stack>
      </Paper>
    </div>
  );
};

export default ShowCompany;
