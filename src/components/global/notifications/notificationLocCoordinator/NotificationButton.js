import React from "react";
import { Grid, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router";

const NotificationButton = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Grid
        container
        spacing={5}
        p={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs="auto">
          <Button
            sx={{ width: 230 }}
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => {
              navigate("/location/messagest");
            }}
          >
            Inicio de período
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            sx={{ width: 230 }}
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => {
              navigate("/location/messageend");
            }}
          >
            Fin del período
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationButton;
