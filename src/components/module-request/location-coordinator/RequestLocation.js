import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from "@mui/material";
import axios from "../../../config/axios";
import Request from "./Request";
import Search from "../company/RequestSearch";
import { useNavigate } from "react-router";
//Redux
import {useSelector } from "react-redux";

const RequestLocation = ({ requestView }) => {
  //lista de solicitudes de practica
  const [requestList, setRequestList] = useState([]);

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();
  // console.log("entre")
  // Allow to bring the token to login acces
  
  const ACCESS_TOKEN = "Bearer "+ useSelector((state) => state.userLogin).responseUserLogin.token;
  console.log(ACCESS_TOKEN)

  const header ={
    'Authorization': `${ACCESS_TOKEN}` 
  }
  useEffect(() => {
    //axios.defaults.headers.common = { Authorization: `${ACCESS_TOKEN}` };
    axios.get("api/internRequests",{header}).then((res) => setRequestList(res.data));
  }, []);

  /**
   * This function allows the visualization of a request
   */
  const viewRequest = (request) => {
    requestView(request);
    navigate("/location/View");
  };

  //Metodos handleChange
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderList = () => {
    return requestList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((request) => (
        <Request request={request} viewRequest={viewRequest} />
      ));
  };

  return (
    <div>
      <Search />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ bgcolor: "#072079" }}>
              <TableRow>
                <TableCell align="center">Facultad</TableCell>
                <TableCell align="center">Carrera</TableCell>
                <TableCell align="center">Fecha de Inicio </TableCell>
                <TableCell align="center">Número de Estudiantes </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={requestList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RequestLocation;
