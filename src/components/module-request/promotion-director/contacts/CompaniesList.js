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
import Company from "./Company";
import Search from "../../company/request/RequestSearch";
import { useNavigate } from "react-router";
//redux
import { useDispatch, useSelector } from "react-redux";

const CompaniesList = () => {
  //Company contacts
  //const [companyList, setCompanyList] = useState([]);

  //table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  //Redux
  const listCompanies = useSelector(
    (state) => state.CompanySlice.listCompanies
  );

  const viewCompany = (company) => {
    //view(company);
    //navigate("/company/View");
  };

  //handleChange
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Render
  const renderList = () => {
    if (listCompanies.length > 0) {
      return listCompanies
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((company) => (
          <Company
            company={company}
            key={company.compId}
            viewCompany={viewCompany}
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
            Empresas Registradas
          </Typography>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8 }}>
        <Search />
        <TableContainer sx={{ maxHeight: 400, mt: 4, mb: 4 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Correo Electronico</TableCell>
                <TableCell align="center">Telefono</TableCell>
                <TableCell align="right">Dirección </TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mb: 1 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={listCompanies.length}
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

export default CompaniesList;
