import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";

const User = ({ user }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} onClick={() => {}}>
      <TableCell align="left">{user.contName}</TableCell>
      <TableCell align="center">{user.contEmail}</TableCell>
      <TableCell align="center">{user.contPhone}</TableCell>
      <TableCell align="right">{user.contPosition}</TableCell>
    </TableRow>
  );
};

export default User;
