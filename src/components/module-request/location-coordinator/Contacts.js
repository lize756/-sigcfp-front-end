import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

import { indigo } from "@material-ui/core/colors";

const Contacts = ({ contact }) => {
  return (
    <Grid item>
      <Card sx={{ maxWidth: 300, minWidth: 300 }}>
        <CardHeader
          title={contact.contName}
          sx={{ bgcolor: "#F2F6FE", color: "#072079", borderColor: "#072079" }}
        />

        <Divider sx={{ bgcolor: "#072079" }} />
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
            {contact.contEmail}
          </Typography>

          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#072079", fontSize: 17, mt: 2 }}
          >
            Posición:
          </Typography>
          <Typography variant="body2" color="#009688" sx={{ mt: 1 }}>
            {contact.contPosition}
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
            {contact.contPhone}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Contacts;
