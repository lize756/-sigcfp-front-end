import React from "react";
import { Typography, Paper } from "@mui/material";
import NotificationButton from "./NotificationButton";
import NotificationCards from "./NotificationCards";

const NotificationContents = () => {
  return (
    <div>
      <Paper sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ opacity: 0.72, color: "#072079", textAlign: "center" }}
        >
          NOTIFICACIONES
        </Typography>
        <NotificationButton />
        <NotificationCards />
      </Paper>
    </div>
  );
};

export default NotificationContents;
