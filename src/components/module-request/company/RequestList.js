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
import { useNavigate } from "react-router";
import "../StylesCompany.css";

const RequestList = ({ edit }) => {
  const [requestList, setRequestList] = useState([]);

  //table paging
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  //Axios
  useEffect(() => {
    axios.get("/internRequests").then((res) => setRequestList(res.data));
  }, []);

  /**
   * This is a function that allows deleting a request
   * @param {*} request to deleted
   */
  const delRequest = (request) => {
    console.log(request.inteRequId);
    axios.delete("internRequests/" + request.inteRequId).then(() => {
      axios.get("internRequests").then((res) => {
        setRequestList(res.data);
      });
    });
  };

  /**
   * This is a function that allows you to obtain the request to update
   * @param {*} request to update
   */
  const editRequest = (request) => {
    edit(request);
    navigate("/company/update");
  };

  /**
   * This is a function that allows you to obtain the request to visualize
   * @param {*} request to view
   */
  const viewRequest = (request) => {
    edit(request);
    navigate("/company/View");
  };

  //------------------------------------------ Functions handleChange -------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    navigate("/company/create");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * This function handles the rendering of the requests in the table
   * @returns
   */
  const renderList = () => {
    return requestList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((request) => (
        <Request
          request={request}
          key={request.id}
          delRequest={delRequest}
          editRequest={editRequest}
          viewRequest={viewRequest}
        />
      ));
  };

  return (
    <div>
      <Search />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Facultad</TableCell>
                <TableCell align="center">Carrera</TableCell>
                <TableCell align="center">Fecha de Inicio </TableCell>
                <TableCell align="center">Número de Estudiantes </TableCell>
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
