import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import MoreIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 40;
const User = ({ user, delUser, editUser }) => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate("company/updateUser");
  };

  const handleDelete = () => {
    delUser(user);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="left">{user.contName}</TableCell>
      <TableCell align="center">{user.contEmail}</TableCell>
      <TableCell align="center">{user.contPhone}</TableCell>
      <TableCell align="right">{user.contPosition}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem key="Company" onClick={handleEdit}>
            <Typography textAlign="center">Editar contacto</Typography>
          </MenuItem>
          <MenuItem key="Perfil" onClick={handleDelete}>
            <Typography textAlign="center">EliminarContacto</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default User;
