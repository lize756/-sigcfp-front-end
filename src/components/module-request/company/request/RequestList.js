import React, { useState, useEffect } from "react";

import { Container, Stack, Card, TableContainer, Button } from "@mui/material";
import EditAlert from "../../../global/alert/EditAlert";

//Data Grid
import {
  DataGrid,
  GridToolbar,
  esES,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { esES as coreeEsEs } from "@mui/material/locale";
//Icon
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";

import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import "../StylesCompany.css";

//Config lenguage of default.
import { createTheme, ThemeProvider } from "@mui/material/styles";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInternRequest,
  getInternRequestsAssociatedCompany,
  setIsRender,
  setIntReq,
} from "../../../store/slices/InternRequestSlice";
import {
  setAcceptedAlert,
  setShowAlert,
  setAlert,
} from "../../../store/slices/AlertSlice";
import { render } from "react-dom";
const themeLanguageDataGrid = createTheme(esES, coreeEsEs);
const RequestList = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //navigate
  let navigate = useNavigate();
  // Const
  const [getIntReqAssocCompany, setIntReqAssocCompany] = useState([]);
  const [getRequestDelete, setRequestDelete] = useState({});
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
  // Verified if the user to accept the conditions to change this state, if isAcceptedAlert, the user agree on the contrary disagree
  const isAcceptedAlert = useSelector(
    (state) => state.AlertSlice.isAcceptedAlert
  );
  // Verified if the user to deploy a alert.
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);
  /**
   * This useEffect allow render the DOM when the list is update
   */
  useEffect(() => {
    dispatch(getInternRequestsAssociatedCompany(ACCESS_TOKEN, userCompanyId));
    let listReqOfCompany = customInternRequestEstructure();
    setIntReqAssocCompany(listReqOfCompany);
    setTimeout(() => {
      dispatch(setIsRender(false));
    }, "1000");
  }, [isRender]);

  /**
   * This useEffect allow update the state the element that allow delete a one request.
   *    */
  useEffect(() => {
    auxiliarHandleDelete(getRequestDelete);
  }, [isAcceptedAlert]);

  const customInternRequestEstructure = () => {
    return list_interRequestsOfCompany.map((element, index) => {
      const [faculties, careers] = renderFacultiesAndCareers(index);
      const customFaculties = faculties;
      const customCareers = careers;
      return {
        ...element,
        customFaculties,
        customCareers,
      };
    });
  };
  /**
   * This method allow show data relationated with the careers and
   * faculties associated of intern request
   */

  const renderFacultiesAndCareers = (index) => {
    let concatCareers = "";
    let concatFaculty = "";
    //console.log(index)
    const array = list_interRequestsOfCompany[index].careers;
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        concatCareers += array[i].careName;
        concatFaculty += array[i].faculty.facuName;
      } else {
        concatCareers += array[i].careName + ",";
        concatFaculty += array[i].faculty.facuName + ",";
      }
    }

    return [concatFaculty, concatCareers];
  };
  /**
   * ------------------------------------------------------------------------------------
   * ----------------Method relationated with the crud action of contact-----------------
   * ------------------------------------------------------------------------------------
   */

  /**
   * Allow edit an intern request
   * @param {*} event
   * @param {*} cellValues correspond the cell that you want edit
   */
  const handleEdit = (event, cellValues) => {
    const currentReq = cellValues.row;
    dispatch(setIntReq(currentReq));
    navigate("/company/update");
  };

  /**
   * -----------------------------------------------------------------------------------------------
   * ----------------------------------Delete functions---------------------------------------------
   * -----------------------------------------------------------------------------------------------
   */
  /**
   * Allow delete an intern request
   * @param {} event
   * @param {*} cellValues correspond the cell that you want delete
   */
  const handleDelete = (event, cellValues) => {
    const currentReqToDelete = cellValues.row;
    setRequestDelete(currentReqToDelete);
    dispatch(setShowAlert(true));
    const alert = {
      alertTitle: "¿Está usted seguro de que desea elimnar esta solicitud?",
      alertDescription:
        "Nombre de solicitud: " + currentReqToDelete.inteRequName,
      alertOtherInfo: "",
    };
    dispatch(setAlert(alert));
  };

  const auxiliarHandleDelete = (currentReqToDelete) => {
    if (isAcceptedAlert) {
      dispatch(
        deleteInternRequest(
          ACCESS_TOKEN,
          currentReqToDelete.inteRequId,
          currentReqToDelete
        )
      );
      dispatch(setAcceptedAlert(false));
    }
  };

  /**
   * Allow view of info tha have a company
   * @param {*} event
   * @param {*} cellValues correspond the select company that you want view
   */
  const handleViewInterReqInfo = (event, cellValues) => {
    const currentIntReq = cellValues.row;
    dispatch(setIntReq(currentIntReq));
    navigate("/company/show");
  };

  /// End to method of crud intern request

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
  // End to method of datagrid

  const displayAlert = () => {
    return isShowAlert ? <EditAlert /> : <></>;
  };

  /**
   * -----------------------------------------------------------------------------
   * This lines represent the column name that it have the grid
   * table. This contains the list of request associated of a one company.
   * -----------------------------------------------------------------------------
   */

  const columns = [
    {
      field: "inteRequName",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "customFaculties",
      headerName: "Facultad",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "customCareers",
      headerName: "Carrera",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "inteRequStDate",
      headerName: "Fecha de Inicio",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "inteRequNumber",
      headerName: "Número de Estudiantes",
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
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="viewCompany"
              onClick={(event) => {
                handleViewInterReqInfo(event, cellValues);
              }}
            >
              <PreviewIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  /**
   *This constant allows to establish the theme that the datagrid will have,
   *this includes: the colors, the size of the cells, the language, among others....
   *In this case we use it to establish the language of the datagrid
   */
  const customLanguageDataGrid = createTheme({}, esES);

  /**
   * This function allows establishing which header buttons the datagrid will have (filtering button, column density...),
   * as well as establishing the format to export the information to a csv file
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

  return (
    <div>
      {displayAlert()}
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
      <Card sx={{ borderRadius: 8, padding: "0px 20px 0px 20px" }}>
        <TableContainer
          sx={{
            maxHeight: 400,
            mt: 5,
            mb: 5,
            height: 500,
            width: "100%",
          }}
        >
          <ThemeProvider theme={customLanguageDataGrid}>
            <DataGrid
              rowHeight={50}
              loading={isRender}
              autoHeight
              getRowId={(row) => row.inteRequId}
              rows={isRender ? [] : getIntReqAssocCompany}
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

export default RequestList;
