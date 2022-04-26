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

import { Link as RouterLink } from "react-router-dom";
import axios from "../../../../config/axios";
import User from "./User";
import AddIcon from "@mui/icons-material/Add";
import Search from "../request/RequestSearch";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getContactsAssociatedCompany,
  setIsRenderContact,
} from "../../../store/slices/ContactSlice";

const ListUser = ({ userEdit }) => {
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
    /**
     * 
     axios.delete("contacts/" + user.contId).then(() => {
       axios.get("contacts").then((res) => {
         setUserList(res.data);
        });
      });
    */
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

  //handleChange
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Render
  const renderList = () => {
    if (listContactOfCompany.length > 0) {
      return listContactOfCompany
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user) => (
          <User
            user={user}
            key={user.contId}
            delUser={delUser}
            editUser={editUser}
            viewUser={viewUser}
          />
        ));
    } else {
      return <></>;
    }
  };

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

      <Card sx={{ borderRadius: 8 }}>
        <Search />
        <TableContainer sx={{ maxHeight: 400, mt: 5, mb: 5 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="center">Correo Electronico</TableCell>
                <TableCell align="center">Telefono</TableCell>
                <TableCell align="right">Posicion </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mb: 2 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={listContactOfCompany.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}></Paper>
    </div>
  );
};

export default ListUser;
