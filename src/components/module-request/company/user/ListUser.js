import React, { useState, useEffect } from "react";

import {
  Paper,
  Container,
  Stack,
  Card,
  TableContainer,
  Button,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
/**
 * Icons
 */
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddIcon from "@mui/icons-material/Add";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getContactsAssociatedCompany,
  setContact,
  setIsRenderContact,
} from "../../../store/slices/ContactSlice";
import { useNavigate } from "react-router";

const ListUser = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

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
  const isRenderContact = useSelector(
    (state) => state.ContactSlice.isRenderContact
  );

  useEffect(() => {
    // Added to store the company that user login
    dispatch(getContactsAssociatedCompany(ACCESS_TOKEN, userCompanyId));

    setTimeout(() => {
      dispatch(setIsRenderContact(false));
    }, "1000");
    console.log("Tamaño ", listContactOfCompany.length);
  }, [isRenderContact]);

  let navigate = useNavigate();
  /**
   * ------------------------------------------------------------------------------------
   * ----------------Method relationated with the crud action of contact-----------------
   * ------------------------------------------------------------------------------------
   */

  /**
   * Allow edit a contact
   * @param {*} event
   * @param {*} cellValues correspond the cell that you want edit
   */
  const handleEdit = (event, cellValues) => {
    const currentContact = cellValues.row;
    dispatch(setContact(currentContact));
    navigate("/company/updateUser");
  };

  /**
   * Allow delete a contact
   * @param {} event
   * @param {*} cellValues correspond the cell that you want delete
   */
  const handleDelete = (event, cellValues) => {
    const currentUserToDelete = cellValues.row;
    dispatch(deleteContact(ACCESS_TOKEN, currentUserToDelete.contId));
  };

  /**
   * ------------------------------------------------------------------------------------
   * ------------------------------------Methods of datagrid-----------------------------
   * ------------------------------------------------------------------------------------
   */
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
  /**
   * -----------------------------------------------------------------------------
   * This lines represent the column name that it have the grid
   * table that contains the list of contact
   * -----------------------------------------------------------------------------
   */

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
        const current = cellValues;
        return (
          <>
            <IconButton
              size="large"
              aria-label="delete"
              onClick={(event) => {
                handleEdit(event, cellValues);
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="delete"
              onClick={(event) => {
                handleDelete(event, cellValues);
              }}
            >
              <PersonRemoveIcon />
            </IconButton>
          </>
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
        <TableContainer
          sx={{ maxHeight: 400, mt: 5, mb: 5, height: 500, width: "100%" }}
        >
          <DataGrid
            rowHeight={50}
            loading={isRenderContact}
            getRowId={(row) => row.contId}
            rows={isRenderContact ? [] : listContactOfCompany}
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

export default ListUser;
