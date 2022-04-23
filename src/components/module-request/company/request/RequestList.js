import React, { useState, useEffect } from "react";

import {
  Paper,
  Container,
  Stack,
  Card,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import axios from "../../../../config/axios";
import Request from "./Request";
import AddIcon from "@mui/icons-material/Add";
import Search from "./RequestSearch";
import { useNavigate } from "react-router";
import "../StylesCompany.css";

//Redux
import {useSelector, shallowEqual } from "react-redux";

const RequestList = ({ edit }) => {
  //lista de solicitudes de practica
  const [requestList, setRequestList] = useState([]);

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();
  let list_interRequestsOfCompany = useSelector(
    (state) => state.InternRequestSlice.listIntReqsOfCompany,
    shallowEqual
  );

  console.log(list_interRequestsOfCompany.length)
  //Metodo delete
  const delRequest = (request) => {
    console.log(request.inteRequId);
    axios.delete("internRequests/" + request.inteRequId).then(() => {
      axios.get("internRequests").then((res) => {
        setRequestList(res.data);
      });
    });
  };

  //Metodo edit
  const editRequest = (request) => {
    edit(request);
    navigate("/company/update");
  };

  //Metodo
  const viewRequest = (request) => {
    edit(request);
    navigate("/company/View");
  };

  //Metodos handleChange
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //El Render
  const renderList = () => {
    return list_interRequestsOfCompany
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((request) => (
        <Request
          request={request}
          key={request.inteRequId}
          delRequest={delRequest}
          editRequest={editRequest}
          viewRequest={viewRequest}
        />
      ));
  };

  return (
    <div>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h5" gutterBottom color="#072079">
            Mis Solicitudes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/company/create"
            startIcon={<AddIcon />}
          >
            Crear Solicitud
          </Button>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8 }}>
        <Search />
        <TableContainer sx={{ maxHeight: 400, mt: 5, mb: 5 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Facultad</TableCell>
                <TableCell align="right">Carrera</TableCell>
                <TableCell align="right">Fecha de Inicio </TableCell>
                <TableCell align="right">Número de Estudiantes </TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mb: 2 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={list_interRequestsOfCompany.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}></Paper>
    </div>
  );
};

export default RequestList;
