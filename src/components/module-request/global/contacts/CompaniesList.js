import React, { useState, useEffect } from "react";

import {
  Paper,
  Container,
  Stack,
  Card,
  TableContainer,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
    navigate("/promotion/company");
    dispatch(setCompany(currentContact));
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
    navigate("/company/contacts");
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
          <DataGrid
            rowHeight={50}
            getRowId={(row) => row.compId}
            rows={listCompanies}
            columns={columns}
            pageSize={10}
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

export default CompaniesList;
