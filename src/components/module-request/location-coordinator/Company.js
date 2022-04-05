import React from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

const Company = ({ company, contacts }) => {
  let navigate = useNavigate();

  /**
   * This function gets the company's contact list and passes to the parent, listCompanies component.
   * @param {*} e
   */
  const handleClick = (e) => {
    e.preventDefault();

    contacts(company.contacts);
    navigate("/location/contact");
  };
  return (
    <Grid item>
      <Card sx={{ maxWidth: 410, minWidth: 410 }}>
        <CardHeader
          title={company.compName}
          sx={{ bgcolor: "#072079", color: "#fafafa" }}
        />

        <Divider sx={{ bgcolor: "#fafafa" }} />

        <CardContent sx={{ textAlign: "left" }}>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#072079", fontSize: 17 }}
          >
            Correo Electrónico:
          </Typography>
          <Typography variant="body2" color="#009688" sx={{ mt: 1 }}>
            {company.compEmail}
          </Typography>

          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#072079", fontSize: 17, mt: 2 }}
          >
            Actividad Económica:
          </Typography>
          <Typography variant="body2" color="#009688" sx={{ mt: 1 }}>
            {company.compEcoActiv}
          </Typography>

          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#072079", fontSize: 17, mt: 2 }}
          >
            Teléfono:
          </Typography>
          <Typography variant="body2" color="#009688">
            {company.compTelephone}
          </Typography>

          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#072079", fontSize: 17, mt: 2 }}
          >
            Tipo de Compañía:
          </Typography>
          <Typography variant="body2" color="#009688">
            {company.compType}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            Información de Contacto
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Company;
