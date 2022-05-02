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

import { Link, Link as RouterLink } from "react-router-dom";
import axios from "../../../../config/axios";
import User from "./User";
import AddIcon from "@mui/icons-material/Add";
import Search from "../request/RequestSearch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getContactsAssociatedCompany,
  setIsRenderContact,
} from "../../../store/slices/ContactSlice";

const ListUserModified = ({ userEdit }) => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //User contacts
  const [userList, setUserList] = useState([]);

  //table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /**
   * REDUX
   */
  //Get list of company saved in the store
  const listContactOfCompany = useSelector(
    (state) => state.ContactSlice.listContactsOfCompany
  );

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Get company id of the store
  const userCompanyId = useSelector((state) => state.userLogin.userCompanyId);

  // Verified if change the list of intern requests associated to contact
  const isRender = useSelector((state) => state.ContactSlice.isRenderContact);

  useEffect(() => {
    // Added to store the company that user login
    dispatch(getContactsAssociatedCompany(ACCESS_TOKEN, userCompanyId));
    dispatch(setIsRenderContact(false));
    console.log("Tamaño ", listContactOfCompany.length);
  }, [isRender]);

  //Metodo delete
  const delUser = (user) => {
    console.log(user.contId);

    dispatch(deleteContact(ACCESS_TOKEN, user.contId));
  };

  //Metodo edit
  const editUser = (user) => {
    userEdit(user);
    //navigate("/company/update");
  };

  //Metodo
  const viewUser = (user) => {
    userEdit(user);
    //navigate("/company/View");
  };

  /**
   * ------------------------------------------------------------------------------------
   * ----------------------------------Metodos nuevos--------------------------------
   * ------------------------------------------------------------------------------------
   */
  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "contName",
      headerName: "Nombre de contacto",
      width: 300,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "contPhone",
      headerName: "Telefono",
      width: 200,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "contEmail",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "contPosition",
      headerName: "Posición",
      width: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "Opciones",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Print
          </Button>
        );
      },
    },
  ];
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
            Contactos Directos
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/company/createUser"
            startIcon={<AddIcon />}
          >
            Crear Contacto
          </Button>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8, padding: "0px 20px 0px 20px" }}>
        <Search />
        <TableContainer
          sx={{ maxHeight: 400, mt: 5, mb: 5, height: 500, width: "100%" }}
        >
          <DataGrid
            rowHeight={50}
            getRowId={(row) => row.contId}
            rows={listContactOfCompany}
            columns={columns}
            pageSize={5}
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </TableContainer>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}></Paper>
    </div>
  );
};

export default ListUserModified;
