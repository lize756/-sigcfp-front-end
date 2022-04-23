import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/Visibility";

const Request = ({ request, viewRequest }) => {
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
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={() => {
        viewRequest(request);
      }}
    >
      <TableCell align="right">{request.company.compName}</TableCell>
      <TableCell align="right">{getStrFaculty}</TableCell>
      <TableCell align="center">{getStrCareers}</TableCell>
      <TableCell align="center">{request.inteRequStDate}</TableCell>
      <TableCell align="right">{request.inteRequNumber}</TableCell>
    </TableRow>
  );
};

export default Request;
