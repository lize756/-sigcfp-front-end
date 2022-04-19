import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/Visibility";

const User = ({ user, delUser, editUser, viewUser }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell
        align="left"
        onClick={() => {
          viewUser(user);
        }}
      >
        {user.contName}
      </TableCell>
      <TableCell
        align="center"
        onClick={() => {
          viewUser(user);
        }}
      >
        {user.contEmail}
      </TableCell>
      <TableCell
        align="center"
        onClick={() => {
          viewUser(user);
        }}
      >
        {user.contPhone}
      </TableCell>
      <TableCell
        align="right"
        onClick={() => {
          viewUser(user);
        }}
      >
        {user.contPosition}
      </TableCell>
      <TableCell align="center">
        <DeleteIcon
          color="error"
          onClick={() => {
            delUser(user);
          }}
        />{" "}
        &nbsp;
        <EditIcon
          color="primary"
          onClick={() => {
            editUser(user);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default User;
