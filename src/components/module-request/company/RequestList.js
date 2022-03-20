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
  Button,
} from "@mui/material";
import axios from "../../../config/axios";
import Request from "./Request";
import Search from "./RequestSearch";
import Update from "./RequestUpdate";
import { useNavigate } from "react-router";
import "./StylesCompany.css";

const RequestList = ({ edit }) => {
  //lista de solicitudes de practica
  const [requestList, setRequestList] = useState([]);

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  //se guarda en requestlist la informacion de las solicitudes
  //Axios
  useEffect(() => {
   axios.get("internRequests").then((res) => setRequestList(res.data));
  // axios.get("internRequests").then((res) => console.log(res.data));
  }, []);

  //Metodo delete
  const delRequest = (request) => {
    axios.delete("requests/" + request.id).then(() => {
      axios.get("requests").then((res) => {
        setRequestList(res.data);
      });
    });
  };

  //Metodo edit
  const editRequest = (request) => {
    edit(request);
    navigate("/company/update");
  };

  //Metodos handleChange
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    navigate("/company/create");
    //<Create addRequest={addRequest} />;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //El Render
  const renderList = () => {
    return requestList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((request) => (
        <Request
          request={request}
          key={request.id}
          delRequest={delRequest}
          editRequest={editRequest}
        />
      ));
  };

  return (
    <div>
      <Search />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Facultad</TableCell>
                <TableCell align="right">Carrera</TableCell>
                <TableCell align="right">Fecha de Creación </TableCell>
                <TableCell align="right">Número de Estudiantes </TableCell>
                <TableCell align="center">Acciones</TableCell>
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
      <Button sx={{ mt: 5 }} variant="contained" onClick={handleClick}>
        Crear Solicitud
      </Button>
    </div>
  );
};

export default RequestList;
