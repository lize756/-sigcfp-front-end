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
import Request from "./Request";
import AddIcon from "@mui/icons-material/Add";
import Search from "./RequestSearch";
import { useNavigate } from "react-router";
import "../StylesCompany.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInternRequest,
  getInternRequestsAssociatedCompany,
  setIsRender,
} from "../../../store/slices/InternRequestSlice";

const RequestList = ({ edit }) => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //lista de solicitudes de practica
  const [requestList, setRequestList] = useState([]);

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  /**
   * REDUX
   */
  const list_interRequestsOfCompany = useSelector(
    (state) => state.InternRequestSlice.listIntReqsOfCompany
  );

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Get company id of the store
  const userCompanyId = useSelector((state) => state.userLogin.userCompanyId);

  // Verified if change the list of intern requests associated to company
  const isRender = useSelector((state) => state.InternRequestSlice.isRender);

  useEffect(() => {
    dispatch(getInternRequestsAssociatedCompany(ACCESS_TOKEN, userCompanyId));
    dispatch(setIsRender(false));
    console.log("Tamaño ", list_interRequestsOfCompany.length);
  }, [isRender]);

  //Metodo delete
  const delRequest = (request) => {
    console.log(request.inteRequId);
    dispatch(
      deleteInternRequest(ACCESS_TOKEN, request.inteRequId, userCompanyId)
    );
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
    if (list_interRequestsOfCompany.length > 0) {
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
    } else {
      return <></>;
    }
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
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="center">Facultad</TableCell>
                <TableCell align="center">Carrera</TableCell>
                <TableCell align="center">Fecha de Inicio </TableCell>
                <TableCell align="right">Número de Estudiantes </TableCell>
                <TableCell align="center"></TableCell>
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
    </div>
  );
};

export default RequestList;
