import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Request = ({ request, delRequest, editRequest }) => {
  //lista de solicitudes de practica
  const [getStrCareers, setStrCareers] = useState("");
  const [getStrFaculty, setStrFaculty] = useState("");

  useEffect(() => {
    // Allow concat the elements in the list of careers with its faculty
    let concatCareers = "";
    let concatFaculty = "";
    const array = request.careers;
    for (let i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        concatCareers += array[i].careName;
        concatFaculty += array[i].faculty.facuName;
      } else {
        concatCareers += array[i].careName + ",";
        concatFaculty += array[i].faculty.facuName + ",";
      }
    }
    setStrCareers(concatCareers);
    setStrFaculty(concatFaculty);
  }, []);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={request.id}>
      <TableCell align="right">{getStrFaculty}</TableCell>
      <TableCell align="right">{getStrCareers}</TableCell>
      <TableCell align="right">{request.inteRequStDate}</TableCell>
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
