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
import Request from "./Request";
import Search from "../../company/request/RequestSearch";
import { useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
//Redux
import { useDispatch, useSelector } from "react-redux";

const RequestList = () => {
  //ID
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];


  //BORRAR

  //lista de solicitudes de practica
  const [requestList, setRequestList] = useState([]);

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  //List of intern requests
  let list_interRequests = useSelector(
    (state) => state.InternRequestSlice.listInteReqs
  );

  //se guarda en requestlist la informacion de las solicitudes
  //Axios
  useEffect(() => {
    //axios.get("/internRequests").then((res) => setRequestList(res.data));
    setRequestList(list_interRequests);
  }, []);

  //Metodo
  const viewRequest = (request) => {
    //navigate("/company/View");
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
    return requestList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((request) => (
        <Request
          request={request}
          key={request.inteRequId}
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
            Todas las solicitudes
          </Typography>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8 }}>
        <Search />
        <TableContainer sx={{ maxHeight: 400, mt: 5, mb: 5 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Compañia</TableCell>
                <TableCell align="center">Facultad</TableCell>
                <TableCell align="center">Carrera</TableCell>
                <TableCell align="center">Fecha de Inicio </TableCell>
                <TableCell align="right">Número de Estudiantes </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mb: 2 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={requestList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
  );
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}></Paper>
    </div>
  );
};

export default RequestList;
