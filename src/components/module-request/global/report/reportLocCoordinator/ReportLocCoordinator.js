import React from "react";
import { Typography, Paper } from "@mui/material";

import ReportCards from "./ReportCards";
import ReportByCompany from "../ReportByCompany";

const ReportLocCoordinator = () => {
  return (
    <div>
      <Paper sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ opacity: 0.72, color: "#072079", textAlign: "center" }}
        >
          REPORTES
        </Typography>
        <ReportCards />
        <ReportByCompany />
      </Paper>
    </div>
  );
};

export default ReportLocCoordinator;
