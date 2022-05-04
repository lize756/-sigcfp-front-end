import React, { useState, useEffect } from "react";

import {
  Paper,
  Container,
  Stack,
  Card,
  TableContainer,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { DataGrid, esES, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
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
              aria-label="edit"
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

  /**
   * ------------------------------------------------------------------------------------
   * ------------------------------------Custom config of datagrid-----------------------------
   * ------------------------------------------------------------------------------------
   */

  /**
   *This constant allows to establish the theme that the datagrid will have,
   *this includes: the colors, the size of the cells, the language, among others....
   *In this case we use it to establish the language of the datagrid
   *More info: https://v4.mui.com/components/data-grid/localization/
   */
  const customLanguageDataGrid = createTheme({}, esES);

  /**
   * This function allows establishing which header buttons the datagrid will have (filtering button, column density...),
   * as well as establishing the format to export the information to a csv file
   * more info: https://mui.com/x/react-data-grid/components/
   * @returns the custom Grid Toolbar Options Of Datagrid
   */
  function GridToolbarOptionsOfDatagrid() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
        <GridToolbarExport
          csvOptions={{
            fileName: "Mis solicitudes",
            delimiter: ";",
            utf8WithBom: true,
          }}
        ></GridToolbarExport>
      </GridToolbarContainer>
    );
  }
  /**
   * --------------------------End custom config datagrid--------------------------------
   */

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
        <ThemeProvider theme={customLanguageDataGrid}>
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
              Toolbar: GridToolbarOptionsOfDatagrid,
            }}
          />
        </ThemeProvider>
        </TableContainer>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}></Paper>
    </div>
  );
};

export default ListUser;
