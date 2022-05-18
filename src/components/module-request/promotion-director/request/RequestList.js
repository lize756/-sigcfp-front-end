import React, { useState, useEffect } from "react";

//Data Grid
import {
  DataGrid,
  esES,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid"; //Icon
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Paper, Container, Stack, Card, TableContainer } from "@mui/material";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setIntReq,
  getInternRequests,
  setIsRender,
} from "../../../store/slices/InternRequestSlice";
//Config lenguage of default.
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteAlert from "../../../global/alert/DeleteAlert";
import CorrectUpdateOrDeletejs from "../../../global/alert/CorrectUpdateOrDelete";
const RequestList = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //navigate
  let navigate = useNavigate();

  const [getListInternRequests, setListInternRequests] = useState([]);
  //List of intern requests
  const list_interRequests = useSelector(
    (state) => state.InternRequestSlice.listInteReqs
  );

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  // Verified if change the list of intern requests associated to company
  const isRender = useSelector((state) => state.InternRequestSlice.isRender);

  // Correspond to rol login in the system
  const rolUserLogin = useSelector((state) => state.userLogin.rolee);
  //se guarda en requestlist la informacion de las solicitudes
  // Verified if the user to deploy a alert.
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);
  // Correspond to type of alert
  const typeAlert = useSelector((state) => state.AlertSlice.typeAlert);

  //Axios
  useEffect(() => {
    // Added to store of list of intern requests inside in database
    dispatch(getInternRequests(ACCESS_TOKEN));
    let listReq = customInternRequestEstructure();
    setListInternRequests(listReq);
    setTimeout(() => {
      dispatch(setIsRender(false));
    }, "1000");
  }, [isRender]);

  const customInternRequestEstructure = () => {
    return list_interRequests.map((element, index) => {
      const [faculties, careers] = renderFacultiesAndCareers(index);
      const customFaculties = faculties;
      const customCareers = careers;
      const customCompName = element.company.compName;
      return {
        ...element,
        customFaculties,
        customCareers,
        customCompName,
      };
    });
  };

  /**
   * This method allow show data relationated with the careers and
   * faculties associated of intern request
   */

  const renderFacultiesAndCareers = (inteRequIdCurrent) => {
    let concatCareers = "";
    let concatFaculty = "";
    const array = list_interRequests[inteRequIdCurrent].careers;
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
   * Allow view of intern request
   * @param {*} event
   * @param {*} cellValues correspond the cell that you want edit
   */
  const handleViewRequest = (event, cellValues) => {
    const currentReq = cellValues.row;
    dispatch(setIntReq(currentReq));
    selectPath(rolUserLogin);
  };

  /**
   * This function is responsible for choosing the route that corresponds to the person logged in
   * @param {*} ROLEE Role of the person who logged in to the application
   */
  const selectPath = (ROLEE) => {
    switch (ROLEE) {
      case "ROLEE_PROMOTION_COORDINATOR":
        navigate("/promotion/internrequest/show");

        break;
      case "ROLEE_LOCATION_COORDINATOR":
        navigate("/location/internrequest/show");
        break;

      case "ROLEE_COMPANY":
        navigate("/company/internrequest/show");
        break;

      case "ROLEE_DIRECTOR":
        navigate("/director/internrequest/show");
        break;
      case "ROLEE_GRADUATE":
        break;
    }
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

  /**
   * -----------------------------------------------------------------------------
   * This lines represent the column name that it have the grid
   * table. This contains the list of request associated of a one company.
   * -----------------------------------------------------------------------------
   */

  const columns = [
    {
      field: "customCompName",
      headerName: "Nombre de la compañia",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "inteRequName",
      headerName: "Nombre de la solicitud",
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
      flex: "10px",
    },
    {
      field: "inteRequLocation",
      headerName: "Tipo práctica",
      headerAlign: "center",
      align: "center",
      flex: "10px",
    },
    {
      field: "inteRequStatus",
      headerName: "Estado de la solicitud",
      headerAlign: "center",
      align: "center",
      flex: "10px",
      hide:true
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
                handleViewRequest(event, cellValues);
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

  /**
   * This method allows an alert to be displayed on the screen according to the type of alert specified.
   * If the alert is to accept or reach, the type is '0',
   * otherwise it is just a notification message, the type is '1'
   * @returns
   */
  const displayAlert = () => {
    let componentToDisplay = <></>;
    if (isShowAlert) {
      //Display alert dialog or snackbark
      componentToDisplay =
        typeAlert === "0" ? (
          <DeleteAlert />
        ) : typeAlert === "1" ? (
          <CorrectUpdateOrDeletejs />
        ) : (
          <></>
        );
    }
    return componentToDisplay;
  };

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
            Todas las solicitudes
          </Typography>
        </Stack>
      </Container>

      <Card sx={{ borderRadius: 8 }}>
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
              rows={isRender ? [] : getListInternRequests}
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

export default RequestList;
