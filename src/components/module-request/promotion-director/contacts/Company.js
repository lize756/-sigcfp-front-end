import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

const Company = ({ company, viewCompany }) => {
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={() => {
        viewCompany(company);
      }}
    >
      <TableCell align="left">{company.compName}</TableCell>
      <TableCell align="left">{company.compEmail}</TableCell>
      <TableCell align="center">{company.compTelephone}</TableCell>
      <TableCell align="right">{company.compAddress}</TableCell>
      <TableCell align="center">
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Company;
