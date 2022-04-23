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
import Search from "../../company/request/RequestSearch";
import { useNavigate } from "react-router";

const user = [
  {
    contId: 2,
    contEmail: "pkilmister1@pbs.org",
    contName: "Padget Kilmister",
    contPhone: "307-438-7780",
    contPosition: "Business Development",
  },
  {
    contId: 3,
    contEmail: "elias.estupinan@u.icesi.edu.co",
    contName: "Caleb",
    contPhone: "235-678-1670",
    contPosition: "Legal",
  },
  {
    contId: 4,
    contEmail: "eliaset096@gmail.com",
    contName: "Caleb",
    contPhone: "838-580-8467",
    contPosition: "Training",
  },
  {
    contId: 5,
    contEmail: "eliaset096@outlook.com",
    contName: "Caleb",
    contPhone: "495-607-7365",
    contPosition: "Engineering",
  },
  {
    contId: 6,
    contEmail: "keithlan@yahoo.com",
    contName: "Caleb",
    contPhone: "396-118-2552",
    contPosition: "Support",
  },
  {
    contId: 8,
    contEmail: "lize756cas@gmail.com",
    contName: "Fanny",
    contPhone: "652-629-4802",
    contPosition: "Human Resources",
  },
  {
    contId: 9,
    contEmail: "osvan202@gmail.com",
    contName: "Oscar",
    contPhone: "412-228-3109",
    contPosition: "Sales",
  },
  {
    contId: 10,
    contEmail: "bnarducci9@wordpress.com",
    contName: "Birgit Narducci",
    contPhone: "632-161-4066",
    contPosition: "Marketing",
  },
];

const UserList = ({ edit }) => {
  //list of company's contacts
  const [userList, setUsertList] = useState([]);

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //navigate
  let navigate = useNavigate();

  //Axios
  useEffect(() => {
    axios.get("/contacts").then((res) => setUsertList(res.data));
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Render
  const renderList = () => {
    return userList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((user) => <User user={user} key={user.contId} />);
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
            Contactos empresariales
          </Typography>
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
                <TableCell align="right">Posicioón </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderList()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mb: 2 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </div>
  );
};

export default UserList;
