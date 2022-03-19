import React from "react";
import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Request = ({ request, delRequest, editRequest }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={request.id}>
      <TableCell align="right">{request.faculty}</TableCell>
      <TableCell align="right">{request.careers}</TableCell>
      <TableCell align="right">{request.inteRequDateStart}</TableCell>
      <TableCell align="right">{request.inteRequNumber}</TableCell>
      <TableCell align="center">
        <DeleteIcon
          color="error"
          onClick={() => {
            delRequest(request);
          }}
        />{" "}
        &nbsp;
        <EditIcon
          color="primary"
          onClick={() => {
            editRequest(request);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default Request;
