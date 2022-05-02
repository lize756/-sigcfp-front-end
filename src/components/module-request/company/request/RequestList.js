import React, { useState, useEffect } from "react";

import {
  Container,
  Stack,
  Card,
  TableContainer,
  TablePagination,
  Button,
} from "@mui/material";

//Data Grid
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//Icon
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import "../StylesCompany.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInternRequest,
  getInternRequestsAssociatedCompany,
  setIsRender,
  setIntReq,
} from "../../../store/slices/InternRequestSlice";

const RequestList = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //lista de paginacion de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

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

  /**
   * This useEffect allow render the DOM when the list is update
   */
  useEffect(() => {
    dispatch(getInternRequestsAssociatedCompany(ACCESS_TOKEN, userCompanyId));
    setTimeout(() => {
      dispatch(setIsRender(false));
    }, "1000");
  }, [isRender]);

  /**
   * This method allow show data relationated with the careers and
   * faculties associated of intern request
   */

  const renderFacultiesAndCareers = (inteRequIdCurrent) => {
    let concatCareers = "";
    let concatFaculty = "";
    const index = list_interRequestsOfCompany.findIndex(
      (i) => i.inteRequId === inteRequIdCurrent.inteRequId
    );
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
   * Allow delete an intern request
   * @param {} event
   * @param {*} cellValues correspond the cell that you want delete
   */
  const handleDelete = (event, cellValues) => {
    const currentReqToDelete = cellValues.row;
    dispatch(
      deleteInternRequest(
        ACCESS_TOKEN,
        currentReqToDelete.inteRequId,
        currentReqToDelete
      )
    );
  };
  /// End to method of crud intern request

  /**
   * ------------------------------------------------------------------------------------
   * ------------------------------------Methods of datagrid-----------------------------
   * ------------------------------------------------------------------------------------
   */
  const handleCellClick = (param, event) => {
    event.stopPropagation();
    console.log(param.cellClick);
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

  let currentCareers = "";
  const columns = [
    {
      field: "inteRequName",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "faculties",
      headerName: "Facultad",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (cellValues) => {
        const [faculties, careers] = renderFacultiesAndCareers(cellValues.row);
        currentCareers = careers;
        return (
          <Typography variant="string" align="center" noWrap>
            {faculties}
          </Typography>
        );
      },
    },
    {
      field: "careers",
      headerName: "Carrera",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Typography variant="string" align="center" noWrap>
            {currentCareers}
          </Typography>
        );
      },
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
      flex: '10px',
    },
    {
      field: "Opciones",
      headerAlign: "center",
      align: "center",
      flex: '10px',

      renderCell: (cellValues) => {
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
              <DeleteIcon />
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
            rows={isRender ? [] : list_interRequestsOfCompany}
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
    </div>
  );
};

export default RequestList;
