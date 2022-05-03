import React, { useState, useEffect } from "react";

import { Paper, Container, Stack, Card, TableContainer } from "@mui/material";

//Data Grid
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//Icon
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setIsRender } from "../../../store/slices/InternRequestSlice";

const RequestList = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //navigate
  let navigate = useNavigate();

  const [getInternRequests, setInternRequests] = useState([]);
  //List of intern requests
  const list_interRequests = useSelector(
    (state) => state.InternRequestSlice.listInteReqs
  );

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  // Verified if change the list of intern requests associated to company
  const isRender = useSelector((state) => state.InternRequestSlice.isRender);

  //se guarda en requestlist la informacion de las solicitudes
  //Axios
  useEffect(() => {
    let listReq = customInternRequestEstructure();
    setInternRequests(listReq);
    setTimeout(() => {
      dispatch(setIsRender(false));
    }, "1000");
  }, [isRender]);

  const customInternRequestEstructure = () => {
    return list_interRequests.map((element, index) => {
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
    // dispatch(setIntReq(currentReq));
    navigate("/company/update");
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
      flex: "10px",
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
          <DataGrid
            rowHeight={50}
            loading={isRender}
            autoHeight
            getRowId={(row) => row.inteRequId}
            rows={isRender ? [] : getInternRequests}
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

export default RequestList;
