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
/**
 * Icons
 */
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate } from "react-router";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "../../../store/slices/CompanySlice";
import { getContactsAssociatedCompany } from "../../../store/slices/ContactSlice";

const CompaniesList = () => {
  //Company contacts
  const [companyList, setCompanyList] = useState([]);
  /**
   * ----------------------------------------
   * ---------------- REDUX -----------------
   * ----------------------------------------
   */
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Correspond to rol login in the system
  const rolUserLogin = useSelector((state) => state.userLogin.rolee);
  //navigate
  let navigate = useNavigate();

  //Redux
  const listCompanies = useSelector(
    (state) => state.CompanySlice.listCompanies
  );

  /**
   * ------------------------------------------------------------------------------------
   * ----------------Method relationated with the crud action of contact-----------------
   * ------------------------------------------------------------------------------------
   */

  /**
   * Allow view of info tha have a company
   * @param {*} event
   * @param {*} cellValues correspond the select company that you want view
   */
  const handleViewCompanyInfo = (event, cellValues) => {
    const currentContact = cellValues.row;
    // navigate("/promotion/company");
    dispatch(setCompany(currentContact));
    selectPathShowCompany(rolUserLogin);
  };

  /**
   * Allow view of contacts that have a company
   * @param {} event
   * @param {*} cellValues correspond the select company that you want view its contacts
   */
  const handleViewContactInfo = (event, cellValues) => {
    const currentCompany = cellValues.row;
    console.log(cellValues.row);
    dispatch(getContactsAssociatedCompany(ACCESS_TOKEN, currentCompany.compId));
    selectPathShowCompanyContacts(rolUserLogin);
  };

  /**
   * This function is responsible for choosing the route that corresponds to the person logged in
   * @param {*} ROLEE Role of the person or company who logged in to the application
   */
  const selectPathShowCompany = (ROLEE) => {
    switch (ROLEE) {
      case "ROLEE_PROMOTION_COORDINATOR":
        navigate("/promotion/companies/company/info");

        break;
      case "ROLEE_LOCATION_COORDINATOR":
        navigate("/location/companies/company/info");
        break;

      case "ROLEE_COMPANY":
        break;

      case "ROLEE_DIRECTOR":
        navigate("/director/companies/company/info");
        break;
      case "ROLEE_GRADUATE":
        break;
    }
  };

  /**
   * This function is responsible for choosing the route that corresponds to the person logged in
   * @param {*} ROLEE Role of the person or company who logged in to the application
   */
  const selectPathShowCompanyContacts = (ROLEE) => {
    switch (ROLEE) {
      case "ROLEE_PROMOTION_COORDINATOR":
        navigate("/promotion/companies/company/contacts");

        break;
      case "ROLEE_LOCATION_COORDINATOR":
        navigate("/location/companies/company/contacts");
        break;

      case "ROLEE_COMPANY":
        break;

      case "ROLEE_DIRECTOR":
        navigate("/director/companies/company/contacts");
        break;
      case "ROLEE_GRADUATE":
        break;
    }
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
      field: "compName",
      headerName: "Nombre de la compañia",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compNit",
      headerName: "NIT",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compEmail",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compTelephone",
      headerName: "Telefono",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compType",
      headerName: "Tipo de compañia",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compCountryName",
      headerName: "País",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compCityName",
      headerName: "Ciudad",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "compAddress",
      headerName: "Dirección",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hide: true,
    },
    {
      field: "compIcesiStud",
      headerName: "¿Ha vinculado estudiantes de ICESI?",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hide: true,
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
              aria-label="viewCompany"
              onClick={(event) => {
                handleViewCompanyInfo(event, cellValues);
              }}
            >
              <PreviewIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="contact"
              onClick={(event) => {
                handleViewContactInfo(event, cellValues);
              }}
            >
              <ContactsIcon />
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
            Empresas Registradas
          </Typography>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8, padding: "0px 20px 0px 20px" }}>
        <TableContainer sx={{ mt: 5, mb: 5, height: 500, width: "100%" }}>
          <ThemeProvider theme={customLanguageDataGrid}>
            <DataGrid
              rowHeight={50}
              getRowId={(row) => row.compId}
              rows={listCompanies}
              columns={columns}
              pageSize={10}
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

export default CompaniesList;
