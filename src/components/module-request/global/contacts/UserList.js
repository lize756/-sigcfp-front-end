import React, { useState, useEffect } from "react";

import {
  Paper,
  Container,
  Stack,
  Card,
  TableContainer,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const UserList = () => {
  //Redux
  const companyContacts = useSelector(
    (state) => state.ContactSlice.listContactsOfCompany
  );
  const currentCompany = useSelector((state) => state.CompanySlice.company);

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
            Contactos empresariales de la empresa {currentCompany.compName}
          </Typography>
        </Stack>
      </Container>
      <Card sx={{ borderRadius: 8, padding: "0px 20px 0px 20px" }}>
        <TableContainer
          sx={{ maxHeight: 400, mt: 5, mb: 5, height: 500, width: "100%" }}
        >
          <ThemeProvider theme={customLanguageDataGrid}>
            <DataGrid
              rowHeight={50}
              getRowId={(row) => row.contId}
              rows={companyContacts}
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
    </div>
  );
};

export default UserList;
